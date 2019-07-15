<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;

class Variations extends Model {
    public static $base_siteurl = 'http://lazysuzy.com';

    public static function sanitize($text) {
         $text = preg_replace("/-/", " ", $text);
         return strip_tags($text);
    }

    public static function get_attr_value($attr_str) {
        $str_exp = explode(":", $attr_str);
        return isset($str_exp[1]) ? $str_exp[1] : null;
    }

    public static function get_variations($sku) {
        $filters = [];
        $cols = [
            "product_id AS product_sku",
            "sku AS variation_sku",
            "name",
            "price",
            "was_price",
            DB::raw('CONCAT("'. Product::$base_siteurl .'", image_path) as image'),
            DB::raw('CONCAT("' . Product::$base_siteurl . '", swatch_image_path) as swatch_image'),
            "attribute_1",
            "attribute_2",
            "attribute_3",
            "attribute_4",
            "attribute_5",
            "attribute_6"
        ];
        
        $col_mapper = [
            "color" => "attribute_1",
            "shape" => "attribute_2",
            "fabric" => "attribute_3",
            "furniture_piece" => "attribute_4",
            "delivery" => "attribute_5",
            "leg_style" => "attribute_6"
        ];
        
        $all_filters = Product::get_all_variation_filters($sku);

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

        $variations = $query->get();
        $filters = [];
        $products = [];

        $filter_values_unique = [];
        if (isset($main_img[0])) {
            foreach ($variations as $variation) {
                 $product = [];
                $col = "attribute_";

                // load basic details about the product
                $product = [
                    "product_sku" => $variation->product_sku,
                    "variation_sku" => $variation->variation_sku,
                    "name" => $variation->name,
                    "price" => $variation->price,
                    "image" => $variation->image,
                    "swatch_image" => $variation->swatch_image
                ];
                for ($i = 1; $i <= 6; $i++) {
                    $col_name = $col . $i;

                    $str_exp = explode(":", $variation->$col_name);
                    if (isset($str_exp[0]) && isset($str_exp[1])) {
                        $filter_key = Product::get_filter_key($str_exp[0]);
                        
                        // load attr details for product
                        $product[$filter_key] = [
                            "name" => $str_exp[1],
                            "value" =>  strtolower(preg_replace("/[\s]/", "-", $str_exp[1]))
                        ];
                        
                        if (!isset($filter_values_unique[$filter_key]))
                            $filter_values_unique[$filter_key] = [];

                        if (!in_array($str_exp[1], $filter_values_unique[$filter_key])) {
                            array_push($filter_values_unique[$filter_key], $str_exp[1]);
                        }
                    }
                }

                array_push($products, $product);
            }


            //echo "<pre>" . print_r($filter_values_unique, true);

            foreach ($all_filters as $all_filter_key => $filter) {
                $found = false;
                foreach ($filter as $f) {
                    $found = false;
                    //echo "ALL FITER KEY: " . $all_filter_key . "<BR>";
                    if (isset($filter_values_unique[$all_filter_key])) {
                        foreach ($filter_values_unique[$all_filter_key] as $flt_name) {
                            //echo $flt_name . " == " . $f["name"] . "<br>";
                            if ($flt_name == $f["name"]) {
                                $found = true;
                                break;
                            }
                        }

                        if (!isset($filters[$all_filter_key])) {
                            $filters[$all_filter_key] = [];
                        }

                        array_push($filters[$all_filter_key], [
                            "name" => $f["name"],
                            "value" => $f["value"],
                            "enabled" => $found
                        ]);
                    }
                }
            }
            // return ;
            return [
                "main_image" => Product::$base_siteurl . $main_img[0]->main_product_images,
                "variations" => $products,
                "filters" => $filters
            ];
        
        }

        return ["error" => "No Product wit SKU " . $sku . " found."];
       
    }

}
