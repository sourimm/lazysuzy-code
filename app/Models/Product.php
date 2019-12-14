<?php

namespace App\Models;

use App\Http\Controllers\ProductController;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;
use App\Models\Department;
use App\Models\Dimension;

use Auth;


class Product extends Model
{
    protected $table = "master_data";
    public static $base_siteurl = 'https://www.lazysuzy.com';
    static $count = 0;

    public static function trending_products($limit) {

        $trending_products = [];
        $rows = DB::table("trending_products")
                    ->select("*")
                    ->join("master_data", "master_data.product_sku", "=", "trending_products.product_sku")
                    ->join("master_brands", "master_data.site_name", "=", "master_brands.value")
                    ->limit($limit)
                    ->orderBy("trending_products.rank", "ASC")
                    ->get();

        foreach($rows as $product) {
            $variations = null; // Product::get_variations($product, null, false);
            array_push($trending_products, Product::get_details($product, $variations, true, false, true));
        }

        return $trending_products;
    }

    public static function get_LS_IDs($dept, $cat = null)
    {

        $LS_IDs = [];
        $data   = DB::table('mapping_core')
            ->select('LS_ID');

        // "all" is for getting all the products irrespective of any department or category
        if ($dept != "all") {
            if (null == $cat) {
                $data = $data
                    ->where('department_', $dept);
            } else {
                $data = $data
                    ->where('department_', $dept)
                    ->where('product_category_', $cat);
            }
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
        $perPage = 24;
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
            $limit = $perPage;
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
                isset($all_filters['brand'])
                && strlen($all_filters['brand'][0]) > 0
            ) {
                $query = $query->whereIn('site_name', $all_filters['brand']);
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

            if (
                isset($all_filters['colors'])
                && strlen($all_filters['colors'][0]) > 0
            ) {
                $query = $query
                    ->whereRaw('color REGEXP "' . $all_filters['colors'][0] . '"');
                // input in form - color1|color2|color3
            }
        }

        // 4. type
        if (isset($all_filters['type']) && strlen($all_filters['type'][0]) > 0) {
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
        // set default sorting to popularity
        else {
            $query = $query->orderBy('popularity', 'desc');
        }

        // 6. limit
        $all_filters['limit'] = $limit;
        $all_filters['count_all'] = $query->count();
        $query = $query->offset($start)->limit($limit);

        //echo "<pre>" . print_r($all_filters, ""true);
        $query = $query->join("master_brands", "master_data.site_name", "=", "master_brands.value");
        return Product::getProductObj($query->get(), $all_filters, $dept, $cat, $subCat, true);
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
        $all_b = DB::table("master_brands")->orderBy("name")->get();
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
            if (isset($all_filters['type']) && strlen($all_filters['type'][0]) > 0) {
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
                if (isset($all_filters['brand'])) {
                    if (in_array($b->site_name, $all_filters['brand'])) {
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
                $p_from = round($all_filters['price_from'][0]);
            }

            if (isset($all_filters['price_to'])) {
                $p_to = round($all_filters['price_to'][0]);
            }

            if ($p_from == 0) $p_from = $min;
            if ($p_to == 0) $p_to = $max;

            return [
                "from" => round($p_from),
                "to" => round($p_to),
                "max" => $max,
                "min" => $min
            ];
        }
    }

    public static function get_color_filter($products)
    {
        $colors = [
            "black" => "#000000",
            "blue" => "#0000ee",
            "brown" => "#a52a2a",
            "clear" => "#dcf0ef",
            "copper" => "#b87333",
            "gold" => "#FFD700",
            "green" => "#008000",
            "grey" => "#808080",
            "multicolor" => "#eeeeee",
            "pink" => "#FFC0CB",
            "purple" => "#800080",
            "red" => "#FF0000",
            "silver" => "#C0C0C0",
            "tan" => "#d2b48c",
            "white" => "#ffffff",
        ];

        foreach ($colors as $key => $color_hex) {
            $colors[$key] = [
                'name' => ucfirst($key),
                'value' => strtolower($key),
                'hex' => $color_hex,
                'enabled' => false
            ];
        }
        foreach ($products as $product) {
            $product_colors = explode(",", $product->color);
            foreach ($product_colors as $p_color) {
                if (strlen($p_color) > 0 && array_key_exists(strtolower($p_color), $colors)) {
                    $colors[strtolower($p_color)]['name'] = ucfirst($p_color);
                    $colors[strtolower($p_color)]['enabled'] = true;
                }
            }
        }

        $colors_f = [];
        foreach ($colors as $key => $color) {
            array_push($colors_f, $color);
        }

        return $colors_f;
    }
    public static function get_sub_cat_data($dept, $cat)
    {

        $sub_cat_LS_IDs = DB::table("mapping_core")
            ->select(["product_sub_category", "product_sub_category_", "LS_ID"])
            ->where("department_", $dept);

        if ($cat != null)
            $sub_cat_LS_IDs = $sub_cat_LS_IDs->where("product_category_", $cat);

        return $sub_cat_LS_IDs->whereRaw("LENGTH(product_sub_category_) != 0")->get();
    }
    public static function get_filter_products_meta($dept, $cat, $subCat, $all_filters)
    {

        $LS_IDs = Product::get_dept_cat_LS_ID_arr($dept, $cat);


        if (isset($all_filters['type']) && strlen($all_filters['type'][0]) > 0) {
            // comment this line if you want to show count for all those
            // sub_categories that are paased in the request.
            //$LS_IDs = Product::get_sub_cat_LS_IDs($dept, $cat, $all_filters['type']);

            // if uncommenting the above line, comment this one
            $LS_IDs = Product::get_dept_cat_LS_ID_arr($dept, $cat);
        }

        $products = DB::table("master_data")
            ->select(['LS_ID', 'color'])
            ->whereRaw('LS_ID REGEXP "' . implode("|", $LS_IDs) . '"');

        if (isset($all_filters['brand']) && strlen($all_filters['brand'][0]) > 0) {
            $products = $products->whereIn('site_name', $all_filters['brand']);
        }

        return $products->get();
    }

    public static function get_product_type_filter($dept, $cat, $subCat, $all_filters)
    {

        $products = Product::get_filter_products_meta($dept, $cat, $subCat, $all_filters);

        $sub_cat_arr = [];

        $sub_cat_LS_IDs = Product::get_sub_cat_data($dept, $cat);

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

        return [
            'colorFilter' => Product::get_color_filter($products),
            'productTypeFilter' => $arr
        ];
    }

    public static function getProductObj($products, $all_filters, $dept, $cat, $subCat, $isListingAPICall = null)
    {
        $p_send              = [];
        $filter_data         = [];
        $brand_holder        = [];
        $price_holder        = [];
        $product_type_holder = [];

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

        // removing waste data
        $westelm_cache_data = [];

        // check if the prodcuts is in a wishlist
        $wishlist_products = [];
        if (Auth::check()) {
            $user = Auth::user();
            $w_products = DB::table("user_wishlists")
                ->select("product_id")
                ->where("user_id", $user->id)
                ->where("is_active", 1)
                ->get();

            // cleaning the array
            foreach ($w_products as $p)
                array_push($wishlist_products, $p->product_id);
        }
        
        foreach ($products as $product) {

            $isMarked = false;
            if (Auth::check()) {
                if (in_array($product->product_sku, $wishlist_products)) {
                    $isMarked = true;
                }
            }

            $variations = Product::get_variations($product, $westelm_variations_data, $isListingAPICall);
            array_push($p_send, Product::get_details($product, $variations, $isListingAPICall, $isMarked));
        }

        $brand_holder = Product::get_brands_filter($dept, $cat, $all_filters);
        $price_holder = Product::get_price_filter($dept, $cat, $all_filters);
        $product_type_holder = Product::get_product_type_filter($dept, $cat, $subCat, $all_filters)['productTypeFilter'];
        $color_filter = Product::get_product_type_filter($dept, $cat, $subCat, $all_filters)['colorFilter'];

        $filter_data = [
            "brand"  => $brand_holder,
            "price"        => $price_holder,
            "type" => $product_type_holder,
            // 'colors' => $color_filter
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

    public static function get_details($product, $variations, $isListingAPICall = null, $isMarked = false, $isTrending = false)
    {
        $p_val = $wp_val = $discount = null;

        $p_price = str_replace("$", "", $product->price);
        $wp_price = str_replace("$", "", $product->was_price);

        $price_bits = explode("-", $p_price);
        $was_price_bits = explode("-", $wp_price);

        if (isset($price_bits[1]) && isset($was_price_bits[1])) {
            $p_val = $price_bits[0];
            $wp_val = $was_price_bits[0];
        } else {
            $p_val = $p_price;
            $wp_val =  $wp_price;
        }

        if (is_numeric($p_val) && is_numeric($wp_val) && $wp_val > 0) {
            $discount = (1 - ($p_val / $wp_val)) * 100;
            $discount = number_format((float) $discount, 2, '.', '');
        }

        $data =  [
            'id'               => $product->id,
            'sku'              => $product->product_sku,
            //    'sku_hash'         => $product->sku_hash,
            'site'             => $product->name,
            'name'             => $product->product_name,
            'product_url'      => urldecode($product->product_url),
            'product_detail_url' => Product::$base_siteurl . "/product/" . $product->product_sku,
            'is_price'         => $product->price,
            'was_price'        => $product->was_price,
            'percent_discount' => $discount,
            'model_code'       => $product->model_code,
            //    'description'      => preg_split("/\\[US\\]|<br>|\\n/", $product->product_description),
            //    'dimension'        => $product->site_name == "cb2" ? Product::cb2_dimensions($product->product_dimension) : $product->product_dimension,
            //    'thumb'            => preg_split("/,|\\[US\\]/", $product->thumb),
            'color'            => $product->color,
            //    'images'           => array_map([__CLASS__, "baseUrl"], preg_split("/,|\\[US\\]/", $product->images)),
            //    'features'         => preg_split("/\\[US\\]|<br>|\\n/", $product->product_feature),
            'collection'       => $product->collection,
            //    'set'              => $product->product_set,
            'condition'        => $product->product_condition,
            //    'created_date'     => $product->created_date,
            //    'updated_date'     => $product->updated_date,
            //    'on_server_images' => array_map([__CLASS__, "baseUrl"], preg_split("/,|\\[US\\]/", $product->product_images)),
            'main_image'       => Product::$base_siteurl . $product->main_product_images,
            'reviews'          => $product->reviews,
            'rating'           => (float) $product->rating,
            'wishlisted'       => $isMarked
            //    'LS_ID'            => $product->LS_ID,


        ];

        /* if ($product->site_name == "westelm" && !$isListingAPICall ) {
            $data['filters'] = end($variations)['filters'];
            array_pop($variations);
        } */

        $data['variations'] = $variations;

        $desc_BRANDS = ["West Elm"];
        $dims_from_features = ["World Market"]; // these extract dimensions data from features data.
        $dims_text = in_array($product->name, $dims_from_features) ? $product->product_feature : $product->product_dimension;

        if (!$isListingAPICall) {
            $data['description'] = in_array($product->name, $desc_BRANDS)  ? Product::format_desc_new($product->product_description) : preg_split("/\\[US\\]|<br>|\\n/", $product->product_description);
            $data['dimension'] = Product::normalize_dimension($dims_text, $product->site_name);
            $data['thumb'] = preg_split("/,|\\[US\\]/", $product->thumb);
            $data['features'] = in_array($product->name, $desc_BRANDS) ? Product::format_desc_new($product->product_feature) : preg_split("/\\[US\\]|<br>|\\n|\|/", $product->product_feature);
            $data['on_server_images'] = array_map([__CLASS__, "baseUrl"], preg_split("/,|\\[US\\]/", $product->product_images));
            $data['department_info'] = Department::get_department_info($product->LS_ID);
            return $data;
        } else {

            if ($isTrending) {
                $data['description'] = in_array($product->name, $desc_BRANDS)  ? Product::format_desc_new($product->product_description) : preg_split("/\\[US\\]|<br>|\\n/", $product->product_description);
            }
            return $data;
        }
    }

    public static function restructure_str($str)
    {
        $str = str_replace("\\n", "", $str);
        $pre_delimeters = ["*", "#"];
        $i = 0;
        $new_str = "";
        $new_Arr = [];
        while ($i < strlen($str)) {

            if (($str[$i] === "*" && $str[$i + 1] === "*") || ($str[$i] === "*" && $str[$i - 1] === "*")) {

                if ($str[$i - 1] == "*") $i += 1;
                else $i += 2;

                while (isset($str[$i]) && $str[$i] != "*" && ord($str[$i]) != 13) {
                    ///echo $str[$i];
                    $new_str .= $str[$i++];
                }
                //echo "<br>";
                $i += 2;

                if (strlen($new_str) >= 3) {
                    $new_str = "**" . $new_str . "**";
                    $new_Arr[] = $new_str;
                    $new_str = "";
                }
            } else if (($str[$i] === "#" && $str[$i + 1] === "#") || ($str[$i] === "#" && $str[$i - 1] === "#")) {
                while (isset($str[$i]) && $str[$i] != "\n") {
                    $new_str .= $str[$i++];
                }

                $new_str = "**" . str_replace("#", "", $new_str) . "**";
                if (strlen($new_str) > 6) {
                    $new_Arr[] = $new_str;
                    $new_str = "";
                }
            } else if (($str[$i] === "*" && $str[$i + 1] !== "*") || ($str[$i] != "*" && $str[$i - 1] === "*")) {
                while (isset($str[$i]) && $str[$i] != "\n") {
                    // echo $str[$i];
                    $new_str .= $str[$i++];
                }
                //echo "<br>";
                //echo "I = > $i" . $str[$i] . "<br>";
                if (strlen($new_str) > 6) {
                    $new_Arr[] = "*" . $new_str;
                    $new_str = "";
                }
            } else {

                while (isset($str[$i]) && !in_array($str[$i], $pre_delimeters)) {
                    //echo $str[$i];
                    $new_str .= $str[$i++];
                }
                //echo "<br>";

                if (strlen($new_str) > 6) {
                    $new_Arr[] = $new_str;
                    $new_str = "";
                }
            }



            $i++;
        }

        for ($i = 0; $i < sizeof($new_Arr); $i++) {
            $new_Arr[$i] = str_replace([chr(13), "\n", " "], " ", $new_Arr[$i]);
        }
        return $new_Arr;
    }


    public static function format_desc_new($desc)
    {
        $desc_arr = Product::restructure_str($desc);
        $new_desc = [];
        foreach ($desc_arr as $line) {
            if (strlen($line) > 0) {
                if (strrpos($line, "**") == true) {
                    $arr = explode("**", $line)[1];
                    array_push($new_desc, "<span style= 'font-family:Fenix; font-weight: bold'>" . $arr . "</span>");
                } else if (strrpos($line, "[")) {
                    preg_match("/\[[^\]]*\]/", $line, $matched_texts);
                    preg_match('/\([^\]]*\)/', $line, $matched_links);

                    if (sizeof($matched_links) == sizeof($matched_texts)) {
                        for ($i = 0; $i < sizeof($matched_links); $i++) {
                            $str = "<a href='" . trim(substr($matched_links[$i], 1, -1)) . "'> " . trim(substr($matched_texts[$i], 1, -1)) . " </a> ";

                            $line = str_replace($matched_links[$i], "", $line);
                            $line = str_replace($matched_texts[$i], $str, $line);

                            array_push($new_desc, $line);
                        }
                    }
                } else {
                    array_push($new_desc, $line);
                }
            }
        }

        return  $new_desc;
    }

    public static function cb2_dimensions($json_string)
    {

        if ($json_string === "null") return [];

        $dim = json_decode($json_string);

        if (json_last_error()) return [];

        $d_arr = [];
        $dd_arr = [];

        foreach ($dim as $d) {
            if ($d->hasDimensions) {
                array_push($d_arr, $d);
            }
        }

        //return $json_string;
        return $d_arr;
    }

    public static function baseUrl($link)
    {
        return Product::$base_siteurl . $link;
    }

    public static function get_cb2_variations($sku)
    {
        $cols = [
            "product_sku",
            "variation_sku",
            "swatch_image",
            "variation_image",
            "variation_name",
            "has_parent_sku"
        ];

        $product_variations = [];
        $variations = DB::table("cb2_products_variations")
            ->select($cols)
            ->distinct('variation_sku')
            ->where('product_sku', $sku)
            ->get();

        foreach ($variations as $variation) {
            if ($variation->product_sku != $variation->variation_sku) {
                $link = Product::$base_siteurl . "/product/";

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
                    "swatch_image" => Product::$base_siteurl . $variation->swatch_image,
                    "image" => Product::$base_siteurl . $variation->variation_image,
                    "link" => $link
                ]);
            }
        }

        return $product_variations;
    }

    public static function get_pier1_variations($product)
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
                    "image" => Product::$base_siteurl . $variation->main_product_images,
                    "link" => Product::$base_siteurl . "/product/" . $variation->product_sku,
                    "swatch" => ""
                ]);
            }
        }

        return $product_variations;
    }

    public static function get_filter_key($key)
    {
        $key = preg_replace('/please|Please|select|Select/', '', $key);
        return (strtolower(preg_replace("/[\s]+/", "_", trim($key))));
    }

    public static function get_filter_label($key)
    {
        $key = preg_replace('/please|Please|select|Select/', '', $key);
        return $key;
    }

    public static function get_westelm_variations($product, $wl_v, $isListingAPICall = null)
    {
        $cols = [
            "sku",
            "product_id",
            "swatch_image_path",
            "image_path",
            "name",
            "swatch_image",
            "attribute_1",
            "attribute_2",
            "attribute_3",
            "attribute_4",
            "attribute_5",
            "attribute_6",

        ];

        if (isset($wl_v[$product->product_sku])) {
            if ($wl_v[$product->product_sku]) {
                $var = DB::table("westelm_products_skus")
                    ->select($cols);

                if ($isListingAPICall) $var = $var->groupBy("swatch_image_path");

                $var = $var->groupBy("swatch_image")
                    ->where("product_id", $product->product_sku);

                if ($isListingAPICall) $var = $var->limit(7);
                //->limit(20)
                $var = $var->get();

                $variations = [];
                $variation_filters = [];
                $swatches = [];
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
                        "swatch_image" => strlen($prod->swatch_image) != 0 ? Product::$base_siteurl . $prod->swatch_image_path : null
                    ]);
                }


                if (!$isListingAPICall) {
                    array_push($variations, [
                        "filters" => Product::get_all_variation_filters($product->product_sku)
                    ]);
                }

                return $variations;
            }
        }

        return [];
    }

    public static function get_variations($product, $wl_v = null, $isListingAPICall = null)
    {

        switch ($product->site_name) {
            case 'cb2':
                return Product::get_CB2_variations($product->product_sku);
                break;
            case 'pier1':
                return Product::get_pier1_variations($product);
                break;
            case 'westelm':
                return Product::get_westelm_variations($product, $wl_v, $isListingAPICall);
                break;
            default:
                return [];
                break;
        }
    }

    // LS_ID can be comma separated.
    public static function get_product_LS_ID($sku) {
        
        $prod = Product::where("product_sku", $sku)
                ->get();
        if (sizeof($prod) != 0) {
            return $prod[0]->LS_ID;
        }

        return null;
    }


    public static function get_product_details($sku)
    {
        $prod = Product::where('product_sku', $sku)
            ->join("master_brands", "master_data.site_name", "=", "master_brands.value")

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
        if ($prod[0]->site_name === 'westelm') {
            $variations = null;
        } else {
            $variations = Product::get_variations($prod[0]);
        }
        return Product::get_details($prod[0], $variations);
    }

    // sends unique filter values.
    public static function get_all_variation_filters($sku)
    {
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
                    // $filter_key = Product::get_filter_key($str_exp[0]);
                    $filter_key = $col;
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
                            "label" => $str_exp[0],
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

    public static function normalize_dimension($dim_str, $site)
    {

        switch ($site) {
            case 'cb2':
                return Dimension::format_cb2($dim_str);
                break;

            case 'pier1':
                return Dimension::format_pier1($dim_str);
                break;

            case 'westelm':
                return Dimension::format_westelm($dim_str);
                break;

            case 'cab':
                return Dimension::format_cab($dim_str);
                break;

            case 'nw':
                return Dimension::format_new_world($dim_str);
                break;

            default:
                return null;
                break;
        }
    }
};
