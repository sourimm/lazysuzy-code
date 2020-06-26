<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Auth;
use Illuminate\Support\Facades\Config;

class Cart extends Model
{

    protected $table = "lz_user_cart";
    private static $cart_table = "lz_user_cart";
    private static $shipment_code_table = 'lz_ship_code';
    private static $inventory_table = 'lz_inventory';

    public static function add($sku, $count, $parent)
    {
        // add the product in the cart, 
        // don't delete the product from the inventory 
        // do that on payment initiation

        $is_guest = 0;
        

        if (Auth::check()) {
            $user_id = Auth::user()->id;
        } else {
            $user_id = 'guest-1';
            $is_guest = 1;
        }

        // let's get the items that are already present in the user_cart 
        // right now and then we'll only insert new products if total item count
        // suits the inventory count
        $items_in_cart = DB::table(Cart::$cart_table)
                ->where('user_id', $user_id)
                ->where('product_sku', $sku)
                ->where('is_active', 1)
                ->get()->count();
        
        $items_in_inventory = DB::table(Cart::$inventory_table)
                ->select(['quantity as count'])
                ->where('product_sku', $sku)
                ->get();
        
        if(isset($items_in_inventory[0])) {
            $items_in_inventory_count = $items_in_inventory[0]->count;
        
            $to_insert = $count;
            $inserted = 0;

            if(($items_in_cart + $to_insert) > $items_in_inventory_count) {
                return [
                    'status' => false,
                    'msg' => 'Currently available stock already added to cart'
                ];
            }
            

            while ($count--) {
                $is_inserted = DB::table(Cart::$cart_table)
                    ->insert([
                        'user_id' => $user_id,
                        'product_sku' => $sku,
                        'parent_sku' => $parent,
                        'is_guest' => $is_guest
                    ]);

                if ($is_inserted)
                    $inserted++;
            }

            if ($to_insert == $inserted) {
                return [
                    'status' => true,
                    'msg' => 'product ' . $sku . ' added to cart'
                ];
            }
        }

        return [
            'status' => false,
            'msg' => 'could not add product ' . $sku . ' to cart'
        ];
    }

    public static function remove($sku, $count)
    {

        if (Auth::check()) {
            $user_id = Auth::user()->id;
        } else {
            $user_id = 'guest-1';
        }


        $is_updated = DB::table(Cart::$cart_table)
            ->where("product_sku", $sku)
            ->where("user_id", $user_id)
            ->where("is_active", 1)
            ->take($count)->update(['is_active' => '0']);


        if ($is_updated)
            return [
                'status' => true,
                'msg' => 'product ' . $sku . ' removed from cart'
            ];

        return [
            'status' => false,
            'msg' => 'could not remove product ' . $sku . ' from cart'
        ];
    }

