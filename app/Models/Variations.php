<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;

class Variations extends Model {
    public static $base_siteurl = 'https://lazysuzy.com';

    public static function sanitize($text) {
        return strip_tags($text);
    }

    public static function get_variations($sku) {
        $filters = [];
        $cols = [
            "product_id AS product_sku",
            "sku AS variation_sku",
            "name",
            "price",
            "was_price",
            "image",
            "swatch_image"
        ];
        $col_mapper = [
            "color" => "attribute_1",
            "size" => "attribute_2",
            "fabric" => "attribute_3",
            "furniture-piece" => "attribute_4",
            "delivery" => "attribute_5",
            "leg-style" => "attribute_6"
        ];

        $main_img = DB::table("master_data")
            ->select("main_product_images")
            ->where("product_sku", $sku)
            ->get();
        
        $query = DB::table("westelm_products_skus")
            ->select($cols)
            ->where('product_id', $sku);

        foreach ($_GET as $key => $value) { 
            $query = $query->where($col_mapper[$key], 'like', '%' . Variations::sanitize($value) . '%');
            array_push($filters, [$key => Variations::sanitize($value)]); 
        }
        
        return [
            "main_image" => $main_img[0]->main_product_images,
            "variations" => $query->get(),
            "filters" => $filters
        ];
    }

}
