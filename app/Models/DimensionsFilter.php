<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;

class DimensionsFilter extends Model
{
    protected $table = "master_data";

    public static function get_filter($dept, $cat, $all_filters) {

        // get min and max values for all the dimensions related properties.
        // based on the selected filters
        $dim_filters = [];
        $dim_columns = Config::get('tables.dimension_columns');
        $dim_label_map = Config::get('tables.dimension_labels');
        $products = DB::table((new self)->table)->select($dim_columns)
            ->where('product_status', 'active');

        // get applicable LS_IDs
        $LS_IDs = Product::get_dept_cat_LS_ID_arr($dept, $cat);
        
        if (sizeof($all_filters) != 0) {

            // for /all API catgeory-wise filter
            if (
                isset($all_filters['category'])
                && !empty($all_filters['category'])
                && strlen($all_filters['category'][0])
            ) {
                // we want to show all the products of this category
                // so we'll have to get the sub-categories included in this
                // catgeory
                $LS_IDs = SubCategory::get_sub_cat_LSIDs($all_filters['category']);
            }

            if (isset($all_filters['type']) && strlen($all_filters['type'][0]) > 0) {
                $LS_IDs = Product::get_sub_cat_LS_IDs($dept, $cat, $all_filters['type']);
            }

            // can avoid this matching because all products will by default 
            // require all products in DB
            if($dept != "all")
                $products = $products->whereRaw('LS_ID REGEXP "' . implode("|", $LS_IDs) . '"');

            if (
                isset($all_filters['color'])
                && strlen($all_filters['color'][0]) > 0
            ) {
                $products = $products
                    ->whereRaw('color REGEXP "' . implode("|", $all_filters['color']) . '"');
                // input in form - color1|color2|color3
            }

            if (
                isset($all_filters['seating'])
                && isset($all_filters['seating'][0])
            ) {
                $products = $products
                    ->whereRaw('seating REGEXP "' . implode("|", $all_filters['seating']) . '"');
            }

            if (
                isset($all_filters['shape'])
                && isset($all_filters['shape'][0])
            ) {
                $products = $products
                    ->whereRaw('shape REGEXP "' . implode("|", $all_filters['shape']) . '"');
            }

            // 2. price_from
            if (isset($all_filters['price_from'])) {
                $products = $products
                    ->whereRaw('min_price >= ' . $all_filters['price_from'][0] . '');
            }

            // 3. price_to
            if (isset($all_filters['price_to'])) {
                $products = $products
                    ->whereRaw('max_price <= ' . $all_filters['price_to'][0] . '');
            }

            if (
                isset($all_filters['brand'])
                && strlen($all_filters['brand'][0]) > 0
            ) {
                $products = $products->whereIn('brand', $all_filters['brand']);
            }
        }

        // get all min and max values for all dimensions columns
        foreach($dim_columns as $column) {
            $dim_filters[$column] = [
                'label' => $dim_label_map[$column],
                'value' => $column,
                'min' => $products->min($column),
                'max' => $products->max($column)
            ];
        }

        return $dim_filters;
    }

}
