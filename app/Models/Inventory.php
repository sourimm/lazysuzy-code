<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Inventory extends Model 
{
    private static $inventory_table = "lz_inventory";
    public static function get() {
        
        return DB::table(Inventory::$inventory_table)
            ->select(
            Inventory::$inventory_table . '.product_sku',
                'master_data.product_name',
            Inventory::$inventory_table . '.price',
            Inventory::$inventory_table . '.quantity as count',
                DB::raw('concat("https://www.lazysuzy.com", master_data.main_product_images) as image'),
                'master_data.product_description',
                'master_data.reviews',
                'master_data.rating',
                'master_brands.name as site'
            )
            ->join("master_data", "master_data.product_sku", "=", Inventory::$inventory_table . ".product_sku")
            ->join("master_brands", "master_data.site_name", "=", "master_brands.value")
            ->where(Inventory::$inventory_table . '.is_active', 1)
            ->get()
            ->toArray();
    }
}