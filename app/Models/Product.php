<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;

class Product extends Model
{
    protected $table = "master_data";

    public static function get_LS_IDs($dept, $cat = null)
    {
        $LS_IDs = [];
        $data   = DB::table('mapping_core')
            ->select('LS_ID');

        if (null == $cat) {
            $data = $data
                ->where('department_', $dept);
        } else {
            $data = $data
                ->where('department_', $dept)
                ->where('product_category_', $cat);
        }

        $data = $data->get();

        foreach ($data as $key => $val) {
            array_push($LS_IDs, $val->LS_ID);
        }
        return $LS_IDs;
    }

    public static function get_sub_cat_LS_IDs($dept, $cat, $sub_categories)
    {
        $LS_IDs = [];
        foreach ($sub_categories as $sub_category) {
            $ls_id = DB::table('mapping_core')
                ->select('LS_ID')
                ->where('department_', $dept)
                ->where('product_category_', $cat)
                ->where('product_sub_category_', $sub_category)
                ->get();
            array_push($LS_IDs, $ls_id[0]->LS_ID);
        }

        return $LS_IDs;
    }

    public static function get_filter_products($dept, $cat = null)
    {
        $perPage = 20;
        DB::enableQueryLog();
        $LS_IDs = null;

        $page_num    = Input::get("pageno");
        $limit       = Input::get("limit");
        $sort_type   = Input::get("sort_type");
        $filters     = Input::get("filters");
        $all_filters = [];
        $query       = DB::table('master_data');

        if (!isset($limit)) {
            $limit = 20;
        }

        $start = $page_num * $limit;

        if (isset($filters)) {
            $filter_blocks = explode(";", $filters);
            foreach ($filter_blocks as $block) {
                $block_str                  = explode(":", $block);
                $all_filters[$block_str[0]] = explode(",", $block_str[1]);
            }

            // FILTERS
            // 1. brand_names
            if (isset($all_filters['brand_names'])) {
                $query = $query->whereIn('site_name', $all_filters['brand_names']);
            }

            // 2. price_from
            if (isset($all_filters['price_from'])) {
                $query = $query
                    ->whereRaw('min_price >= ' . $all_filters['price_from'][0] . '');
            }

            // 3. price_to
            if (isset($all_filters['price_to'])) {
                $query = $query
                    ->whereRaw('max_price <= ' . $all_filters['price_to'][0] . '');
            }
        }

        // 4. type
        if (isset($all_filters['type'])) {
            // will only return products that match the LS_IDs for the `types` mentioned.
            $LS_IDs = Product::get_sub_cat_LS_IDs($dept, $cat, $all_filters['type']);
        } else {
            // 5. departments and categories
            if (null != $cat) {
                $LS_IDs = Product::get_LS_IDs($dept, $cat);
            } else {
                $LS_IDs = Product::get_LS_IDs($dept);
            }
        }

        //$query = $query->whereRaw('LS_ID REGEXP "' . implode("|", $LS_IDs) . '"');

        // 7. sort_type

        if (isset($sort_type)) {
            $query = $query->orderBy('popularity', 'desc');
        }

        // 6. limit
        $query = $query->offset($start)->limit($limit);

        //echo "<pre>" . print_r($all_filters, true);
        return Product::getProductObj($query->get(), $all_filters);
    }

/* if (!isset($limit)) {
$limit = 20;
}

$start = $page * $perPage;

$query = DB::table('master_data')
->offset($start)
->limit($perPage);
if (null != $cat) {
$query = $query->whereRaw('LS_ID REGEXP "' . implode("|", Product::get_LS_IDs($dept, $cat)) . '"');
} else {
$query = $query->whereRaw('LS_ID REGEXP "' . implode("|", Product::get_LS_IDs($dept)) . '"');
}

if (isset($ls_ids)) {
$ls_ids = explode(",", $ls_ids);
$query  = $query
->whereRaw('LS_ID REGEXP "' . implode("|", $ls_ids) . '"');
}
if (isset($min_val)) {
$query = $query
->whereRaw('min_price >= ' . $min_val . '');
}
if (isset($max_val)) {
$query = $query
->whereRaw('max_price <= ' . $max_val . '');
}
if (isset($brand_filters)) {
$brand_filters = explode(",", $brand_filters);
$query         = $query
->whereIn('site_name', $brand_filters);
}
if (isset($sub_category_filters)) {
$sub_category_filters = explode(",", $sub_category_filters);
$query                = $query
->whereRaw('LS_ID REGEXP "' . implode("|", $sub_category_filters) . '"');
}

$products = $query->get();

return Product::getProductObj($products);*/

    public static function getProductObj($products, $all_filters)
    {
        $output = [];
        $p_send = [];

        foreach ($products as $product) {
            array_push($p_send, [
                'id'               => $product->id,
                'sku'              => $product->product_sku,
                'sku_hash'         => $product->sku_hash,
                'site'             => $product->site_name,
                'name'             => $product->product_name,
                'product_url'      => $product->product_url,
                'is_price'         => $product->price,
                'model_code'       => $product->model_code,
                'description'      => $product->product_description,
                'thumb'            => explode("[US]", $product->thumb),
                'color'            => $product->color,
                'images'           => explode(",", $product->images),
                'was_price'        => $product->was_price,
                'features'         => explode("<br>", $product->product_feature),
                'collection'       => $product->collection,
                'set'              => $product->product_set,
                'condition'        => $product->product_condition,
                'created_date'     => $product->created_date,
                'updated_date'     => $product->updated_date,
                'on_server_images' => explode(",", $product->product_images),
                'main_image'       => $product->main_product_images,
                'reviews'          => $product->reviews,
                'rating'           => $product->rating,
                'LS_ID'            => $product->LS_ID,

            ]);
        }

        return ["filterData" => $all_filters, "products" => $p_send];
    }
};
