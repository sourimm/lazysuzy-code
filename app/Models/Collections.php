<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;

class Collections extends Model
{

    public static function get_collections($sku, $collection_key, $brand) {
        $collections = [];
        if(!isset($collection_key) || strlen($collection_key) == 0)
            return $collections;
        
        $to_select = ["product_sku", "product_name","product_status", "site_name", "brand", "main_product_images", "price", "was_price"];
        $rows = DB::table(Config::get('tables.master_table'))
                        ->where("collection", $collection_key)
                        ->where("brand", $brand)
                        ->where("product_status", "active")
                        ->where("product_sku" , "!=", $sku)
                       ->get()->toArray();
        
        $user = Auth::user();
        foreach($rows as $row) {
            $row = (array) $row;
            $inventory_details = Inventory::get_product_from_inventory($user, $row['product_sku']);
          
            $collection_block = [
                "in_inventory" => $inventory_details['in_inventory'],
                "inventory_product_details" => $inventory_details['inventory_product_details'],
                "image" => $row['main_product_images'],
                "sku" => $row['product_sku'],
                "link" => "/product/" . $row['product_sku'],
                "price" => $row['price'],
                "was_price" => $row['was_price'],
                "name" => $row['product_name']
            ];
            $collections[] = $collection_block;
        }   
        
        return $collections;
    }  

    /**
     * GET /api/collections?collection=xx
     * Send details for xx collection via listed endpoint
     *
     * @param [type] $collection
     * @return collection_details 
     */
    public static function get_collection_details($collection) {

        $collection_table = Config::get('tables.collections'); 
        $collection_detail_count = Config::get('tables.collection_detail_count');
        $collection_details = [];
        $row = DB::table($collection_table)->where('value', $collection)->get();

        if(sizeof($row) == 0) 
            return $collection_details;

        $row = $row[0];
        $collection_details['head_description'] = $row->desc_header;
        $collection_details['cover_details'] = [
            'image' => env('APP_URL') . $row->image_cover,
            'description' => $row->desc_cover
        ];
        $collection_details['sub_details'] = [];

        for($i = 1; $i <= $collection_detail_count; $i++) {
            $desc_key = 'desc_sub_' . $i;
            $img_key = 'image_sub_' . $i;


            if(strlen($row->$img_key) > 0 && strlen($row->$desc_key) > 0) {
                $collection_details['sub_details'][] = [
                    'image' => env('APP_URL') . $row->$img_key,
                    'description' => $row->$desc_key
                ];
            }
            
        }

        return $collection_details;
    }


    /**
     * List of all available collections
     *
     * @return list_of_collections
     */
    public static function get_collection_list() {
        $collection_table = Config::get('tables.collections'); 
        $collection_list = [];
        $to_select = ["name", "value"];
        $rows = DB::table($collection_table)->select($to_select)
            ->where('is_active', 1)->get();

        foreach($rows as $row) {
            $collection_list[] = [
                "name" => $row->name,
                "value" => $row->value
            ];
        }

        return $collection_list;
    }
}
