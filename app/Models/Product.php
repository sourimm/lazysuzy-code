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

    public static function trending_products($limit)
    {

        $trending_products = [];
        $rows = DB::table("trending_products")
            ->select("*")
            ->join("master_data", "master_data.product_sku", "=", "trending_products.product_sku")
            ->join("master_brands", "master_data.site_name", "=", "master_brands.value")
            ->limit($limit)
            ->orderBy("trending_products.rank", "ASC")
            ->get();

        foreach ($rows as $product) {
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
                    ->where('dept_name_url', $dept);
            } else {
                $data = $data
                    ->where('dept_name_url', $dept)
                    ->where('cat_name_url', $cat);
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
            ->where('dept_name_url', $dept)
            ->where('cat_name_url', $cat)
            ->where('cat_sub_url', $sub_category)
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
        $RECOMMENDED = "recommended";

        $sort_type_filter = [
            [
                "name" => "Recommended",
                "value" => $RECOMMENDED,
                "enabled" => false
            ],
            [
                "name" => "Popularity",
                "value" => $POPULARITY,
                "enabled" => false
            ],
            [
                "name" => "Price: Low to High",
                "value" => $PRICE_ASC,
                "enabled" => false
            ],
            [
                "name" => "Price: High to Low",
                "value" => $PRICE_DESC,
                "enabled" => false
            ]

        ];

        // getting all the extra params from URL to parse applied filters
        $page_num    = Input::get("pageno");
        $limit       = Input::get("limit");
        $sort_type   = Input::get("sort_type");
        $filters     = Input::get("filters");
        $new_products_only = filter_var(Input::get('new'), FILTER_VALIDATE_BOOLEAN);
        $sale_products_only = filter_var(Input::get('sale'), FILTER_VALIDATE_BOOLEAN);
        $is_details_minimal = filter_var(Input::get('board-view'), FILTER_VALIDATE_BOOLEAN);

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
                isset($all_filters['color'])
                && strlen($all_filters['color'][0]) > 0
            ) {
                $query = $query
                    ->whereRaw('color REGEXP "' . implode("|", $all_filters['color']) . '"');
                // input in form - color1|color2|color3
            }

            // for /all API catgeory-wise filter
            if (
                isset($all_filters['category'])
                && strlen($all_filters['category'][0])
            ) {
                $query = $query
                    ->whereRaw('LS_ID REGEXP "' . implode("|", $all_filters['category']) . '"');
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
            } else {
                $query = $query->orderBy(DB::raw("`rec_order` + `manual_adj`"), 'desc');
            }
        }
        // set default sorting to popularity
         else {
            if ($sale_products_only == false)
                $query = $query->orderBy(DB::raw("`rec_order` + `manual_adj`"), 'desc');
        } 

        if ($is_details_minimal) {
            $query = $query->whereRaw('LENGTH(image_xbg) > 0');
        }

        // for new products only
        if ($new_products_only == true) {
            $date_four_weeks_ago = date('Y-m-d', strtotime('-28 days'));
            $query = $query->whereRaw("created_date >= '" . $date_four_weeks_ago . "'");
        }

        // for getting products on sale 
        if ($sale_products_only == true) {
            $query = $query->whereRaw('price >  0')
                        ->whereRaw('was_price > 0')
                        ->orderBy(DB::raw("`price` / `was_price`"), 'asc');
        }

        // 6. limit
        $all_filters['limit'] = $limit;
        $all_filters['count_all'] = $query->count();
        $query = $query->offset($start)->limit($limit);

        //echo "<pre>" . print_r($all_filters, ""true);
        $query = $query->join("master_brands", "master_data.site_name", "=", "master_brands.value");
        return Product::getProductObj($query->get(), $all_filters, $dept, $cat, $subCat, true, $is_details_minimal);
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

    // this is only for /all API
    public static function get_all_dept_category_filter($brand_name = null, $in_filter_categories)
    {

        $LS_IDs = DB::table("master_data")
            ->select("LS_ID");
        
        if ($brand_name !== null) $LS_IDs = $LS_IDs->where("site_name", $brand_name);
        
        $LS_IDs = $LS_IDs->distinct("LS_ID")
            ->get();

        // get product categories filters
        $departments = Department::get_all_departments(false);
        $categories = [];
        foreach ($departments['all_departments'] as $department) {

            if (isset($department['categories']) && sizeof($department['categories']) > 0) {
                foreach ($department['categories'] as $cat) {
                    $categories[$cat['LS_ID']] = [
                        'name' => $cat['filter_label'],
                        'value' => $cat['LS_ID'],
                        //'' => $cat['LS_ID'],
                        'checked' => false,
                        'enabled' => false
                    ];
                }
            }
        }

        $filter_categories = [];
        foreach ($LS_IDs as $LS_ID) {
            $IDs = explode(",", $LS_ID->LS_ID);
            foreach ($IDs as $ID) {
                if (isset($categories[$ID])) {
                    if (in_array($categories[$ID]['value'], $in_filter_categories)) {
                        $categories[$ID]['checked'] = true;
                    }
                    $categories[$ID]['enabled'] = true;
                    array_push($filter_categories, $categories[$ID]);
                    unset($categories[$ID]);
                }
            }
        }

        foreach ($categories as $cat)
            array_push($filter_categories, $cat);

        return $filter_categories;
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
            ->whereRaw('LS_ID REGEXP "' . implode("|", $LS_IDs) . '"');

        if (isset($all_filters['color']) && strlen($all_filters['color'][0]) > 0) {

            $colors = implode("|", $all_filters['color']);
            $product_brands = $product_brands->whereRaw('color REGEXP "' . $colors . '"');
        }
        $product_brands = $product_brands->groupBy('site_name')->get();

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

    public static function get_color_filter($dept, $cat, $subCat, $all_filters, $request_colors)
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

        $req_colors = $request_colors;

        $LS_IDs = Product::get_dept_cat_LS_ID_arr($dept, $cat);


        if (isset($all_filters['type']) && strlen($all_filters['type'][0]) > 0) {
            // comment this line if you want to show count for all those
            // sub_categories that are paased in the request.
            //$LS_IDs = Product::get_sub_cat_LS_IDs($dept, $cat, $all_filters['type']);

            // if uncommenting the above line, comment this one
            $LS_IDs = Product::get_sub_cat_LS_IDs($dept, $cat, $all_filters['type']);

            //            $LS_IDs = Product::get_dept_cat_LS_ID_arr($dept, $cat->product_sub_category_);
        }

        $products = DB::table("master_data")
            ->select(['LS_ID', 'color'])
            ->whereRaw('LS_ID REGEXP "' . implode("|", $LS_IDs) . '"');

        if (isset($all_filters['brand']) && strlen($all_filters['brand'][0]) > 0) {
            $products = $products->whereIn('site_name', $all_filters['brand']);
        }


        /* if (isset($all_filters['color']) && strlen($all_filters['color'][0]) > 0) {
            $colors_from_request = implode("|", $all_filters['color']);
            $products = $products->whereRaw('color REGEXP "' . $colors_from_request . '"');
        }  */

        $products =  $products->get();

        foreach ($colors as $key => $color_hex) {
            $colors[$key] = [
                'name' => ucfirst($key),
                'value' => strtolower($key),
                'hex' => $color_hex,
                'enabled' => false,
                'checked' => isset($req_colors) && in_array($key, $req_colors)
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
            ->select(["cat_name_short", "cat_name_url", "LS_ID", "cat_sub_url", "cat_sub_name"])
            ->where("dept_name_url", $dept);

        if ($cat != null)
            $sub_cat_LS_IDs = $sub_cat_LS_IDs->where("cat_name_url", $cat);

        return $sub_cat_LS_IDs->whereRaw("LENGTH(cat_sub_name) != 0")->get();
    }

    // for product type filter ONLY!
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


        if (isset($all_filters['color']) && strlen($all_filters['color'][0]) > 0) {
            $colors = implode("|", $all_filters['color']);
            $products = $products->whereRaw('color REGEXP "' . $colors . '"');
        }

        return $products->get();
    }

    public static function get_product_type_filter($dept, $category, $subCat, $all_filters)
    {

        $products = Product::get_filter_products_meta($dept, $category, $subCat, $all_filters);

        $sub_cat_arr = [];

        $sub_cat_LS_IDs = Product::get_sub_cat_data($dept, $category);

        foreach ($sub_cat_LS_IDs as $cat) {
            $selected = false;
            if (strtolower($cat->cat_sub_url) == strtolower($subCat)) $selected = true;
            $sub_cat_arr[$cat->cat_sub_url] = [
                "name" => $cat->cat_sub_name,
                "value" => strtolower($cat->cat_sub_url),
                "enabled" => false,
                "checked" => $selected,
                "count" => 0
            ];
        }

        //echo "<pre>" . print_r($all_filters, true);
        foreach ($sub_cat_LS_IDs as $cat) {
            foreach ($products as $p) {
                if (strpos($p->LS_ID, (string) $cat->LS_ID) !== false) {
                    if (isset($sub_cat_arr[$cat->cat_sub_url])) {
                        $sub_cat_arr[$cat->cat_sub_url]["enabled"] = true;
                        $sub_cat_arr[$cat->cat_sub_url]["count"]++;

                        if (isset($all_filters['type'])) {
                            $sub_category = strtolower($cat->cat_sub_url);
                            if (in_array($sub_category, $all_filters['type'])) {
                                $sub_cat_arr[$cat->cat_sub_url]["checked"] = true;
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
        $color_filter = isset($all_filters['color']) && strlen($all_filters['color'][0]) > 0 ? $all_filters['color'] : null;
        return [
            'colorFilter' => Product::get_color_filter($dept, $category, $subCat, $all_filters, $color_filter),
            'productTypeFilter' => $arr
        ];
    }

    public static function getProductObj($products, $all_filters, $dept, $cat, $subCat, $isListingAPICall = null, $is_details_minimal = false)
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
        $products_to_ignore = DB::table("products_ignore")->select("sku")->get()->toArray();
        $products_to_ignore = array_column($products_to_ignore, "sku");

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
        $is_authenticated = Auth::check();
        if ($is_authenticated) {
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

            if (!in_array($product->product_sku, $products_to_ignore)) {
                $isMarked = false;
                if ($is_authenticated) {
                    if (in_array($product->product_sku, $wishlist_products)) {
                        $isMarked = true;
                    }
                }



                $variations = Product::get_variations($product, $westelm_variations_data, $isListingAPICall);
                array_push($p_send, Product::get_details($product, $variations, $isListingAPICall, $isMarked, false, $is_details_minimal));
            }
        }

        $brand_holder = Product::get_brands_filter($dept, $cat, $all_filters);
        $price_holder = Product::get_price_filter($dept, $cat, $all_filters);
        $product_type_holder = Product::get_product_type_filter($dept, $cat, $subCat, $all_filters)['productTypeFilter'];
        $color_filter = Product::get_product_type_filter($dept, $cat, $subCat, $all_filters)['colorFilter'];

        if ($dept == "all") {
            if (!isset($all_filters['category']))
                $all_filters['category'] = [];
            
            $brand_filter = isset($all_filters['brand'][0]) ? $all_filters['brand'][0] : null;
            $category_holder = Product::get_all_dept_category_filter($brand_filter, $all_filters['category']);
        }

        $filter_data = [
            "brand"  => $brand_holder,
            "price"        => $price_holder,
            "type" => $product_type_holder,
            "color" => $color_filter,
            "category" => $dept == "all" ? $category_holder : null
        ];

        //$dept, $cat, $subCat
        $dept_info = DB::table("mapping_core");

        if ($dept != null)
            $dept_info = $dept_info->where("dept_name_url", $dept);

        if ($cat != null)
            $dept_info = $dept_info->where("cat_name_url", $cat);
        else
            $dept_info = $dept_info->whereRaw("LENGTH(cat_name_url) = 0");

        $dept_info = $dept_info->whereRaw("LENGTH(dept_name_long) > 0")
            ->whereRaw("LENGTH(cat_image) > 0")
            ->select(['dept_name_long', 'cat_name_long', 'cat_name_short', 'cat_image', 'filter_label'])
            ->limit(1)
            ->get();

        if (isset($dept_info[0])) {
            $d = $dept_info[0];
            $seo_data = [
                "page_title" => $d->cat_name_long,
                "full_title" => $d->dept_name_long . " "  . $d->cat_name_short,
                "email_title" => $d->filter_label,
                "description" => "Search hundreds of " . $d->cat_name_long  . " from top brands at once. Add to your room designs with your own design boards.",
                "image_url" => Product::$base_siteurl . $d->cat_image

            ];
        } else {
            $seo_data = null;
        }

        return [
            "seo_data" => $seo_data,
            "total"      => $all_filters['count_all'],
            "constructor_count" => Product::$count,
            "sortType"  => isset($all_filters['sort_type']) ? $all_filters['sort_type'] : null,
            "limit"      => isset($all_filters['limit']) ? $all_filters['limit'] : null,
            "filterData" => $filter_data,
            "products"   => $p_send,
        ];
    }

    public static function get_details($product, $variations, $isListingAPICall = null, $isMarked = false, $isTrending = false, $is_details_minimal = false)
    {
        // checking if the variations data has variations buttons (extras) data as well

        $extras = null;
        $hashmap = null;
        if (isset($variations['hashmap'])) {
            $hashmap = $variations['hashmap'];
        }

        if (isset($variations['variations'])) {
            $extras = $variations['extras'];
            $variations = $variations['variations'];
        }


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

        $is_new = false;
        if (strlen($product->created_date) > 0) {
            $diff = strtotime(date("Y-m-d H:i:s")) - strtotime($product->created_date);
            $days = $diff / 60 / 60 / 24;
            if ($days < 4 * 7) $is_new = true;

            /* $jan192020 = strtotime('2020/01/19'); // 4
            $product_date = strtotime($product->created_date); // 5

            if ($jan192020 > $product_date) $is_new = false;
            else $is_new = true; */
        }

        $main_image = $is_details_minimal ?  $product->image_xbg : $product->main_product_images;
        $data =  [
            'id'               => $product->id,
            'sku'              => $product->product_sku,
            'is_new'           => $is_new,
            //    'sku_hash'         => $product->sku_hash,
            'site'             => $product->name,
            'name'             => $product->product_name,
            'product_url'      => urldecode($product->product_url),
            'product_detail_url' => Product::$base_siteurl . "/product/" . $product->product_sku,
            'is_price'         => $product->price,
            'was_price'        => str_replace("$", "", $product->was_price),
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
            'main_image'       => Product::$base_siteurl . $main_image,
            'reviews'          => $product->reviews,
            'rating'           => (float) $product->rating,
            'wishlisted'       => $isMarked
            //    'LS_ID'            => $product->LS_ID,


        ];

        /* if ($product->site_name == "westelm" && !$isListingAPICall ) {
            $data['filters'] = end($variations)['filters'];
            array_pop($variations);
        } */

        if (isset($variations) && !$is_details_minimal) {

            for ($i = 0; $i < sizeof($variations); $i++) {
                if (isset($variations[$i]['image'])) {
                    if ($variations[$i]['image'] === Product::$base_siteurl) {
                        $variations[$i]['image'] = $data['main_image'];
                    }
                }
            }

            $data['variations'] = $variations;
        }


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
            $data['selections'] = $extras;
            $data['hashmap'] = $hashmap;

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

    public static function get_c_variations($sku, $variation_table)
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
        $variation_choices = [];
        $variations = DB::table($variation_table)
            ->select($cols)
            ->distinct('variation_sku')
            ->where('product_sku', $sku)
            ->get();

        // only check for product_sku and variation_sku if size of variations is > 1 (ref issue #160 -> API -> last point)

        foreach ($variations as $variation) {
            $link =  "/product/";

            if ($variation->has_parent_sku) {
                $link .= $variation->variation_sku;
            } else {
                $link .= $variation->product_sku;
            }

            if ($variation->has_parent_sku == 1 && !isset($variation->variation_image)) {

                // cb2_products
                $v_image = DB::table("master_data")
                    ->where("product_sku", $variation->variation_sku)
                    ->select(['main_product_images'])->get();

                if (isset($v_image[0])) {
                    $v_image = $v_image[0]->main_product_images;
                } else {
                    $v_image = $variation->variation_image;
                }
            } else {
                $v_image = $variation->variation_image;
            }

            // if last char of swatch image in DB is '/' then there is no 
            // valid image for the SKU. It is the prefix of image path.
            // pass NULL ot API in such cases.
            $swatch_image = null;
            $swatch_length = strlen($variation->swatch_image);
            if (isset($variation->swatch_image)) {
                if ($variation->swatch_image[$swatch_length - 1] == "/") {
                    $swatch_image = null;
                } else {
                    $swatch_image = Product::$base_siteurl . $variation->swatch_image;
                }
            }
            $v = [
                "product_sku" => $variation->product_sku,
                "variation_sku" => $variation->variation_sku,
                "name" => $variation->variation_name,
                "has_parent_sku" => $variation->has_parent_sku == 1 ? true : false,
                "swatch_image" => $swatch_image,
                "image" => isset($v_image) ? Product::$base_siteurl . $v_image : null,
                "link" => $link,
                "is_button" => !isset($swatch_image),
                "label" => !isset($swatch_image) ? $variation->variation_name : null
            ];

            if (sizeof($variations) == 1) {
                if ($variation->product_sku != $variation->variation_sku) {
                    array_push($product_variations, $v);
                }
            } else {
                array_push($product_variations, $v);
            }

            if ($swatch_image == null) {
                array_push($variation_choices, [
                    'label' => $variation->variation_name,
                    'link' => $link,
                    'var_sku' => $variation->variation_sku
                ]);
            }
        }

        $variation_extras = [];
        if (sizeof($variation_choices) > 4) {
            $variation_extras = [
                'type' => 'redirect',
                'options' => $variation_choices
            ];
        } else {
            $variation_extras = [
                'type' => 'redirect',
                'options' => $variation_choices
            ];
        }

        return [
            'variations' => $product_variations,
            'extras' => $variation_extras
        ];
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
                    "has_parent_sku" => true,
                    "image" => Product::$base_siteurl . $variation->main_product_images,
                    "link" =>  "/product/" . $variation->product_sku,
                    "swatch_image" => Product::$base_siteurl . $variation->main_product_images
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
            "price",
            "was_price"
        ];

        $variations_extra = [];
        if (isset($wl_v[$product->product_sku])) {
            if ($wl_v[$product->product_sku]) {
                $var = DB::table("westelm_products_skus")
                    ->select($cols);

                $var = $var->groupBy("swatch_image_path");

                $var = $var->where("product_id", $product->product_sku);

                if ($isListingAPICall) $var = $var->limit(7);
                //->limit(20)
                $var = $var->get();

                $variations = [];
                $variation_filters = [];
                $swatches = [];
                $extras_key = [];

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

                            // set keys for variations data 
                            if (isset($extras_key[$filter_key])) {
                                if (is_array($extras_key[$filter_key])) {
                                    if (!in_array($str_exp[1], $extras_key[$filter_key])) {
                                        array_push($extras_key[$filter_key], $str_exp[1]);
                                    }
                                }
                            } else {
                                $extras_key[$filter_key] = [];
                                array_push($extras_key[$filter_key], $str_exp[1]);
                            }

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

                    $name = "";
                    if (isset($features['color'])) {
                        $name = $features['color'];

                        if (isset($features['fabric'])) {
                            $name .= ", " . $features['fabric'];
                        }
                    }

                    $is_dropdown = false;
                    $extras = [];
                    foreach ($extras_key as $key => $arr) {
                        if (sizeof($arr) > 4) {
                            $is_dropdown = true;
                        }

                        $extras[$key] = [];
                    }

                    foreach ($extras_key as $key => $arr) {
                        foreach ($arr as $k) {
                            array_push($extras[$key], [
                                'label' => $k
                            ]);
                        }
                    }



                    $variation_extras = [
                        'type' => $is_dropdown ? 'multi_choice' : 'single_choice',
                        'options' => $extras
                    ];

                    array_push($variations, [
                        "product_sku" => $product->product_sku,
                        "variation_sku" => $prod->sku,
                        "name" => $name,
                        "features" => $features,
                        "has_parent_sku" => false,
                        "image" => Product::$base_siteurl . $prod->image_path,
                        "link" =>  "/product/" . $product->product_sku,
                        "swatch_image" => strlen($prod->swatch_image) != 0 ? Product::$base_siteurl . $prod->swatch_image_path : null,
                        "price" => $prod->price,
                        "was_price" => $prod->was_price
                    ]);
                }


                /* if (!$isListingAPICall) {
                    array_push($variations, [
                        "filters" => Product::get_all_variation_filters($product->product_sku)
                    ]);
                } */

                $hashmap = [];
                foreach ($variations as $variation) {
                    $features = $variation['features'];
                    ksort($features);

                    $str = '';
                    foreach ($features as $f => $val) {
                        $str .= $val;
                    }

                    $hashmap[md5($str)] = [
                        'price' => $variation['price'],
                        'was_price' => $variation['was_price'],
                        'image' => $variation['image'],
                        'var_sku' => $variation['variation_sku']

                    ];
                }

                return [
                    'variations' => $variations,
                    'extras' => $variation_extras,
                    'hashmap' => $hashmap
                ];
            }
        }

        return [];
    }

    public static function get_variations($product, $wl_v = null, $isListingAPICall = null)
    {

        switch ($product->site_name) {
            case 'cb2':
                return Product::get_c_variations($product->product_sku, 'cb2_products_variations');
                break;
            case 'cab':
                return Product::get_c_variations($product->product_sku, 'crateandbarrel_products_variations');
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
    public static function get_product_LS_ID($sku)
    {

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

        $variations_data = Product::get_variations($prod[0], $westelm_variations_data, false);

        return Product::get_details($prod[0], $variations_data);
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
