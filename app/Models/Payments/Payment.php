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
    public static function charge($req)
    {
        $user_id = Auth::check() ? Auth::user()->id : 'guest-1';

        $cart = Cart::cart();
        $total_price = 0;

        $order_id = "lz-ord-" . rand(1, 1000) . "-" . rand(1, 10000);
        $products_not_avaiable = [];
        foreach($cart as $product) {
            $total_price += ((float) $product->retail_price) * $product->count;

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

        Stripe\Stripe::setApiKey(env('STRIP_SECRET'));

        $customer = Stripe\Customer::create([
            'name' => 'Jenny Rosen',
            'address' => [
                'line1' => '510 Townsend St',
                'postal_code' => '98140',
                'city' => 'San Francisco',
                'state' => 'CA',
                'country' => 'US',

            ],
            "source" => $req->input('token'),

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
            "description" => "Test payment from .com.",

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
        }

        return [
            'status' => $charge->status,
            'msg' => 'Transaction Successfull',
            'transaction_id' => $charge->id,
            'reciept_url' => $charge->receipt_url
        ];
    }
}
