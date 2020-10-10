<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Auth;

class PromoDiscount extends Model
{
    protected $table = "lz_promo";

    /**
     * Calculates total cart cost in case use has applied a promo code.
     *
     * @param [type] $cart
     * @param [type] $promo_code
     * @return void
     */
    public static function calculate_discount($cart, $promo_code) {

        $user = Auth::user();

        // first check if the promo code is valid or not.
        // fast fail system.
        $promo_status = self::check_promo_code($user, $cart, $promo_code);
        if(!$promo_status['is_valid']) {
            $cart['promo_details'] = $promo_status['details'];
            return $cart;
        }

        $promo_details = $promo_status['details'];
        $valid_SKUs_for_discount = self::LSIDs_allowed($cart, $promo_details['discount_details']);
        
        if(sizeof($valid_SKUs_for_discount) == 0) {
           $cart['promo_details']['error_msg'] = "Sorry! This coupon is not applicable on any product in your cart";
           return $cart;
        }
        else {

            $cart = self::add_promo_discount($valid_SKUs_for_discount, $cart, $promo_details['discount_details']);
        }

        $cart['promo_details'] = [
            'code' => $promo_code,
            'details' => $promo_details
        ];

        return $cart;
    }

    private static function add_promo_discount($applicable_SKUs, $cart, $promo_details) {

        $promo_type = $promo_details['type'];
        $total_promo_discount = 0;
        foreach($cart['products'] as &$product) {

            // if this SKU is applicable for promo code
            if(in_array($product->product_sku, $applicable_SKUs)) {
                $total_product_cost_before_discount = (float)$product->total_price;
                $product->is_promo_applied = true;
                if($promo_type == Config::get('meta.discount_percent')) {
                    $promo_discount = $total_product_cost_before_discount * ((float) $promo_details['value'] / 100);
                } else if($promo_type == Config::get('meta.discount_flat')) {
                    $promo_discount = $total_product_cost_before_discount - (float)$promo_details['value'];
                    
                }
                
                $promo_discount = number_format($promo_discount, 2);
                $price_after_discount = $total_product_cost_before_discount - $promo_discount;
                $product->promo_discount = $promo_discount;
                $product->total_price = $price_after_discount;
                $product->original_total_price = $total_product_cost_before_discount;
            }
            else {
                $product->is_promo_applied = false;
            }
        }

        return $cart;
    }

    /**
     * Returns map of product SKU to LS_IDs
     *
     * @param [type] $skus
     * @return Array
     */
    private static function get_product_LSID($skus) {
        $rows = DB::table(Config::get('tables.master_table'))
            ->select(['product_sku', 'LS_ID'])
            ->whereIn('product_sku', $skus)
            ->get()->toArray();
        

        return array_column($rows, 'LS_ID', 'product_sku');
    }

    private static function check_promo_code($user, $cart, $promo_code) {

        $status = [];
        $status['is_valid'] = false;
        $status['code'] = $promo_code;
        $status['details'] = [
            'code' => $promo_code,
            'error_msg' => null, 
        ];
        if(!isset($user)) {
            $status['details']['error_msg'] = 'Invalid user. Please Login and try again.';
            return $status ;
        }

        else if(!isset($cart)) {
            $status['details']['error_msg'] = 'We Could not find the cart. We\'re working on it!';
            return $status;
        }

        else if(!isset($promo_code) || strlen($promo_code) < 2) {
            $status['details']['error_msg'] = 'Seems like you\'ve used an invalid code. Please check the code.';
            return $status;
        }

         
        /*
        * promo code is valid if
        * 1. LS_ID of products, Discount will be given on products that have LS_ID match with PROMO CODE
        * 2. Users must qualify for the PROMO CODE, i.e they must have there domain mentioned in the allowed_users col
            '*' is for `valid for all users` and
        * 3. Users must qualify the total use limit of a promo code
        *
        */ 

        $promo_details = PromoDiscount::where('code', $promo_code)->get()->toArray();
        if(sizeof($promo_details) != 1) {
            $status['details']['error_msg'] = 'Seems like you\'ve used an invalid code. Please check the code.';
            return $status;
        }

        $promo_details = $promo_details[0];

        // if user can apply this promo code
        if(self::is_promo_count_valid($user, $promo_details)) {

            // if this user is is in special group that allows them to apply 
            // the promo code
            if(self::is_user_allowed($user, $promo_details)) {
                $status['is_valid'] = true;
                $status['details']['discount_details'] = $promo_details;

                return $status;
            } else {
                $status['details']['error_msg'] = 'Sorry! This coupon is not allowed for you.';
                return $status;
            }
        } else {
            $status['details']['error_msg'] = 'Seems like you have already exhausted maximum limit for this discount code.';
            return $status;
        }
   
        return $status;
    }

    /**
     * returns simple true and false based on the domain (email) of users
     * this is for companies
     */
    private static function is_user_allowed($user, $promo_details) {

        $user_mail = $user->email;
        $domain = explode("@", $user_mail);
        
        if(sizeof($domain) != 2)
            return false;

        // abs@gmail.com domain = gmail
        $domain = explode(".", $domain[1])[0];
        $allowed_domains = explode(",", $promo_details['special_users']);
        
        if(in_array("*", $allowed_domains))
            return true;
        
        return in_array($domain, $allowed_domains);
    }

    private static function is_promo_count_valid($user, $promo_details) {

        $allowed_count = $promo_details['allowed_count'];
        $availed_count = DB::table('lz_promo_users')
            ->where('user_id', $user->id)
            ->where('promo_code', $promo_details['code'])
            ->count();


        return $availed_count < $allowed_count;
    }

    /**
     * Return empty array if no products match the promo code LS_ID
     * else return matched SKU array
     *
     * @param [type] $cart
     * @param [type] $promo_details
     * @return boolean
     */
    private static function LSIDs_allowed($cart, $promo_details) {
        // get all product SKUs to find their LS_IDs
        $in_cart_skus = [];
        foreach ($cart['products'] as $product) {
            $in_cart_skus[] = $product->product_sku;
        } 

        // [SKU] => "lsid1,lsid2,lsid3..."
        $sku_lsid_map = self::get_product_LSID($in_cart_skus);
        
        $promo_lsids = explode(",", $promo_details['applicable_categories']);

        // if promo is valid for all categories 
        // return all in-cart SKUs
        if(in_array("*", $promo_lsids))
            return $in_cart_skus;

        $sku_available_for_promo = [];
        foreach($sku_lsid_map as $sku => $lsid_str) {
            $lsid_arr = explode(",", $lsid_str);
            foreach($lsid_arr as $lsid) {
                if(in_array($lsid, $promo_lsids))
                    $sku_available_for_promo[] = $sku;
            }
        }
        
        return $sku_available_for_promo;
    }
}
