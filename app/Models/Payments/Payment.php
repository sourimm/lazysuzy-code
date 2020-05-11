<?php

namespace App\Models\Payments;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\Models\Cart;
use App\Models\Inventory;
use Illuminate\Support\Str;

use App\Models\Mailer;
use Stripe;
use Auth;

class Payment extends Model
{
    private static $order_table = 'lz_orders';
    private static $delivery_table = 'lz_order_delivery';
    private static $shipment_code_table = 'lz_ship_code';
    private static $failed_reciepts = 'lz_failed_receipt';

    public static function charge($req) {
        $user_id = Auth::check() ? Auth::user()->id : 'guest-1';
        $username = Auth::check() ? Auth::user()->first_name : $req->input('billing_f_Name');
        $mail_data = [];
        $total_price = 0;
        $total_items = 0;
        $shipment_cost = 0;
        $mail_data['order'] = [];
        $mail_data['order']['products'] = [];

        $mail_data['username'] = $username;
        $cart = Cart::cart();

        // generte and random string of length 5
        // handle edge case, if there are more than 100 collisions then shift to length +1 
        $length = 5;
        $collisions = 0;
        $order_id = strtoupper(Str::random($length));
        $found = DB::table(Payment::$order_table)
                    ->where('order_id', $order_id)
                    ->count();

        while($found) {
            $order_id = strtoupper(Str::random($length));
            $found = DB::table(Payment::$order_table)
                ->where('order_id', $order_id)
                ->count();
            $collisions++;

            if($collisions > 100) {
                $length += 1;
                $collisions = 0; 
            }
        }

        //$order_id = "lz-ord-" . rand(1, 1000) . "-" . rand(1, 10000);
        foreach($cart as $product) {

            // add mail reciept data
            $mail_data['order']['products'][] = [
                'name' => $product->product_name,
                'price' => '$' . $product->retail_price,
                'count' => $product->count,
                'image' => $product->image,
                'brand' => $product->site,
                'sku' => $product->product_sku,
                'showCount' => $product->count > 1 ? true : false

            ];

            $total_price += ((float) $product->retail_price) * $product->count;
            $total_items += (int) $product->count;
            $ship_code = strtolower($product->ship_code);

            // if not free-shipping
            if($ship_code != 'f')
                $shipment_cost += (float)($product->ship_custom * $product->count);

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
        
        $mail_data['total_price'] = '$' . $total_price;

        // if cost of shipment is 1 then set it to 0
        // 1 is from when the variable was declared, 
        // cart has all Free Shipment products 
        if($shipment_cost == 1) {
            $shipment_cost = 0;
        }

        $total_price += $shipment_cost; 
        $mail_data['shipping'] = '$' . $shipment_cost;
        $mail_data['order_cost'] = '$' . $total_price;

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
            $delivery_details['user_id'] = $user_id;
            $ID = DB::table('lz_order_delivery')
                ->insertGetId($delivery_details);
            $customer_name = $req->input('billing_f_Name');

            // get card details for sending in email reciept
            $card = Stripe\Token::retrieve($req->input('token'));
            $mail_data['card'] = [
                'last4' => $card->card->last4,
                'expiry' => $card->card->exp_month . '/' . $card->card->exp_year
            ];
            $mail_data['shipping_details'] = $delivery_details;
            $mail_data['order_id'] = $order_id;
            $receipt_send = Mailer::send_receipt($req->input('email'), $customer_name, $mail_data);
            
            if(!$receipt_send['status']) {
                // save this order in DB to send the 
                // mail later
                DB::table(Payment::$failed_reciepts)
                        ->insert([
                            'email' => $req->input('email'),
                            'mail_data' => json_encode($mail_data),
                            'error' => $receipt_send['error']
                        ]);
            }

            
            
        }

        return [
            'status' => $charge->status,
            'msg' => 'Transaction Successfull',
            'order_id' => $order_id,
            'amount' => $total_price,
            'transaction_id' => isset($charge->id) ? $charge->id : null,
            'reciept_url' => isset($charge->receipt_url) ? $charge->receipt_url : null,
            'order' => $req->all(),
            'receipt_send' => $receipt_send,
            'mail_data' => $mail_data,
            'card' => $card
        ];
    }

    public static function order($order_id) {
        $response = [];
        $user = Auth::user();
        $rows_shipment_code = DB::table(Payment::$shipment_code_table)
            ->get()
            ->toArray();
        $shipment_codes = array_column($rows_shipment_code, 'rate', 'code');
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
                            'master_brands.name as site',
                            'lz_inventory.ship_custom',
                            'lz_inventory.ship_code'
                        )
                        ->join("master_data", "master_data.product_sku", "=", Payment::$order_table . ".product_sku")
                        ->join("lz_inventory", "lz_inventory.product_sku", "=", "master_data.product_sku")
                        ->join("master_brands", "master_data.site_name", "=", "master_brands.value")
                        ->where('order_id', $order_id)
                        ->where('user_id', $user->id)
                        ->get();
        

        foreach ($response['cart'] as $product) {
            // set correct shipping cost
            if (strtolower($product->ship_code) == 's') {
                $product->ship_custom = $shipment_codes[$product->ship_code];
            } else if (strtolower($product->ship_code) == 'f') {
                $product->ship_custom = 0;
            }
        }
        
        $response['delivery'] = DB::table(Payment::$delivery_table)
                                ->where('order_id', $order_id)
                                ->where('user_id', $user->id)
                                ->get();

        $response['payment'] = [];
        if(isset($response['delivery'][0])) {
            Stripe\Stripe::setApiKey(env('STRIP_SECRET'));
            $response['payment'] = Stripe\Token::retrieve($response['delivery'][0]->token);
        }
      
        return $response;
    }
}