    public static function cart()
    {
        $variation_tables = Config::get('tables.variations');

        if (Auth::check()) {
            $user_id = Auth::user()->id;
        } else {
            $user_id = 'guest-1';
        }

        // calculating shipment cost for each SKU
        $rows_shipment_code = DB::table(Cart::$shipment_code_table)
            ->get()
            ->toArray();
        $shipment_codes = array_column($rows_shipment_code, 'rate', 'code');
        
        
        // we can have products that are not in the master_data table 
        // but prent in one of the variations table, so for those products 
        // we'll have to make a separate list

        // get all the products for this user 
        $rows = Cart::where('user_id', $user_id)->get();
        $parents = []; //parent[i] => variations[i]
        $variations = [];
        foreach($rows as &$row) {
            // we will only process products that are variations of the parent 
            // product, for normal products (parent products) the code after this 
            // loop will be applied

            if( isset($row->product_sku) && isset($row->parent_sku)
                && strlen($row->parent_sku) > 0 && $row->product_sku != $row->parent_sku) {
                    // for variations SKU, details of parent SKU from master_data table
                    $parents[] = $row->parent_sku;
                    $variations[] = $row->product_sku;
                }
        }

        // get parent details
        $parent_rows = DB::table('master_data')
            ->select([
                "product_name", 
                "product_sku",
                "site_name",
                "reviews",
                "rating",
                "product_description",
                "master_brands.value as site_value"
            ])
            ->whereIn('master_data.product_sku', $parents)
            ->join("master_brands", "master_data.site_name", "=", "master_brands.value")
            ->get();
    
        $parent_index = 0;
        $cart = [];
        foreach($parent_rows as $row) {
            // for each parent get the Product Name and Site Name
            // from Site Name we'll be deciding the variations table
            // for that variation SKU
            $table = isset($variation_tables[$row->site_name]['table']) ? $variation_tables[$row->site_name]['table'] : null;
            $name = isset($variation_tables[$row->site_name]['table']) ? $variation_tables[$row->site_name]['name'] : null;
            $image = isset($variation_tables[$row->site_name]['table']) ? $variation_tables[$row->site_name]['image'] : null;
            $sku = isset($variation_tables[$row->site_name]['table']) ? $variation_tables[$row->site_name]['sku'] : null;
            // get variations details, we only need name and image

            if(isset($table) && isset($name) && isset($image)) {
                $vrow = DB::table($table)
                    ->select([$name . ' as variation_name',
                    DB::raw('concat("https://www.lazysuzy.com", ' . $image .') as image'),
                    DB::raw('count(*) as count'),
                    $table . "." . $sku . ' as variation_sku',
                    'lz_inventory.price as retail_price',
                    'lz_inventory.ship_code',
                    'lz_inventory.ship_custom',
                    'lz_inventory.quantity as max_available_count',
                    'lz_inventory.price',
                    'lz_inventory.was_price',
                ])->where($sku, $variations[$parent_index])
                ->join("lz_inventory", "lz_inventory.product_sku", "=", $table . "." . $sku)
                ->get()->toArray();
                
                if(isset($vrow[0])) {
                    $vrow = $vrow[0];
                    $vrow->product_sku = $row->product_sku;
                    $vrow->product_name = $row->product_name;
                    $vrow->review = $row->reviews;
                    $vrow->rating = $row->rating;
                    $vrow->description = $row->product_description;

                    $cart[] = $vrow;
                }
                $parent_index++;

            }

        }


       
        $rows = DB::table(Cart::$cart_table)
            ->select(
                Cart::$cart_table . '.product_sku',
                DB::raw('count(*) as count'),
                'master_data.product_name',
                'lz_inventory.price as retail_price',
                'lz_inventory.ship_code',
                'lz_inventory.ship_custom',
                'lz_inventory.quantity as max_available_count',
                'lz_inventory.price',
                'lz_inventory.was_price',
                DB::raw('concat("https://www.lazysuzy.com", master_data.main_product_images) as image'),
                'master_data.product_description',
                'master_data.reviews',
                'master_data.rating',
                'master_brands.name as site'
            )
            ->join("master_data", "master_data.product_sku", "=", Cart::$cart_table . ".product_sku")
            ->join("lz_inventory", "lz_inventory.product_sku", "=", "master_data.product_sku")
            ->join("master_brands", "master_data.site_name", "=", "master_brands.value")

            ->where(Cart::$cart_table . '.user_id', $user_id)
            ->where(Cart::$cart_table . '.is_active', 1)

            ->groupBy([Cart::$cart_table . '.user_id', Cart::$cart_table . '.product_sku'])
            ->get()->toArray();

        $rows = array_merge($rows, $cart);
        $products = [];

       
        foreach ($rows as $row => &$product) {

            $p_val = $wp_val = $discount = null;

            if(!isset($product->was_price))
                $product->was_price = $product->price;

            $p_price = str_replace("$", "", $product->price);
            $wp_price = str_replace("$", "", $product->was_price);

            $price_bits = explode("-", $p_price);
            $was_price_bits = explode("-", $wp_price);

            if (isset($price_bits[1]) && isset($was_price_bits[1])) {
                $p_val = $price_bits[0];
                $wp_val = $was_price_bits[0];
            } else {
                $p_val = $p_price;
                $wp_val =  $wp_price;
            }

            if (is_numeric($p_val) && is_numeric($wp_val) && $wp_val > 0) {
                $discount = (1 - ($p_val / $wp_val)) * 100;
                $discount = number_format((float) $discount, 2, '.', '');
            }

            $product->discount = $discount;

            // set correct shipping cost
            if(strtolower($product->ship_code) == 's') {
                $product->ship_custom = $shipment_codes[$product->ship_code];
            }
            else if (strtolower($product->ship_code) == 'f') {
                $product->ship_custom = 0;
            }
        }
        
        return $rows;
    }
}
