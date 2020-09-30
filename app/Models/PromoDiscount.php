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
        if(!$promo_status['is_applicable']) {
            $cart['promo_details'] = $promo_status['details'];
            return $cart;
        }

        // get LS_IDs for these SKUs
        // map of SKU => [LS_ID1, LS_ID2...]


        $cart['discount_details'] = [
            'code' => $promo_code,
            'user' => $user
        ];

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
        if(empty($promo_details)) {
            $status['details']['error_msg'] = 'Seems like you\'ve used an invalid code. Please check the code.';
            return $status;
        }

        $promo_details = $promo_details[0];
        if(self::is_LSID_allowed($cart, $promo_details) 
            && self::is_user_allowed($user, $promo_details)
            && self::is_promo_count_allowed($user, $promo_details)) {

                $status['is_valid'] = true;
                $status['details']['discount_detailas'] = $promo_details;
            }

        return $status;
    }

    /**
     * returns simple true and false
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
    private static function is_LSID_allowed($cart, $promo_details) {
        // get all product SKUs to find their LS_IDs
        $in_cart_skus = [];
        foreach ($cart['products'] as $product) {
            $in_cart_skus[] = $product->product_sku;
        } 

        // [SKU] => "lsid1,lsid2,lsid3..."
        $sku_lsid_map = self::get_product_LSID($in_cart_skus);
        $promo_lsids = explode(",", $promo_details['applicable_categories']);

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
