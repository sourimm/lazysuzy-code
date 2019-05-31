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

    public static function get_sub_cat_LS_ID($dept, $cat, $sub_category)
    {
        $ls_id = DB::table('mapping_core')
            ->select('LS_ID')
            ->where('department_', $dept)
            ->where('product_category_', $cat)
            ->where('product_sub_category_', $sub_category)
            ->get();

        if ($ls_id) {
            return $ls_id[0]->LS_ID;
        } else {
            return null;
        }
    }

    public static function get_sub_cat_LS_IDs($dept, $cat, $sub_categories)
    {
        $LS_IDs = [];
        foreach ($sub_categories as $sub_category) {
            $ls_id = Product::get_sub_cat_LS_ID($dept, $cat, $sub_category);
            if (null != $ls_id) {
                array_push($LS_IDs, $ls_id);
            }
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
                $all_filters[$block_str[0]] = array_map("strtolower", $all_filters[$block_str[0]]);
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

        $query = $query->whereRaw('LS_ID REGEXP "' . implode("|", $LS_IDs) . '"');

        // 7. sort_type

        if (isset($sort_type)) {
            $query = $query->orderBy('popularity', 'desc');
        }

        // 6. limit
        $query = $query->offset($start)->limit($limit);

        //echo "<pre>" . print_r($all_filters, true);
        return Product::getProductObj($query->get(), $all_filters, $dept, $cat);
    }

    public static function get_dept_cat_LS_ID_arr($dept, $cat)
    {
        $LS_IDs = null;

        if (null != $cat) {
            $LS_IDs = Product::get_LS_IDs($dept, $cat);
        } else {
            $LS_IDs = Product::get_LS_IDs($dept);
        }

        return $LS_IDs;
    }

    public static function get_brands_filter($dept, $cat, $all_filters)
    {
        $all_brands = [];
        $all_b = DB::table("master_brands")->get();
        $LS_IDs = Product::get_dept_cat_LS_ID_arr($dept, $cat);


        foreach ($all_b as $brand) {
            $all_brands[$brand->value] = [
                "name" => $brand->name,
                "value" => strtolower($brand->value),
                "enabled" => false,
                "checked" => false,
                "count" => 0
            ];
        }

        if (sizeof($all_filters) == 0) {

            $product_brands = DB::table("master_data")
                ->selectRaw("count(product_name) AS products, site_name")
                ->whereRaw('LS_ID REGEXP "' . implode("|", $LS_IDs) . '"')
                ->groupBy('site_name')
                ->get();
        } else {
            if (isset($all_filters['type'])) {

                $LS_IDs = Product::get_sub_cat_LS_IDs($dept, $cat, $all_filters['type']);
            }
        }

        $product_brands = DB::table("master_data")
            ->selectRaw("count(product_name) AS products, site_name")
            ->whereRaw('LS_ID REGEXP "' . implode("|", $LS_IDs) . '"')
            ->groupBy('site_name')
            ->get();

        foreach ($product_brands as $b) {
            if (isset($all_brands[$b->site_name])) {
                $all_brands[$b->site_name]["enabled"] = true;
                if (isset($all_filters['brand_names'])) {
                    if (in_array($b->site_name, $all_filters['brand_names'])) {
                        $all_brands[$b->site_name]["checked"] = true;
                    }
                }
                $all_brands[$b->site_name]["count"] = $b->products;
            }
        }

        $brands_holder = [];

        foreach ($all_brands as $name => $value) {
            array_push($brands_holder, $value);
        }

        return $brands_holder;
    }

    public static function get_price_filter($dept, $cat, $all_filters)
    {

        $p_to = $p_from = null;
        $LS_IDs = Product::get_dept_cat_LS_ID_arr($dept, $cat);

        $min = DB::table("master_data")
            ->whereRaw('LS_ID REGEXP "' . implode("|", $LS_IDs) . '"')
            ->min('min_price');

        $max = DB::table("master_data")
            ->whereRaw('LS_ID REGEXP "' . implode("|", $LS_IDs) . '"')
            ->max('max_price');

        if (sizeof($all_filters) == 0) {
            // get min price and max price for all the products

            return [
                "min_price" => $min,
                "max_price" => $max
            ];
        } else {

            if (isset($all_filters['price_from'])) {
                $p_from = $all_filters['price_from'][0];
            }

            if (isset($all_filters['price_to'])) {
                $p_to = $all_filters['price_to'][0];
            }

            return [
                "price_from" => (int)$p_from,
                "price_to" => (int)$p_to,
                "max_price" => $max,
                "min_price" => $min
            ];
        }
    }

    public static function get_product_type_filter($dept, $cat, $all_filters)
    {
        $sub_cat_LS_IDs = DB::table("mapping_core")
            ->select(["product_sub_category", "product_sub_category_", "LS_ID"])
            ->where("department_", $dept);

        if ($cat != null)
            $sub_cat_LS_IDs = $sub_cat_LS_IDs->where("product_category_", $cat);

        $sub_cat_LS_IDs = $sub_cat_LS_IDs->whereRaw("LENGTH(product_sub_category_) != 0")->get();


        $LS_IDs = Product::get_dept_cat_LS_ID_arr($dept, $cat);


        if (isset($all_filters['type'])) {
            // comment this line if you want to show count for all those 
            // sub_categories that are paased in the request.
            //$LS_IDs = Product::get_sub_cat_LS_IDs($dept, $cat, $all_filters['type']);

            // if uncommenting the above line, comment this one
            $LS_IDs = Product::get_dept_cat_LS_ID_arr($dept, $cat);
        }

        $products = DB::table("master_data")
            ->select("LS_ID")
            ->whereRaw('LS_ID REGEXP "' . implode("|", $LS_IDs) . '"')
            ->get();

        $sub_cat_arr = [];

        foreach ($sub_cat_LS_IDs as $cat) {
            $sub_cat_arr[$cat->product_sub_category_] = [
                "name" => $cat->product_sub_category,
                "value" => strtolower($cat->product_sub_category_),
                "enabled" => false,
                "checked" => false,
                "count" => 0
            ];
        }

        //echo "<pre>" . print_r($all_filters, true);
        foreach ($sub_cat_LS_IDs as $cat) {
            foreach ($products as $p) {
                if (strpos($p->LS_ID, (string)$cat->LS_ID) !== false) {
                    if (isset($sub_cat_arr[$cat->product_sub_category_])) {
                        $sub_cat_arr[$cat->product_sub_category_]["enabled"] = true;
                        $sub_cat_arr[$cat->product_sub_category_]["count"]++;

                        if (isset($all_filters['type'])) {
                            $sub_category = strtolower($cat->product_sub_category_);
                            if (in_array($sub_category, $all_filters['type'])) {
                                $sub_cat_arr[$cat->product_sub_category_]["checked"] = true;
                            }
                        }
                    }
                }
            }
        }

        $arr = [];
        foreach ($sub_cat_arr as $key => $value) {
            array_push($arr, $value);
        }

        return $arr;
    }
    public static function getProductObj($products, $all_filters, $dept, $cat)
    {
        $output             = [];
        $p_send             = [];
        $brand_count        = [];
        $product_type_count = [];
        $product_type_LS_ID = [];
        $filter_data         = [];
        $brand_holder        = [];
        $price_holder        = [];
        $product_type_holder = [];
        $LS_ID_count = [];
        $brands_is_checked = [];
        $base_siteurl = 'https://lazysuzy.com';
        $b = DB::table("master_brands")->get();

        foreach ($products as $product) {

            $variations = Product::get_variations($product->product_sku);
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
                'thumb'            => preg_split("/,|\\[US\\]/", $product->thumb),
                'color'            => $product->color,
                'images'           => preg_split("/,|\\[US\\]/", $product->images),
                'was_price'        => $product->was_price,
                'features'         => preg_split("/,|\\[US\\]/", $product->product_feature),
                'collection'       => $product->collection,
                'set'              => $product->product_set,
                'condition'        => $product->product_condition,
                'created_date'     => $product->created_date,
                'updated_date'     => $product->updated_date,
                'on_server_images' => preg_split("/,|\\[US\\]/", $product->product_images),
                'main_image'       => $base_siteurl . $product->main_product_images,
                'reviews'          => $product->reviews,
                'rating'           => $product->rating,
                'LS_ID'            => $product->LS_ID,
                'variations'       => $variations

            ]);
        }

        $brand_holder = Product::get_brands_filter($dept, $cat, $all_filters);
        $price_holder = Product::get_price_filter($dept, $cat, $all_filters);
        $product_type_holder = Product::get_product_type_filter($dept, $cat, $all_filters);
        $filter_data = [
            "brand_names"  => $brand_holder,
            "price"        => $price_holder,
            "product_type" => $product_type_holder,
        ];


        return [
            "count"      => count($products),
            "filterData" => $filter_data,
            "products"   => $p_send,
        ];
    }

    public static function get_variations($sku)
    {
        $product_variations = [];
        $base_siteurl = 'https://lazysuzy.com';

        $variations = DB::table("cb2_products_variations")
            ->where('product_sku', $sku)
            ->get();

        foreach ($variations as $variation) {
            if ($variation->product_sku != $variation->variation_sku) {
                $link = $base_siteurl . "/product-detail/";
                if ($variation->has_parent_sku) {
                    $link .= $variation->variation_sku;
                } else {
                    $link .= $variation->product_sku;
                }
                array_push($product_variations, [
                    "product_sku" => $variation->product_sku,
                    "variation_sku" => $variation->variation_sku,
                    "name" => $variation->variation_name,
                    "has_parent_sku" => $variation->has_parent_sku,
                    "image" => $variation->variation_images,
                    "link" => $link
                ]);
            }
        }

        return $product_variations;
    }
};
