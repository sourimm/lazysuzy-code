<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
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
}
