<?php

namespace App\Models\Payments;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\Models\Cart;
use App\Models\Inventory;
use Stripe;
use Auth;

class Payment extends Model
{
    private static $order_table = 'lz_orders';
    private static $delivery_table = 'lz_order_delivery';
    public static function charge($req) {
        $user_id = Auth::check() ? Auth::user()->id : 'guest-1';

        $cart = Cart::cart();
        $total_price = 0;
        $total_items = 0;

        $order_id = "lz-ord-" . rand(1, 1000) . "-" . rand(1, 10000);
        $products_not_avaiable = [];
        foreach($cart as $product) {
            $total_price += ((float) $product->retail_price) * $product->count;
            $total_items += (int) $product->count;
            $row = DB::table('lz_inventory')
                ->select('quantity')
                ->where('product_sku', $product->product_sku)
                ->get();

            if(isset($row[0])) {
                $available_count = $row[0]->quantity;
                if($available_count < $product->count) {
                    return [
                        'status' => 'failed',
                        'msg' => 'Product ' . $product->product_name . ' not available.'
                    ];
                }
                DB::table('lz_orders')
                    ->insert([
                        'user_id' => $user_id,
                        'order_id' => $order_id,
                        'product_sku' => $product->product_sku,
                        'price' => (float) $product->retail_price,
                        'quantity' => $product->count
                    ]);
            }
            else {
                return [
                    'status' => 'failed',
                    'msg' => 'Product ' . $product->name . ' not in inventory.'
                ];
            }
           
        }
        
        // charge $25 shipping fee for each product
        $total_price += $total_items * 25; 

        Stripe\Stripe::setApiKey(env('STRIP_SECRET'));

        $customer = Stripe\Customer::create([
            'name' => $req->input('billing_f_Name') . ' ' . $req->input('billing_l_Name'),
            'address' => [
                'line1' => $req->input('billing_address_line1'),
                'city' => $req->input('billing_city'),
                'state' => $req->input('billing_state'),
                'country' => substr($req->input('billing_country'), 0, 2),
                'postal_code' => $req->input('billing_zipcode'),
            ],
            'email' => $req->input('email'),
            'phone' => $req->input('shipping_phone'),
            "source" => $req->input('token')
        ]);

        // insert record for transaction
        DB::table('lz_transactions')
            ->insert([
                'user_id' => $user_id,
                'stripe_customer_id' => $customer->id,
                'stripe_transaction_id' => "ongoing",
                'order_id' => $order_id,
                'checkout_amount' => $total_price,
                'status' => 'ongoing',
            ]);

        $charge = Stripe\Charge::create([
            'customer' => $customer->id,
            "amount" => $total_price * 100,
            "currency" => "usd",
            "description" => "Payment from Lazysuzy.com",
            'receipt_email' => $req->input('email'),
            'shipping' => [
                'address' => [
                    'line1' => $req->input('shipping_address_line1'),
                    'city' => $req->input('shipping_city'),
                    'state' => $req->input('shipping_state'),
                    'country' => substr($req->input('billing_country'), 0, 2),
                    'postal_code' => $req->input('shipping_zipcode'),
                ],
            'name' => $req->input('shipping_f_Name') . ' ' . $req->input('shipping_l_Name'),
            'phone' => $req->input('shipping_phone')
            ]

        ]);

        DB::table('lz_transactions')
            ->where('order_id', $order_id)
            ->update([
                'stripe_transaction_id' => $charge->id,
                'status' => $charge->status
            ]);
        
        if($charge->status == 'succeeded') {
            // remove from stock;
            foreach($cart as $product) {
                $p = $product;
                $in_stock = DB::table('lz_inventory')
                                ->select("quantity")
                                ->where("product_sku", $p->product_sku)
                                ->get();

                if(isset($in_stock[0])) {
                    $original_count = $in_stock[0]->quantity;
                    $left_count = $original_count - $p->count;
                    
                    Cart::remove($p->product_sku, $p->count);

                    DB::table('lz_inventory')
                        ->where('product_sku', $p->product_sku)
                        ->update([
                            'quantity' => $left_count
                        ]);
                }
            }

            $delivery_details = $req->all();
            $delivery_details['order_id'] = $order_id;
            $ID = DB::table('lz_order_delivery')
                ->insertGetId($delivery_details);
        }

        $order = $req->all();
        return [
            'status' => $charge->status,
            'msg' => 'Transaction Successfull',
            'order_id' => $order_id,
            'amount' => $total_price,
            'transaction_id' => $charge->id,
            'reciept_url' => $charge->receipt_url,
            'order' => $order
        ];
    }

    public static function order($order_id) {
        $response = [];
        $response['cart'] = DB::table('lz_orders')
                        ->select(
                            Payment::$order_table . '.product_sku',
                            Payment::$order_table . '.price',
                            Payment::$order_table . '.quantity as count',
                            'master_data.product_name',
                            'master_data.was_price',
                            DB::raw('concat("https://www.lazysuzy.com", master_data.main_product_images) as image'),
                            'master_data.product_description',
                            'master_data.reviews',
                            'master_data.rating',
                            'master_brands.name as site'
                        )
                        ->join("master_data", "master_data.product_sku", "=", Payment::$order_table . ".product_sku")
                        ->join("master_brands", "master_data.site_name", "=", "master_brands.value")
                        ->where('order_id', $order_id)
                        ->get();
        $response['delivery'] = DB::table(Payment::$delivery_table)
                                ->where('order_id', $order_id)
                                ->get();
        return $response;
    }
}
