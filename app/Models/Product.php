<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;
use Auth;


class Product extends Model
{
    protected $table = "master_data";
    public static $base_siteurl = 'https://lazysuzy.com';
    static $count = 0;

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

    public static function get_filter_products($dept, $cat = null, $subCat = null)
    {
        $perPage = 20;
        DB::enableQueryLog();
        $LS_IDs = null;
        $PRICE_ASC = "price_low_to_high";
        $PRICE_DESC = "price_high_to_low";
        $POPULARITY = "popularity";

        $sort_type_filter = [
            [
                "name" => "PRICE: LOW TO HIGH",
                "value" => $PRICE_ASC,
                "enabled" => false
            ],
            [
                "name" => "PRICE: HIGH TO LOW",
                "value" => $PRICE_DESC,
                "enabled" => false
            ],
            [
                "name" => "POPULARITY",
                "value" => $POPULARITY,
                "enabled" => false
            ]
        ];
        $s = $sort_type_filter;

        $page_num    = Input::get("pageno");
        $limit       = Input::get("limit");
        $sort_type   = Input::get("sort_type");
        $filters     = Input::get("filters");
        $all_filters = [];
        $query       = DB::table('master_data');

        if (isset($sort_type)) {
            for ($i = 0; $i < sizeof($sort_type_filter); $i++) {
                if ($sort_type_filter[$i]['value'] == $sort_type) {
                    $sort_type_filter[$i]['enabled'] = true;
                }
            }
        }

        $all_filters['sort_type'] = $sort_type_filter;
        if (!isset($limit)) {
            $limit = 20;
        }

        $start = $page_num * $limit;

        if (isset($filters)) {
            $filter_blocks = explode(";", $filters);
            foreach ($filter_blocks as $block) {
                $block_str = explode(":", $block);

                if (isset($block_str[0]) && isset($block_str[1])) {
                    $all_filters[$block_str[0]] = explode(",", $block_str[1]);
                    $all_filters[$block_str[0]] = array_map("strtolower", $all_filters[$block_str[0]]);
                }
            }

            // FILTERS
            // 1. brand_names
            if (
                isset($all_filters['brand_names'])
                && strlen($all_filters['brand_names'][0]) > 0
            ) {
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
        if (isset($all_filters['product_type']) && strlen($all_filters['product_type'][0]) > 0) {
            // will only return products that match the LS_IDs for the `types` mentioned.
            $LS_IDs = Product::get_sub_cat_LS_IDs($dept, $cat, $all_filters['product_type']);
        } else {
            // 5. departments and categories
            if (null != $cat) {
                $LS_IDs = Product::get_LS_IDs($dept, $cat);
            } else {
                $LS_IDs = Product::get_LS_IDs($dept);
            }
        }

        // only include sub category products if subcategory is not null
        if ($subCat != null) {
            $LS_IDs = [Product::get_sub_cat_LS_ID($dept, $cat, $subCat)];
        }

        $query = $query->whereRaw('LS_ID REGEXP "' . implode("|", $LS_IDs) . '"');

        // 7. sort_type
        if (isset($sort_type)) {

            if ($sort_type == $PRICE_ASC) {
                $query = $query->orderBy('min_price', 'asc');
            } else if ($sort_type == $PRICE_DESC) {
                $query = $query->orderBy('min_price', 'desc');
            } else if ($sort_type == $POPULARITY) {
                $query = $query->orderBy('popularity', 'desc');
            }
        }

        // 6. limit
        $all_filters['limit'] = $limit;
        $all_filters['count_all'] = $query->count();
        $query = $query->offset($start)->limit($limit);

        //echo "<pre>" . print_r($all_filters, true);
        return Product::getProductObj($query->get(), $all_filters, $dept, $cat, $subCat);
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

        if (sizeof($all_filters) != 0) {
            if (isset($all_filters['product_type']) && strlen($all_filters['product_type'][0]) > 0) {
                $LS_IDs = Product::get_sub_cat_LS_IDs($dept, $cat, $all_filters['product_type']);
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
                "min" => $min,
                "max" => $max
            ];
        } else {

            if (isset($all_filters['price_from'])) {
                $p_from = $all_filters['price_from'][0];
            }

            if (isset($all_filters['price_to'])) {
                $p_to = $all_filters['price_to'][0];
            }

            if ($p_from == 0) $p_from = $min;
            if ($p_to == 0) $p_to = $max;

            return [
                "from" => (float) $p_from,
                "to" => (float) $p_to,
                "max" => $max,
                "min" => $min
            ];
        }
    }

    public static function get_product_type_filter($dept, $cat, $subCat, $all_filters)
    {
        $sub_cat_LS_IDs = DB::table("mapping_core")
            ->select(["product_sub_category", "product_sub_category_", "LS_ID"])
            ->where("department_", $dept);

        if ($cat != null)
            $sub_cat_LS_IDs = $sub_cat_LS_IDs->where("product_category_", $cat);

        $sub_cat_LS_IDs = $sub_cat_LS_IDs->whereRaw("LENGTH(product_sub_category_) != 0")->get();

        $LS_IDs = Product::get_dept_cat_LS_ID_arr($dept, $cat);


        if (isset($all_filters['product_type']) && strlen($all_filters['product_type'][0]) > 0) {
            // comment this line if you want to show count for all those 
            // sub_categories that are paased in the request.
            //$LS_IDs = Product::get_sub_cat_LS_IDs($dept, $cat, $all_filters['type']);

            // if uncommenting the above line, comment this one
            $LS_IDs = Product::get_dept_cat_LS_ID_arr($dept, $cat);
        }

        $products = DB::table("master_data")
            ->select("LS_ID")
            ->whereRaw('LS_ID REGEXP "' . implode("|", $LS_IDs) . '"');

        if (isset($all_filters['brand_names']) && strlen($all_filters['brand_names'][0]) > 0) {
            $products = $products->whereIn('site_name', $all_filters['brand_names']);
        }

        $products = $products->get();

        $sub_cat_arr = [];

        foreach ($sub_cat_LS_IDs as $cat) {
            $selected = false;
            if (strtolower($cat->product_sub_category_) == strtolower($subCat)) $selected = true;
            $sub_cat_arr[$cat->product_sub_category_] = [
                "name" => $cat->product_sub_category,
                "value" => strtolower($cat->product_sub_category_),
                "enabled" => false,
                "checked" => $selected,
                "count" => 0
            ];
        }

        //echo "<pre>" . print_r($all_filters, true);
        foreach ($sub_cat_LS_IDs as $cat) {
            foreach ($products as $p) {
                if (strpos($p->LS_ID, (string) $cat->LS_ID) !== false) {
                    if (isset($sub_cat_arr[$cat->product_sub_category_])) {
                        $sub_cat_arr[$cat->product_sub_category_]["enabled"] = true;
                        $sub_cat_arr[$cat->product_sub_category_]["count"]++;

                        if (isset($all_filters['product_type'])) {
                            $sub_category = strtolower($cat->product_sub_category_);
                            if (in_array($sub_category, $all_filters['product_type'])) {
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
    public static function getProductObj($products, $all_filters, $dept, $cat, $subCat)
    {
        $p_send             = [];
        $filter_data         = [];
        $brand_holder        = [];
        $price_holder        = [];
        $product_type_holder = [];
        $base_siteurl = 'https://lazysuzy.com';
        $westelm_cache_data  = DB::table("westelm_products_skus")
            ->selectRaw("COUNT(product_id) AS product_count, product_id")
            ->groupBy("product_id")
            ->get();
        $westelm_variations_data = [];
        if (sizeof($westelm_cache_data) > 0) {
            foreach ($westelm_cache_data as $row) {
                $westelm_variations_data[$row->product_id] = $row->product_count;
            }
        }

        $westelm_cache_data = [];


        foreach ($products as $product) {

            $variations = Product::get_variations($product, $westelm_variations_data);
            array_push($p_send, Product::get_details($product, $base_siteurl, $variations));
        }

        $brand_holder = Product::get_brands_filter($dept, $cat, $all_filters);
        $price_holder = Product::get_price_filter($dept, $cat, $all_filters);
        $product_type_holder = Product::get_product_type_filter($dept, $cat, $subCat, $all_filters);
        $filter_data = [
            "brand_names"  => $brand_holder,
            "price"        => $price_holder,
            "product_type" => $product_type_holder,
        ];


        return [
            "total"      => $all_filters['count_all'],
            "constructor_count" => Product::$count,
            "sortType"  => isset($all_filters['sort_type']) ? $all_filters['sort_type'] : null,
            "limit"      => isset($all_filters['limit']) ? $all_filters['limit'] : null,
            "filterData" => $filter_data,
            "products"   => $p_send,
        ];
    }

    public static function get_details($product, $base_siteurl, $variations)
    {
        return [
            'id'               => $product->id,
            'sku'              => $product->product_sku,
            'sku_hash'         => $product->sku_hash,
            'site'             => $product->site_name,
            'name'             => $product->product_name,
            'product_url'      => urldecode($product->product_url),
            'is_price'         => $product->price,
            'model_code'       => $product->model_code,
            'description'      => $product->product_description,
            'dimension'       => $product->product_dimension,
            'thumb'            => preg_split("/,|\\[US\\]/", $product->thumb),
            'color'            => $product->color,
            'images'           => preg_split("/,|\\[US\\]/", $product->images),
            'was_price'        => $product->was_price,
            'features'         => preg_split("/\\[US\\]|<br>|\\n/", $product->product_feature),
            'collection'       => $product->collection,
            'set'              => $product->product_set,
            'condition'        => $product->product_condition,
            'created_date'     => $product->created_date,
            'updated_date'     => $product->updated_date,
            'on_server_images' => array_map([__CLASS__, "baseUrl"], preg_split("/,|\\[US\\]/", $product->product_images)),
            'main_image'       => $base_siteurl . $product->main_product_images,
            'reviews'          => $product->reviews,
            'rating'           => (float) $product->rating,
            'LS_ID'            => $product->LS_ID,
            'variations'       => $variations

        ];
    }

    public static function baseUrl($link)
    {
        return Product::$base_siteurl . $link;
    }

    public static function get_cb2_variations($sku, $base_siteurl)
    {
        $product_variations = [];
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

    public static function get_pier1_variations($product, $base_siteurl)
    {
        $product_variations = [];

        if ($product->master_id == null) return $product_variations;

        $executionStartTime = microtime(true);
        $variations = DB::table("pier1_products")
            ->where("product_status", "active")
            ->where("master_id", $product->master_id)
            ->get();
        $executionEndTime =  microtime(true) - $executionStartTime;

        foreach ($variations as $variation) {

            if ($product->product_sku != $variation->product_sku) {
                array_push($product_variations, [
                    "time_taken" => $executionEndTime,
                    "product_sku" => $product->product_sku,
                    "variation_sku" => $variation->product_sku,
                    "name" => $variation->color,
                    "image" => $base_siteurl . $variation->main_product_images,
                    "link" =>  $base_siteurl . "/product-detail/" . $variation->product_sku
                ]);
            }
        }

        return $product_variations;
    }

    public static function get_filter_key($key)
    {
        $key = preg_replace('/please|Please|select|Select/', '', $key);
        return strtolower(preg_replace("/' '/", "-", $key));
    }

    public static function get_westelm_variations($product, $wl_v)
    {

        if (isset($wl_v[$product->product_sku])) {
            if ($wl_v[$product->product_sku]) {
                $var = DB::table("westelm_products_skus")
                    ->where("product_id", $product->product_sku)
                    //->limit(20)
                    ->get();

                $variations = [];
                $variation_filters = [];

                foreach ($var as $prod) {
                    $features = [];
                    for ($i = 1; $i <= 6; $i++) {
                        $col = "attribute_" . $i;
                        $str = $prod->$col;
                        $str_exp = explode(":", $str);
                        if (isset($str_exp[0]) && isset($str_exp[1])) {
                            //echo $filter_key . "<br>";

                            $filter_key = Product::get_filter_key($str_exp[0]);
                            $features[$filter_key] = $str_exp[1];

                            // setting array indexes for each filter category 
                            if (!isset($variation_filters[$filter_key]))
                                $variation_filters[$filter_key] = [];

                            // saving unique data values for the filter value display
                            /*if (!in_array($str_exp[1], $variation_filters[$str_exp[0]], true)) {
                                array_push($variation_filters[$str_exp[0]], [
                                    "name" => $str_exp[1],
                                    "value" => strtolower(preg_replace("' '", "-", $str_exp[1])),
                                    "enabled" => true
                                ]);
                            }*/
                            $found = false;
                            //echo sizeof($variation_filters[$filter_key]);
                            foreach ($variation_filters[$filter_key] as $filter) {
                                //echo "comparing " . $filter["value"] . " %% " . $str_exp[1] . "<br>";
                                if (isset($filter["name"])) {
                                    if ($filter["name"] == $str_exp[1]) {
                                        $found = true;
                                        break;
                                    }
                                }
                            }

                            if (!$found) {
                                array_push($variation_filters[$filter_key], [
                                    "name" => $str_exp[1],
                                    "value" => strtolower(preg_replace("' '", "-", $str_exp[1])),
                                    "enabled" => true
                                ]);
                            }
                        }
                    }
                    array_push($variations, [
                        "product_sku" => $product->product_sku,
                        "variation_sku" => $prod->sku,
                        "name" => $prod->name,
                        "features" => $features,
                        "image" => Product::$base_siteurl . $prod->image_path,
                        "swatch_image" => Product::$base_siteurl . $prod->swatch_image_path,
                    ]);
                }

                array_push($variations, [
                    "filters" => Product::get_all_variation_filters($product->product_sku)
                ]);

                return $variations;
            }
        }

        return [];
    }

    public static function get_variations($product, $wl_v)
    {
        $base_siteurl = 'https://lazysuzy.com';

        switch ($product->site_name) {
            case 'cb2':
                return Product::get_CB2_variations($product->product_sku, $base_siteurl);
                break;
            case 'pier1':
                return Product::get_pier1_variations($product, $base_siteurl);
                break;
            case 'westelm':
                return Product::get_westelm_variations($product, $wl_v);
                break;
            default:
                return [];
                break;
        }
    }


    public static function get_product_details($sku)
    {
        $product = [];
        $prod = Product::where('product_sku', $sku)
            ->get();
        $westelm_cache_data  = DB::table("westelm_products_skus")
            ->selectRaw("COUNT(product_id) AS product_count, product_id")
            ->groupBy("product_id")
            ->get();
        $westelm_variations_data = [];
        
        if (sizeof($westelm_cache_data) > 0) {
            foreach ($westelm_cache_data as $row) {
                $westelm_variations_data[$row->product_id] = $row->product_count;
            }
        }

        $westelm_cache_data = [];

        $variations = null;
        return Product::get_details($prod[0], Product::$base_siteurl, $variations);
    }

    public static function get_all_variation_filters($sku) {
        $var = DB::table("westelm_products_skus")
            ->where("product_id", $sku)
            //->limit(20)
            ->get();
        $variation_filters = [];

        foreach ($var as $prod) {
            for ($i = 1; $i <= 6; $i++) {
                $col = "attribute_" . $i;
                $str = $prod->$col;
                $str_exp = explode(":", $str);
                if (isset($str_exp[0]) && isset($str_exp[1])) {
                    //echo $filter_key . "<br>";

                    $str_exp[0] = preg_replace('/please|Please|select|Select/', '', $str_exp[0]);
                    $filter_key = Product::get_filter_key($str_exp[0]);
                    $features[$filter_key] = $str_exp[1];

                    // setting array indexes for each filter category 
                    if (!isset($variation_filters[$filter_key]))
                        $variation_filters[$filter_key] = [];

                    // saving unique data values for the filter value display
                   
                    $found = false;
                    //echo sizeof($variation_filters[$filter_key]);
                    foreach ($variation_filters[$filter_key] as $filter) {
                        //echo "comparing " . $filter["value"] . " %% " . $str_exp[1] . "<br>";
                        if (isset($filter["name"])) {
                            if ($filter["name"] == $str_exp[1]) {
                                $found = true;
                                break;
                            }
                        }
                    }

                    if (!$found) {
                        array_push($variation_filters[$filter_key], [
                            "name" => $str_exp[1],
                            "value" => strtolower(preg_replace("' '", "-", $str_exp[1])),
                            "enabled" => true
                        ]);
                    }
                }
            }
        }

        return $variation_filters;
    }

    
};
