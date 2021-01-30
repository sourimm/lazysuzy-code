<?php

namespace App\Models;

use App\Models\Collections;
use App\Http\Controllers\ProductController;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\DB;
use App\Models\Department;
use App\Models\Dimension;
use App\Models\Cart;

use Auth;

class Product extends Model
{
    protected $table = "master_data";

    //Guard Id from mass assignment
    protected $guarded = ['id'];

    // Timestamp Column names in DB
    const CREATED_AT = 'created_date';
    const UPDATED_AT = 'updated_date';

    /* protected $casts = [
        'product_dimension' => 'array',
    ]; */
    public static $base_siteurl = 'https://www.lazysuzy.com';
    static $count = 0;
    private static $color_map = null;
    private static $cart_table = 'lz_user_cart';

    public static function trending_products($limit)
    {

        $trending_products = [];
        $rows = DB::table("trending_products")
            ->select("*")
            ->join("master_data", "master_data.product_sku", "=", "trending_products.product_sku")
            ->join("master_brands", "master_data.brand", "=", "master_brands.value")
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
            ->select('LS_ID');
        if ($dept != 'all')
            $ls_id = $ls_id->where('dept_name_url', $dept);
        if ($cat != null)
            $ls_id = $ls_id->where('cat_name_url', $cat);

        $ls_id = $ls_id->where('cat_sub_url', $sub_category)->get();

        /* echo json_encode(Utility::get_sql_raw($ls_id));
        die();  */

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

    public static function get_filter_products($dept, $cat = null, $subCat = null, $isAdmiAPICall = false)
    {
        $perPage = 24;
        $LS_IDs = null;
        $PRICE_ASC = "price_low_to_high";
        $PRICE_DESC = "price_high_to_low";
        $POPULARITY = "popularity";
        $RECOMMENDED = "recommended";

        $sort_type_filter = [
            [
                "name" => "Top Picks",
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
        $new_products_only  = filter_var(Input::get('new'), FILTER_VALIDATE_BOOLEAN);
        $sale_products_only = filter_var(Input::get('sale'), FILTER_VALIDATE_BOOLEAN);
        $is_details_minimal = filter_var(Input::get('board-view'), FILTER_VALIDATE_BOOLEAN);
        $is_best_seller     = filter_var(Input::get('bestseller'), FILTER_VALIDATE_BOOLEAN);
        $is_admin_call = filter_var(Input::get('admin'), FILTER_VALIDATE_BOOLEAN);



        $all_filters = [];
        $query       = DB::table('master_data')->where('product_status', 'active');

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

                    // change filter keys for some filters 
                    $block_str[0] = ($block_str[0] == "country") ? "mfg_country" : $block_str[0];

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
                $query = $query->whereRaw('brand REGEXP "' . implode("|", $all_filters['brand']) . '"');
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

            if (
                isset($all_filters['seating'])
                && isset($all_filters['seating'][0])
            ) {
                $query = $query
                    ->whereRaw('seating REGEXP "' . implode("|", $all_filters['seating']) . '"');
            }

            if (
                isset($all_filters['shape'])
                && isset($all_filters['shape'][0])
            ) {
                $query = $query
                    ->whereRaw('shape REGEXP "' . implode("|", $all_filters['shape']) . '"');
            }
        }


        // only include sub category products if subcategory is not null
        if ($subCat != null) {
            $LS_IDs = [Product::get_sub_cat_LS_ID($dept, $cat, $subCat)];
        }

        // for /all API catgeory-wise filter
        if (
            isset($all_filters['category'])
            && strlen($all_filters['category'][0])
        ) {
            // we want to show all the products of this category
            // so we'll have to get the sub-categories included in this
            // catgeory
            $LS_IDs = SubCategory::get_sub_cat_LSIDs($all_filters['category']);
        }

        // 4. type
        // NOTE: This filter will always come after category filter
        if (isset($all_filters['type']) && strlen($all_filters['type'][0]) > 0) {
            // will only return products that match the LS_IDs for the `types` mentioned.
            $LS_IDs = Product::get_sub_cat_LS_IDs($dept, $cat, $all_filters['type']);
        } else if (!isset($all_filters['category'])) {
            // 5. departments and categories
            if (null != $cat) {
                $LS_IDs = Product::get_LS_IDs($dept, $cat);
            } else {
                $LS_IDs = Product::get_LS_IDs($dept);
            }
        }

        // override LS_ID array is there is a  `bestseller` filter applied
        if ($is_best_seller) {
            $LS_IDs = ['99'];
        }

        $query = $query->whereRaw('LS_ID REGEXP "' . implode("|", $LS_IDs) . '"');
        $query = DimensionsFilter::apply($query, $all_filters);
        $query = CollectionFilter::apply($query, $all_filters);
        $query = MaterialFilter::apply($query, $all_filters);
        $query = FabricFilter::apply($query, $all_filters);
        $query = DesignerFilter::apply($query, $all_filters);
        $query = MFDCountry::apply($query, $all_filters);



        // 7. sort_type
        if (isset($sort_type) || (isset($all_filters['collection'])
            && sizeof($all_filters['collection']) > 0)) {

            if ($sort_type == $PRICE_ASC) {
                $query = $query->orderBy('min_price', 'asc');
            } else if ($sort_type == $PRICE_DESC) {
                $query = $query->orderBy('min_price', 'desc');
            } else if ($sort_type == $POPULARITY) {
                $query = $query->orderBy('popularity', 'desc');
            } else if ($sort_type == $RECOMMENDED) {
                $query = $query->orderBy('serial', 'asc');
            } else {
                $query = $query->orderBy('serial', 'asc');
            }
        }
        // set default sorting to popularity
        else {
            if ($sale_products_only == false && !$new_products_only)
                $query = $query->orderBy('serial', 'asc');
        }

        if ($is_details_minimal) {
            if (!$is_admin_call) {
                $all_filters['is_admin_call'] = false;
                $query = $query->whereRaw('image_xbg_processed = 1');
            } else {
                // for admin api calls xbg_image filter must not be applied
                $all_filters['is_admin_call'] = true;
            }
            $all_filters['is_board_view'] = true;
        } else {
            $all_filters['is_board_view'] = false;
        }

        // for new products only
        if ($new_products_only == true) {
            $date_four_weeks_ago = date('Y-m-d', strtotime('-60 days'));
            $query = $query->whereRaw("created_date >= '" . $date_four_weeks_ago . "'");
            $query = $query->orderBy('new_group', 'asc');
        }

        // for getting products on sale
        if ($sale_products_only == true) {
            $query = $query->whereRaw('price >  0')
                ->whereRaw('was_price > 0')
                ->whereRaw('convert(was_price, unsigned) > convert(price, unsigned)')
                ->orderBy(DB::raw("`price` / `was_price`"), 'asc');
        }

        // 6. limit
        $all_filters['limit'] = $limit;
        $all_filters['count_all'] = $query->count();
        $query = $query->offset($start)->limit($limit);
        /* echo $query->toSql();
        print_r($query->getBindings());
        die(); */

        //echo "<pre>" . print_r($all_filters, ""true);
        $query = $query->join("master_brands", "master_data.brand", "=", "master_brands.value");
        $is_listing_API_call = true;


        if ($isAdmiAPICall == true) $is_listing_API_call = false;

        $a = Product::get_product_obj($query->get(), $all_filters, $dept, $cat, $subCat, $is_listing_API_call, $is_details_minimal, $is_admin_call);

        // add debug params to test quickly
        $a['a'] = Utility::get_sql_raw($query);
        return $a;
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
    public static function get_all_dept_category_filter($brand_name = null, $all_filters)
    {
        $in_filter_categories = $all_filters['category'];
        $LS_IDs = DB::table("master_data")
            ->select("LS_ID");

        if ($brand_name !== null) $LS_IDs = $LS_IDs->where("brand", $brand_name);

        // all all new filters here
        $LS_IDs = Filters::apply(null, null, $all_filters, $LS_IDs, Config::get('meta.FILTER_ESCAPE_CATEGORY'));

        $LS_IDs = $LS_IDs->distinct("LS_ID")
            ->get();

        // for collections filter, only show those catgeories that are available for 
        // the given collection values 
        // this will be empty if collections filter is not applied
        $collection_catgeory_LS_IDs = Collections::get_LSIDs($all_filters);

        /* // get product categories filters

         * @param bool $dept_name_url_api
         * @param bool $is_home_call
         * @param bool $is_board_view

        $departments = Department::get_all_departments(false, false, true);
        $categories = [];
        foreach ($departments['all_departments'] as $department) {

            if (isset($department['categories'])
                && sizeof($department['categories']) > 0) {

                foreach ($department['categories'] as $cat) {
                    $categories[$cat['LS_ID']] = [
                        'name' => $cat['filter_label'],
                        'value' => $cat['LS_ID'],
                        'checked' => false,
                        'enabled' => false
                    ];
                }
            }
        }
        */

        // if 'is_boad_view' is set to true this function will also check for sub-categories
        // otherwise will only get categories
        $categories = Category::get_board_categories($all_filters['is_board_view']);

        $filter_categories = [];
        foreach ($LS_IDs as $LS_ID) {
            $IDs = explode(",", $LS_ID->LS_ID);
            foreach ($IDs as $ID) {
                if ((empty($collection_catgeory_LS_IDs) && isset($categories[$ID]))
                    || (!empty($collection_catgeory_LS_IDs)
                        && in_array($ID, $collection_catgeory_LS_IDs)
                        && isset($categories[$ID]))
                ) {
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

        // sort based on LS_ID
        usort($filter_categories, function ($cat1, $cat2) {
            if ($cat1['value'] == $cat2['value']) return 0;

            return $cat1['value'] < $cat2['value'] ? -1 : 1;
        });

        return $filter_categories;
    }

    public static function get_seating_filter($dept, $cat, $all_filters)
    {

        $all_seating = [];
        $rows = DB::table("filter_map_seating")->get();
        $LS_IDs = Product::get_dept_cat_LS_ID_arr($dept, $cat);
        $products = DB::table("master_data")
            ->selectRaw("count(product_name) AS products, seating");
        if (sizeof($all_filters) != 0) {

            // for /all API catgeory-wise filter
            if (
                isset($all_filters['category'])
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

            $products = $products->whereRaw('LS_ID REGEXP "' . implode("|", $LS_IDs) . '"');
            $products = DimensionsFilter::apply($products, $all_filters);
            $products = CollectionFilter::apply($products, $all_filters);
            $products = MaterialFilter::apply($products, $all_filters);
            $products = FabricFilter::apply($products, $all_filters);
            $products = DesignerFilter::apply($products, $all_filters);
            $products = MFDCountry::apply($products, $all_filters);


            if (
                isset($all_filters['color'])
                && strlen($all_filters['color'][0]) > 0
            ) {
                $products = $products
                    ->whereRaw('color REGEXP "' . implode("|", $all_filters['color']) . '"');
                // input in form - color1|color2|color3
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

        $products = $products->groupBy('seating')->get();
        foreach ($rows as $row) {
            $all_seating[$row->seating] = [
                'name' => $row->seating,
                'value' => $row->seating,
                'count' => 0,
                'enabled' => false,
                'checked' => false
            ];
        }

        foreach ($products as $b) {
            if (isset($all_seating[$b->seating])) {
                $all_seating[$b->seating]["enabled"] = true;
                if (isset($all_filters['seating'])) {
                    if (in_array($b->seating, $all_filters['seating'])) {
                        $all_seating[$b->seating]["checked"] = true;
                    }
                }

                $all_seating[$b->seating]["count"] = $b->products;
            }
        }

        $seating_holder = [];

        foreach ($all_seating as $name => $value) {
            array_push($seating_holder, $value);
        }

        return $seating_holder;
    }

    public static function get_shape_filter($dept, $cat, $all_filters)
    {

        $all_shapes = [];
        $rows = DB::table("master_data")->whereRaw('shape IS NOT NULL')->whereRaw("LENGTH(shape) > 0")->distinct()->get(['shape']);
        $LS_IDs = Product::get_dept_cat_LS_ID_arr($dept, $cat);
        $products = DB::table("master_data")
            ->selectRaw("count(product_name) AS products, shape");


        if (sizeof($all_filters) != 0) {
            if (isset($all_filters['type']) && strlen($all_filters['type'][0]) > 0) {
                $LS_IDs = Product::get_sub_cat_LS_IDs($dept, $cat, $all_filters['type']);
            }


            // for /all API catgeory-wise filter
            if (
                isset($all_filters['category'])
                && strlen($all_filters['category'][0])
            ) {
                // we want to show all the products of this category
                // so we'll have to get the sub-categories included in this
                // catgeory
                $LS_IDs = SubCategory::get_sub_cat_LSIDs($all_filters['category']);
            }

            $products = $products->whereRaw('LS_ID REGEXP "' . implode("|", $LS_IDs) . '"');
            $products = DimensionsFilter::apply($products, $all_filters);
            $products = CollectionFilter::apply($products, $all_filters);
            $products = MaterialFilter::apply($products, $all_filters);
            $products = FabricFilter::apply($products, $all_filters);
            $products = DesignerFilter::apply($products, $all_filters);
            $products = MFDCountry::apply($products, $all_filters);


            if (
                isset($all_filters['seating'])
                && isset($all_filters['seating'][0])
            ) {
                $products = $products
                    ->whereRaw('seating REGEXP "' . implode("|", $all_filters['seating']) . '"');
            }

            if (
                isset($all_filters['brand'])
                && strlen($all_filters['brand'][0]) > 0
            ) {
                $products = $products->whereIn('brand', $all_filters['brand']);
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
                isset($all_filters['color'])
                && strlen($all_filters['color'][0]) > 0
            ) {
                $products = $products
                    ->whereRaw('color REGEXP "' . implode("|", $all_filters['color']) . '"');
                // input in form - color1|color2|color3
            }
        }
        $products = $products->groupBy('shape')->get();

        foreach ($rows as $row) {
            $all_shapes[$row->shape] = [
                'name' => $row->shape,
                'value' => strtolower($row->shape),
                'count' => 0,
                'enabled' => false,
                'checked' => false
            ];
        }

        foreach ($products as $b) {
            if (isset($all_shapes[$b->shape])) {
                $all_shapes[$b->shape]["enabled"] = true;
                if (isset($all_filters['shape'])) {
                    if (in_array(strtolower($b->shape), $all_filters['shape'])) {
                        $all_shapes[$b->shape]["checked"] = true;
                    }
                }

                $all_shapes[$b->shape]["count"] = $b->products;
            }
        }

        $shapes_holder = [];

        foreach ($all_shapes as $name => $value) {
            array_push($shapes_holder, $value);
        }

        return $shapes_holder;
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

        $product_brands = DB::table("master_data")
            ->selectRaw("count(product_name) AS products, brand")
            ->where("product_status", "active");


        if (sizeof($all_filters) != 0) {

            if (isset($all_filters['is_board_view']) && $all_filters['is_board_view']) {

                if (!isset($all_filters['is_admin_call']) || !$all_filters['is_admin_call'])
                    $product_brands = $product_brands->whereRaw('image_xbg_processed = 1');
            }

            // for /all API catgeory-wise filter
            if (
                isset($all_filters['category'])
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

            $product_brands = $product_brands
                ->whereRaw('LS_ID REGEXP "' . implode("|", $LS_IDs) . '"');

            $product_brands = DimensionsFilter::apply($product_brands, $all_filters);
            $product_brands = CollectionFilter::apply($product_brands, $all_filters);
            $product_brands = MaterialFilter::apply($product_brands, $all_filters);
            $product_brands = FabricFilter::apply($product_brands, $all_filters);
            $product_brands = DesignerFilter::apply($product_brands, $all_filters);
            $product_brands = MFDCountry::apply($product_brands, $all_filters);

            if (
                isset($all_filters['seating'])
                && isset($all_filters['seating'][0])
            ) {
                $product_brands = $product_brands
                    ->whereRaw('seating REGEXP "' . implode("|", $all_filters['seating']) . '"');
            }

            if (
                isset($all_filters['shape'])
                && isset($all_filters['shape'][0])
            ) {
                $product_brands = $product_brands
                    ->whereRaw('shape REGEXP "' . implode("|", $all_filters['shape']) . '"');
            }

            if (isset($all_filters['color']) && strlen($all_filters['color'][0]) > 0) {

                $colors = implode("|", $all_filters['color']);
                $product_brands = $product_brands->whereRaw('color REGEXP "' . $colors . '"');
            }
            // 2. price_from
            if (isset($all_filters['price_from'])) {
                $product_brands = $product_brands
                    ->whereRaw('min_price >= ' . $all_filters['price_from'][0] . '');
            }

            // 3. price_to
            if (isset($all_filters['price_to'])) {
                $product_brands = $product_brands
                    ->whereRaw('max_price <= ' . $all_filters['price_to'][0] . '');
            }
        }

        $product_brands = $product_brands->groupBy('brand')->get();
        foreach ($product_brands as $b) {
            if (isset($all_brands[$b->brand])) {
                $all_brands[$b->brand]["enabled"] = true;
                if (isset($all_filters['brand'])) {
                    if (in_array($b->brand, $all_filters['brand'])) {
                        $all_brands[$b->brand]["checked"] = true;
                    }
                }
                $all_brands[$b->brand]["count"] = $b->products;
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

        $price = DB::table('master_data');
        $LS_IDs = Product::get_dept_cat_LS_ID_arr($dept, $cat);

        if (isset($all_filters['type']) && strlen($all_filters['type'][0]) > 0) {
            $LS_IDs = Product::get_sub_cat_LS_IDs($dept, $cat, $all_filters['type']);
        }
        // for /all API catgeory-wise filter
        if (
            isset($all_filters['category'])
            && strlen($all_filters['category'][0])
        ) {
            // we want to show all the products of this category
            // so we'll have to get the sub-categories included in this
            // catgeory
            $LS_IDs = SubCategory::get_sub_cat_LSIDs($all_filters['category']);
        }

        $price = $price->whereRaw('LS_ID REGEXP "' . implode("|", $LS_IDs) . '"');
        $price = DimensionsFilter::apply($price, $all_filters);
        $price = CollectionFilter::apply($price, $all_filters);
        $price = MaterialFilter::apply($price, $all_filters);
        $price = FabricFilter::apply($price, $all_filters);
        $price = DesignerFilter::apply($price, $all_filters);
        $price = MFDCountry::apply($price, $all_filters);

        if (
            isset($all_filters['brand'])
            && strlen($all_filters['brand'][0]) > 0
        ) {
            $price = $price->whereIn('brand', $all_filters['brand']);
        }

        if (
            isset($all_filters['seating'])
            && isset($all_filters['seating'][0])
        ) {
            $price = $price
                ->whereRaw('seating REGEXP "' . implode("|", $all_filters['seating']) . '"');
        }

        if (isset($all_filters['is_board_view']) && $all_filters['is_board_view']) {

            if (!isset($all_filters['is_admin_call']) || !$all_filters['is_admin_call'])
                $price = $price->whereRaw('image_xbg_processed = 1');
        }

        if (
            isset($all_filters['shape'])
            && isset($all_filters['shape'][0])
        ) {
            $price = $price
                ->whereRaw('shape REGEXP "' . implode("|", $all_filters['shape']) . '"');
        }

        if (isset($all_filters['color']) && strlen($all_filters['color'][0]) > 0) {

            $colors = implode("|", $all_filters['color']);
            $price = $price->whereRaw('color REGEXP "' . $colors . '"');
        }


        $min = $price->min('min_price');
        $max = $price->max('max_price');

        if (sizeof($all_filters) == 0) {
            // get min price and max price for all the products
            return [
                "min" => isset($min) ? $min : 0,
                "max" => isset($max) ? $max : 0
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
                "max" => isset($max) ? $max : 0,
                "min" => isset($min) ? $min : 0,
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
            $LS_IDs = Product::get_sub_cat_LS_IDs($dept, $cat, $all_filters['type']);
        }
        // for /all API catgeory-wise filter
        if (
            isset($all_filters['category'])
            && strlen($all_filters['category'][0])
        ) {
            // we want to show all the products of this category
            // so we'll have to get the sub-categories included in this
            // catgeory
            $LS_IDs = SubCategory::get_sub_cat_LSIDs($all_filters['category']);
        }



        $products = DB::table("master_data")
            ->select(['LS_ID', 'color'])
            ->whereRaw('LS_ID REGEXP "' . implode("|", $LS_IDs) . '"');

        $products = DimensionsFilter::apply($products, $all_filters);
        $products = CollectionFilter::apply($products, $all_filters);
        $products = MaterialFilter::apply($products, $all_filters);
        $products = FabricFilter::apply($products, $all_filters);
        $products = DesignerFilter::apply($products, $all_filters);
        $products = MFDCountry::apply($products, $all_filters);


        if (sizeof($all_filters) > 0) {
            if (isset($all_filters['is_board_view']) && $all_filters['is_board_view']) {

                if (!isset($all_filters['is_admin_call']) || !$all_filters['is_admin_call'])
                    $products = $products->whereRaw('image_xbg_processed = 1');
            }

            if (
                isset($all_filters['brand'])
                && strlen($all_filters['brand'][0]) > 0
            ) {
                $products = $products->whereIn('brand', $all_filters['brand']);
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
        }
        /* if (isset($all_filters['color']) && strlen($all_filters['color'][0]) > 0) {
            $colors_from_request = implode("|", $all_filters['color']);
            $products = $products->whereRaw('color REGEXP "' . $colors_from_request . '"');
        }  */


        $products = $products->get();

        foreach ($colors as $key => $color_hex) {
            $colors[$key] = [
                'name' => ucfirst($key),
                'value' => strtolower($key),
                'hex' => $color_hex,
                'enabled' => false,
                'checked' => isset($req_colors) && in_array($key, $req_colors),
                'count' => 0
            ];
        }

        foreach ($products as $product) {
            $product_colors = explode(",", $product->color);
            foreach ($product_colors as $p_color) {

                if (strlen($p_color) > 0 && array_key_exists(strtolower($p_color), $colors)) {
                    $colors[strtolower($p_color)]['name'] = ucfirst($p_color);
                    $colors[strtolower($p_color)]['enabled'] = true;
                    $colors[strtolower($p_color)]['count'] += 1;
                }
            }
        }


        $colors_f = [];
        foreach ($colors as $key => $color) {
            array_push($colors_f, $color);
        }

        return $colors_f;
    }

    /*
     * category value can be present in $cat variable or in
     * $all_filter['category'] if the request is made from /all
     * products API.
    */
    public static function get_sub_cat_data($dept, $cat, $all_filters)
    {

        $sub_cat_LS_IDs = DB::table("mapping_core")
            ->select(["cat_name_short", "cat_name_url", "LS_ID", "cat_sub_url", "cat_sub_name"]);

        if ($dept != NULL && $dept != "all")
            $sub_cat_LS_IDs = $sub_cat_LS_IDs->where("dept_name_url", $dept);

        if ($cat != null)
            $sub_cat_LS_IDs = $sub_cat_LS_IDs->where("cat_name_url", $cat);

        if (isset($all_filters['category']) && sizeof($all_filters['category']) > 0) {
            // the request is comming from all products API and has a category LSID
            // attached with it
            $LS_ID = $all_filters['category'];
            // ADD LOGIC HERE FOR LIMITING THE SEARCH RESULTS
            // BASED ON THE SELECTED CATGEORY IN THE /ALL PRODUCTS API
            $LS_IDs = SubCategory::get_sub_cat_LSIDs($all_filters['category']);
            $sub_cat_LS_IDs = $sub_cat_LS_IDs->whereIn('LS_ID', $LS_IDs);
        }

        return $sub_cat_LS_IDs->whereRaw("LENGTH(cat_sub_name) != 0")->get();
    }

    // for product type filter ONLY!
    public static function get_filter_products_meta($dept, $cat, $subCat, $all_filters)
    {

        $LS_IDs = Product::get_dept_cat_LS_ID_arr($dept, $cat);

        // for /all API catgeory-wise filter
        if (
            isset($all_filters['category'])
            && strlen($all_filters['category'][0])
        ) {
            // we want to show all the products of this category
            // so we'll have to get the sub-categories included in this
            // catgeory
            $LS_IDs = SubCategory::get_sub_cat_LSIDs($all_filters['category']);
        }
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
        $products = DimensionsFilter::apply($products, $all_filters);
        $products = CollectionFilter::apply($products, $all_filters);
        $products = MaterialFilter::apply($products, $all_filters);
        $products = FabricFilter::apply($products, $all_filters);
        $products = DesignerFilter::apply($products, $all_filters);
        $products = MFDCountry::apply($products, $all_filters);

        if (sizeof($all_filters) > 0) {

            if (
                isset($all_filters['brand'])
                && strlen($all_filters['brand'][0]) > 0
            ) {
                $products = $products->whereIn('brand', $all_filters['brand']);
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

            if (isset($all_filters['is_board_view']) && $all_filters['is_board_view']) {

                if (!isset($all_filters['is_admin_call']) || !$all_filters['is_admin_call'])
                    $products = $products->whereRaw('image_xbg_processed = 1');
            }
        }

        return $products->get();
    }

    public static function get_product_type_filter($dept, $category, $subCat, $all_filters)
    {

        // for all products API
        // $dept will be 'all' and the catgeories will come from
        // $all_filters data, we want to show the type filter only when some
        // catgeory is selected, so return an empty array for types if
        // no categories is selected
        $do_process = true;
        if ($dept == 'all') {
            if (!isset($all_filters['category']))
                $do_process = false;
            else if (sizeof($all_filters['category']) == 0)
                $do_process = false;
        }

        if ($do_process == true) {
            $products = Product::get_filter_products_meta($dept, $category, $subCat, $all_filters);

            $sub_cat_arr = [];

            $sub_cat_LS_IDs = Product::get_sub_cat_data($dept, $category, $all_filters);

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
        } else {
            $arr = [];
        }

        $color_filter = isset($all_filters['color']) && strlen($all_filters['color'][0]) > 0 ? $all_filters['color'] : null;
        return [
            'colorFilter' => Product::get_color_filter($dept, $category, $subCat, $all_filters, $color_filter),
            'productTypeFilter' => $arr
        ];
    }

    public static function get_product_obj($products, $all_filters, $dept, $cat, $subCat, $is_listing_API_call = null, $is_details_minimal = false)
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

        // get inventory list
        $inventory_products_db = DB::table('lz_inventory')
            ->select(["product_sku", "quantity", "message", "price", "ship_code"])
            ->where('is_active', 1)
            ->get();

        // get user cart
        $cart = Cart::cart();
        $user_cart = $cart['products'];

        /* ============== PREPROCESS FOR INVENTORY DETAILS FOR LISTING API ================*/
        $user_skus = [];
        foreach ($user_cart as  $prod) {
            $prod = (object) $prod;
            $user_skus[$prod->product_sku] = $prod;
        }

        $inventory_prod = [];
        foreach ($inventory_products_db as $prod) {
            $inventory_prod[$prod->product_sku] = $prod;
            $inventory_prod[$prod->product_sku]->is_low = $prod->quantity <= 5;
            $inventory_prod[$prod->product_sku]->is_shipping_free = ($prod->ship_code == Config::get('shipping.free_shipping'));

            // remove extra property from product object to save data transfer.
            unset($prod->ship_code);
        }

        /* ===============================================================================*/

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

            $product_LS_IDs = explode(",", $product->LS_ID);
            $skip_product = false;
            foreach ($product_LS_IDs as $LS_ID) {
                if (intval($LS_ID) >= 828 && intval($LS_ID) <= 832) {
                    $skip_product = true;
                    break;
                }
            }

            if ($skip_product)
                continue;

            if (!in_array($product->product_sku, $products_to_ignore)) {
                $isMarked = false;
                if ($is_authenticated) {
                    if (in_array($product->product_sku, $wishlist_products)) {
                        $isMarked = true;
                    }
                }

                /*=========================== INVENTORY DETAILS IN LISTING API ================================*/

                $product->in_inventory = false;
                $product->inventory_product_details = null;

                $product_sku = $product->product_sku;
                if (isset($inventory_prod[$product_sku])) {
                    $product->in_inventory = true;

                    $product_count_remaining = $inventory_prod[$product_sku]->quantity;
                    // if sku present in the cart then minus the count from inventory
                    if (isset($user_skus[$product_sku]))
                        $product_count_remaining -= $user_skus[$product_sku]->count;

                    $inventory_prod[$product_sku]->quantity = $product_count_remaining;
                    $product->inventory_product_details = (array) $inventory_prod[$product_sku];
                }

                /*==============================================================================================*/


                $variations = Product::get_variations($product, $westelm_variations_data, $is_listing_API_call);
                array_push($p_send, Product::get_details($product, $variations, $is_listing_API_call, $isMarked, false, $is_details_minimal));
            }
        }

        $brand_holder = Product::get_brands_filter($dept, $cat, $all_filters);
        $price_holder = Product::get_price_filter($dept, $cat, $all_filters);
        $product_type_holder = Product::get_product_type_filter($dept, $cat, $subCat, $all_filters)['productTypeFilter'];
        $color_filter = Product::get_product_type_filter($dept, $cat, $subCat, $all_filters)['colorFilter'];

        $seating_filter = Product::get_seating_filter($dept, $cat, $all_filters);
        $shape_filter = Product::get_shape_filter($dept, $cat, $all_filters);

        if ($dept == "all") {
            if (!isset($all_filters['category']))
                $all_filters['category'] = [];

            $brand_filter = isset($all_filters['brand'][0]) ? $all_filters['brand'][0] : null;
            $category_holder =  Product::get_all_dept_category_filter($brand_filter, $all_filters);
        }

        $dimension_filter = DimensionsFilter::get_filter($dept, $cat, $all_filters);
        $filter_data = [
            "brand"  => $brand_holder,
            "price"  => $price_holder,
            "type" => $product_type_holder,
            "color" => $color_filter,
            "category" => $dept == "all" ? $category_holder : null,
            "shape" => $shape_filter,
            "seating" => $seating_filter,
            "height" => [$dimension_filter['dim_height']],
            "width" => [$dimension_filter['dim_width']],
            "length" => [$dimension_filter['dim_length']],
            "diameter" => [$dimension_filter['dim_diameter']],
            "square" => [$dimension_filter['dim_square']],
            "depth" => [$dimension_filter['dim_depth']],
            "collection" => isset($all_filters['collection']) ? $all_filters['collection'] : null,
            "material" => MaterialFilter::get_filter_data($dept, $cat, $all_filters),
            "fabric" => FabricFilter::get_filter_data($dept, $cat, $all_filters),
            "designer" => DesignerFilter::get_filter_data($dept, $cat, $all_filters),
            "country" => MFDCountry::get_filter_data($dept, $cat, $all_filters),
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
                "email_title" => $d->filter_label,
                "dept_name_long" => $d->dept_name_long,
                "cat_name_long" => $d->cat_name_long,
                "cat_name_short" => $d->cat_name_short,
                "cat_image" => Product::$base_siteurl . $d->cat_image,
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

    public static function get_details(
        $product,
        $variations,
        $is_listing_API_call = null,
        $isMarked = false,
        $isTrending = false,
        $is_details_minimal = false
    ) {

        // NOTE: $isListingCall and $isMarked will also be true for wishlish API call

        // $is_details_minimal => send xbg image instead of main_image. Used in the Design Board section of the site.
        // checking if the variations data has variations buttons (extras) data as well

        $extras = null;
        $hashmap = null;
        $user = Auth::user();
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

        // if product in inventory then calculate the discount
        // based on inventory price value
        if (isset($product->in_inventory) && $product->in_inventory) {
            $p_val = $product->inventory_product_details['price'];
            $product->price = (string) $p_val;
        }

        if (is_numeric($p_val) && is_numeric($wp_val) && $wp_val > 0) {
            $discount = (1 - ($p_val / $wp_val)) * 100;
            $discount = number_format((float) $discount, 2, '.', '');
        }

        $is_new = false;
        if (strlen($product->created_date) > 0) {
            $diff = strtotime(date("Y-m-d H:i:s")) - strtotime($product->created_date);
            $days = $diff / 60 / 60 / 24;
            if ($days < 2 * 4 * 7) $is_new = true;


            // making product added date to fixed
            /* $jan192020 = strtotime('2020/01/19'); // 4
            $product_date = strtotime($product->created_date); // 5

            if ($jan192020 > $product_date) $is_new = false;
            else $is_new = true; */
        }

        $main_image = ($is_details_minimal) ?  $product->image_xbg : $product->main_product_images;


        // for wishlist
        $data =  [
            //'id'               => isset($product->id) ? $product->id : rand(1, 10000) * rand(1, 10000),
            'sku'              => $product->product_sku,
            'is_new'           => $is_new,
            'redirect'         => isset($product->redirect) ? $product->redirect : false,
            'in_inventory'     => isset($product->in_inventory) ? $product->in_inventory : false,
            'inventory_product_details' => isset($product->inventory_product_details) ? $product->inventory_product_details : null,
            //    'sku_hash'         => $product->sku_hash,
            'site'             => $product->name,
            'name'             => $product->product_name,
            'product_url'      => urldecode($product->product_url),
            'product_detail_url' => Product::$base_siteurl . "/product/" . $product->product_sku,
            'is_price'         => Utility::rm_comma($product->price),
            'was_price'        => Utility::rm_comma($product->was_price),
            'percent_discount' => $discount,
            //'model_code'       => $product->model_code,
            'seating'          => isset($product->seating) ? $product->seating : null,
            //    'description'      => preg_split("/\\[US\\]|<br>|\\n/", $product->product_description),
            //    'dimension'        => $product->brand == "cb2" ? Product::cb2_dimensions($product->product_dimension) : $product->product_dimension,
            //    'thumb'            => preg_split("/,|\\[US\\]/", $product->thumb),
            'color'            => $product->color,
            //    'images'           => array_map([__CLASS__, "baseUrl"], preg_split("/,|\\[US\\]/", $product->images)),
            //    'features'         => preg_split("/\\[US\\]|<br>|\\n/", $product->product_feature),
            'collection'       => $product->collection,
            //    'set'              => $product->product_set,
            'condition'        => (isset($product->product_condition) || strlen($product->product_condition) > 0) ? $product->product_condition : null,
            //    'created_date'     => $product->created_date,
            //    'updated_date'     => $product->updated_date,
            //    'on_server_images' => array_map([__CLASS__, "baseUrl"], preg_split("/,|\\[US\\]/", $product->product_images)),
            'main_image'       => Product::$base_siteurl . $main_image,
            'reviews'          => $product->reviews,
            'rating'           => (float) $product->rating,
            'wishlisted'       => $isMarked,

            // add availablilty data for all products
            'is_back_order'    => isset($product->is_back_order) ? $product->is_back_order : null,
            'back_order_msg'   => isset($product->back_order_msg) ? $product->back_order_msg : null,
            'back_order_msg_date' => isset($product->back_order_msg_date) ? $product->back_order_msg_date : null,
            'online_msg'       => isset($product->online_msg) ? $product->online_msg : "",

            'product_assembly'       => isset($product->product_assembly) ? $product->product_assembly : null,
            'product_care'       => isset($product->product_care) ? $product->product_care : null
            //    'LS_ID'            => $product->LS_ID,
        ];

        /* if ($product->brand == "westelm" && !$is_listing_API_call ) {
            $data['filters'] = end($variations)['filters'];
            array_pop($variations);
        } */

        // call coming from the board
        if ($is_details_minimal || $isMarked) {
            $data['board_thumb'] = (isset($product->image_xbg_thumb) && strlen($product->image_xbg_thumb)) > 0 ? env('APP_URL') . $product->image_xbg_thumb : null;
            $data['board_cropped'] = (isset($product->image_xbg_cropped) && strlen($product->image_xbg_cropped)) > 0 ? env('APP_URL') . $product->image_xbg_cropped : null;
        }

        if (isset($variations) && !$is_details_minimal) {


            if (is_array($variations)) {
                for ($i = 0; $i < sizeof($variations); $i++) {
                    if (isset($variations[$i]['image'])) {
                        if ($variations[$i]['image'] === Product::$base_siteurl) {
                            $variations[$i]['image'] = $data['main_image'];
                        }
                    }
                }
            }

            $data['variations'] = $variations;
        }


        $desc_BRANDS = Config::get('meta.to_format_brands');
        $dims_from_features = Config::get('meta.dims_form_feature_brands'); // these extract dimensions data from features data.
        $sets_enabled_brands = Config::get('meta.sets_enabled_brands');
        $dims_text = in_array($product->name, $dims_from_features) ? $product->product_feature : $product->product_dimension;
        $children = null;
        if (!$is_listing_API_call) {

            // All alpha-numeric SKUs of `sets enabled brands` products have child products
            if (in_array($product->brand, $sets_enabled_brands)) {

                if (!is_numeric($product->product_sku)) {
                    // it is alpha-numeric
                    $product_table = Utility::get_sets_enabled_brand_table($product->brand);
                    $child_rows = DB::table($product_table)
                        ->whereRaw("product_set LIKE '%" . $product->product_sku . "%'")
                        ->get();

                    $children = [];
                    foreach ($child_rows as $row) {
                        $product_set_inventory_details = Inventory::get_product_from_inventory($user, $row->product_sku);
                        $price = $was_price = null;
                        if ($product_set_inventory_details['in_inventory']) {
                            $price = $product_set_inventory_details['inventory_product_details']['price'];
                            $was_price = $product_set_inventory_details['inventory_product_details']['was_price'];
                        }
                        $set = [
                            'parent_sku' => $product->product_sku,
                            'sku' => $row->product_sku,
                            'name' => $row->product_name,
                            'image' => env('APP_URL') . $row->main_product_images,
                            'link' => $row->product_url,
                            'price' => isset($price) ? $price : $row->price,
                            'was_price' => isset($was_price) ? $was_price : $row->was_price
                        ];

                        $set = array_merge($product_set_inventory_details, $set);

                        array_push($children, $set);
                    }
                }
            }

            $data['collections'] = Collections::get_collections($product->product_sku, $product->collection, $product->brand);
            $data['set'] = $children;
            $data['description'] = in_array($product->name, $desc_BRANDS)  ? Utility::format_desc_new($product->product_description) : preg_split("/\\[US\\]|<br>|\\n/", $product->product_description);

            $dimensions_data = Dimension::normalize_dimension($dims_text, $product->brand);
            $data['dimension'] = isset($dimensions_data) ? $dimensions_data : [];

            //$data['thumb'] = preg_split("/,|\\[US\\]/", $product->thumb);
            $data['features'] = in_array($product->name, $desc_BRANDS) ? Utility::format_desc_new($product->product_feature) : preg_split("/\\[US\\]|<br>|\\n|\|/", $product->product_feature);
            $data['on_server_images'] = array_map([__CLASS__, "baseUrl"], preg_split("/,|\\[US\\]/", $product->product_images));
            $data['department_info'] = Department::get_department_info($product->LS_ID);
            $data['selections'] = $extras;
            //$data['hashmap'] = $hashmap;


            // these values are used in backend admin APIs
            $data['xbg_primary'] = isset($product->image_xbg_select_primary) ? $product->image_xbg_select_primary : null;
            $data['xbg_secondary'] = isset($product->image_xbg_select_secondary) ? $product->image_xbg_select_secondary : null;
            return $data;
        } else {

            if ($isTrending) {
                $data['description'] = in_array($product->name, $desc_BRANDS)  ? Utility::format_desc_new($product->product_description) : preg_split("/\\[US\\]|<br>|\\n/", $product->product_description);
            }

            $product_inventory_details = Inventory::get_product_from_inventory($user, $product->product_sku);
            $data = array_merge($product_inventory_details, $data);
            return $data;
        }
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
            //"variation_name",
            "has_parent_sku",
            "price",
            "was_price"
        ];

        $product_variations = [];
        $variation_choices = [];
        $variations = DB::table($variation_table)
            ->select($cols)
            ->distinct('variation_sku')
            ->where('product_sku', $sku)
            ->where('is_active', 'active')
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
                //"name" => $variation->variation_name,
                "has_parent_sku" => $variation->has_parent_sku == 1 ? true : false,
                "swatch_image" => $swatch_image,
                "image" => isset($v_image) ? Product::$base_siteurl . $v_image : null,
                "link" => $link,
                "is_button" => !isset($swatch_image),
                "label" => !isset($swatch_image) ? null : null,
                "price" => isset($variation->price) ? $variation->price : null,
                "was_price" => isset($variation->was_price) ? $variation->was_price : null,
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
                    'label' => isset($variation->variation_name) ? $variation->variation_name : "",
                    'link' => $link,
                    'var_sku' => $variation->variation_sku
                ]);
            }
        }

        $variation_extras = [
            'type' => 'redirect',
            'options' => $variation_choices
        ];


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

    public static function get_westelm_variations($product, $wl_v, $is_listing_API_call = null, $brand = 'westelm')
    {
        $cols = $brand == 'westelm' ? Config::get('meta.westelm_variations_cols') : Config::get('meta.' . $brand . '_variations_cols');
        $variation_table = $brand == 'westelm' ? Config::get('tables.variations.westelm.table') : Config::get('tables.variations.' . $brand . '.table');
        $attr_count = $brand == 'westelm' ? 6 : 3;

        $variations_extra = [];
        $swatch_map = [];
        $color_map = Product::$color_map;

        if (isset($product->product_sku)) {
            if (isset($wl_v[$product->product_sku]) || $brand != 'westelm') {
                $var = DB::table($variation_table)
                    ->select($cols)
                    ->where('status', 'active');
                //$var = $var->groupBy("swatch_image_path");

                $var = $var->where("product_id", (string)$product->product_sku)
                    ->whereRaw("LENGTH(swatch_image_path) != 0");

                if ($is_listing_API_call) $var = $var->limit(7);
                //->limit(20)
                $var = $var->get();

                // handle for - if any product has empty swatch image, then include all the entries.
                $var_add = DB::table($variation_table)
                    ->select($cols)
                    ->where('status', 'active')
                    ->where('product_id', (string)$product->product_sku)
                    ->whereRaw('LENGTH(swatch_image_path) = 0')
                    ->get();

                $var = $var->merge($var_add);
                $var = $var->all();

                // removing the check for variations = 1
                // now FE is responsible for handling this condition
                //if (sizeof($var) == 1) return [];

                //return $var;
                $variations = [];
                $variation_filters = [];
                $swatches = [];
                $extras_key = [];

                $variation_extras = [];



                foreach ($var as $prod) {
                    $features = [];
                    for ($i = 1; $i <= $attr_count; $i++) {
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
                    $features['color_group'] = null;
                    if (isset($features['color'])) {
                        $name = $features['color'];
                        $name_arr = explode(" ", $name);

                        // find the hex code for color;
                        foreach ($name_arr as $name_str) {
                            if (isset($color_map[strtolower($name_str)])) {
                                $features['color_group'] = $color_map[strtolower($name_str)]['name'];
                                break;
                            }
                        }
                        if (isset($features['fabric'])) {
                            $name .= ", " . $features['fabric'];

                            if (!isset($swatch_map[$name])) {
                                $swatch_map[$name] = $prod->swatch_image_path;
                            } else {
                                $prod->swatch_image_path = $swatch_map[$name];
                            }
                        }
                    }

                    $is_dropdown = false;
                    $extras = [];
                    $multi_select_filters = ['color_group', 'fabric'];
                    $excluded_options = ['color', 'fabric'];
                    foreach ($extras_key as $key => $arr) {
                        if (sizeof($arr) > 4) {
                            $is_dropdown = true;
                        }

                        $select_type = in_array($key, $multi_select_filters) ? "multi_select" : "single_select";
                        $select_type = in_array($key, $excluded_options) ? "excluded" : $select_type;

                        $select_type = ($key == 'color' && Utility::match_exclude_LDIS($product->LS_ID)) ? "excluded" : $select_type;

                        if ($key == "color") {
                            $extras["color_group"] = [
                                'select_type' => $select_type,
                                'options' => [],
                                'hexcodes' => []
                            ];
                        }
                        $extras[$key] = [
                            'select_type' => $select_type,
                            'options' => []
                        ];
                    }

                    foreach ($extras_key as $key => $arr) {
                        if ($key == "color") {
                            foreach ($arr as $k) {
                                $color_names = explode(" ", $k);
                                foreach ($color_names as $color_name) {
                                    $color_name = strtolower($color_name);
                                    if (isset($color_map[$color_name])) {

                                        if (!in_array($color_map[$color_name]['name'], $extras['color_group']['options']))
                                            $extras['color_group']['options'][] = $color_map[$color_name]['name'];

                                        if (!in_array($color_map[$color_name]['hexcode'], $extras['color_group']['hexcodes']))
                                            $extras['color_group']['hexcodes'][] = $color_map[$color_name]['hexcode'];
                                    }
                                }
                            }
                        }


                        foreach ($arr as $k) {
                            array_push($extras[$key]['options'], $k);
                            sort($extras[$key]['options']);
                        }
                    }

                    $variation_extras = $extras;

                    array_push($variations, [
                        "product_sku" => $product->product_sku,
                        "variation_sku" => $prod->sku,
                        "name" => $name,
                        "features" => $features,
                        "has_parent_sku" => isset($prod->has_parent_sku) ? (bool) $prod->has_parent_sku : false,
                        "image" => Product::$base_siteurl . $prod->image_path,
                        "link" =>  "/product/" . $product->product_sku,
                        "swatch_image" => strlen($prod->swatch_image_path) != 0 ? Product::$base_siteurl . $prod->swatch_image_path : null,
                        "price" => $prod->price,
                        "was_price" => $prod->was_price
                    ]);
                }


                /* if (!$is_listing_API_call) {
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
        } else {
            // product SKU not found in the incomming params 
            return [
                'error' => 'incorrect params passed in method > get_westelm_variations',
                'file' => __FILE__
            ];
        }

        return [];
    }

    public static function get_variations($product, $wl_v = null, $is_listing_API_call = null)
    {


        // Listing API update. Just send count of variations in listing API
        if ($is_listing_API_call)
            return $product->variations_count;

        $variation = [];
        switch ($product->site_name) {
            case 'cb2':
                $variations = Product::get_c_variations($product->product_sku, 'cb2_products_variations');
                break;
            case 'cab':
                $variations = Product::get_westelm_variations($product, $wl_v, $is_listing_API_call, $product->site_name);
                break;
                break;
            case 'pier1':
                $variations = Product::get_pier1_variations($product);
                break;
            case 'westelm':
                $variations = Product::get_westelm_variations($product, $wl_v, $is_listing_API_call, $product->site_name);
                break;
            default:
                $variations = [];
                break;
        }

        if (isset($variations['variations']) && is_array($variations['variations'])) {
            foreach ($variations['variations'] as &$var) {
                $inv_product = Inventory::get_product_from_inventory(Auth::user(), $var['variation_sku']);

                // override variations price data with inventory data
                if ($inv_product['in_inventory']) {
                    $var['price'] = $inv_product['inventory_product_details']['price'];
                    $var['was_price'] = $inv_product['inventory_product_details']['was_price'];
                }

                $var = array_merge($var, $inv_product);
            }
        }


        return $variations;
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

    public static function is_redirect($sku = null)
    {
        $row = DB::table("product_redirects")
            ->select(["redirect_sku", "brand"])
            ->where("sku", $sku)
            ->where("is_active", 1)
            ->get();

        return isset($row[0]) ? $row[0] : null;
    }


    public static function product_seo($sku, $ls_id)
    {

        $rows = DB::table(Config::get('tables.LS_ID_mapping'))
            ->whereIn('LS_ID', explode(",", $ls_id))
            ->get();

        $product_details = DB::table(Config::get('tables.master_table'))
            ->select([
                Config::get('tables.master_table') . ".product_name",
                Config::get('tables.master_brands') . ".name as brand_name"
            ])->join(
                Config::get('tables.master_brands'),
                Config::get('tables.master_table') . ".brand",
                "=",
                Config::get('tables.master_brands') . ".value"
            )->where(Config::get('tables.master_table') . ".product_sku", $sku)
            ->get();


        $d = null;
        foreach ($rows as $row) {
            if (
                strlen($row->cat_name_long) > 0
                && strlen($row->dept_name_long) > 0
            ) {

                $d = $row;
                break;
            }
        }

        if ($d != null || sizeof($product_details) == 0) {
            if (sizeof($product_details) >= 1) {
                $product_details = $product_details[0];
            }
            return  [
                "page_title" => $d->cat_name_long,
                "full_title" => $d->dept_name_long . " "  . $d->cat_name_short,
                "email_title" => $d->filter_label,
                "dept_name_long" => $d->dept_name_long,
                "cat_name_long" => $d->cat_name_long,
                "cat_name_short" => $d->cat_name_short,
                "cat_image" => $d->cat_image,
                "description" => "Search hundreds of " . $d->cat_name_long  . " from top brands at once. Add to your room designs with your own design boards.",
                "image_url" => Product::$base_siteurl . $d->cat_image,
                "product_name" => $product_details->product_name,
                "brand" => $product_details->brand_name
            ];
        }

        return [];
    }


    public static function get_product_details($sku)
    {
        $user = Auth::user();
        $product_inventory_details = Inventory::get_product_from_inventory($user, $sku);
        $is_wishlisted = Wishlist::is_wishlisted($user, $sku);

        // check if product needs to be redirected
        $redirection = Product::is_redirect($sku);
        $prod = Product::where('product_sku', $sku)
            ->join("master_brands", "master_data.brand", "=", "master_brands.value")
            ->get()->toArray();

        if (!isset($prod[0])) {
            return ["message" => "SKU " . $sku . " NOT FOUND"];
        }

        if ($redirection != null) {

            $redirection_sku = $redirection->redirect_sku;
            if ($redirection_sku != null) {
                $redirect_url = env('APP_URL') . "/product/" . $redirection_sku;
                $data = DB::table("master_data")
                    ->select(['product_name', 'price', 'was_price', 'main_product_images'])
                    ->where("product_sku", $redirection_sku)
                    ->get();
                if (!isset($data[0]))
                    return ["message" => "SKU " . $redirection_sku . " NOT FOUND"];
                $data = $data[0];
            } else
                $redirect_url = null;

            $prod_table = isset(Brands::$brand_mapping[$redirection->brand]) ? Brands::$brand_mapping[$redirection->brand] : null;

            if ($prod_table != null) {
                $sku_col = in_array($redirection->brand, Brands::$product_id_brands) ? "product_id" : "product_sku";
                $product = (object) $prod[0];
                $variations_data = Product::get_variations($product, null, false);
                $product_details = (array) $product;

                // adding inventory object details to main product array
                $product_details = array_merge($product_details, $product_inventory_details);

                $product = Product::get_details((object) $product_details, $variations_data, false, $is_wishlisted);
                $product['redirect_url'] = $redirect_url;
                $product['redirect'] = true;

                if (isset($data)) {
                    $product['redirect_details']['name'] = $data->product_name;
                    $product['redirect_details']['price'] = $data->price;
                    $product['redirect_details']['was_price'] = $data->was_price;
                    $product['redirect_details']['main_image'] = env('APP_URL') . $data->main_product_images;
                }

                $res['product'] = $product;
                $res['seo_data'] = Product::product_seo($sku, $product_details['LS_ID']);
                return $res;
            } else {
                return [];
            }
        }

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

        if (Product::$color_map == null) {
            // set color map data to be used in setting variations data
            $color_rows = DB::table("color_mapping")
                ->select("*")
                ->get();
            foreach ($color_rows as $key => $value) {
                Product::$color_map[strtolower($value->color_alias)] = [
                    'hexcode' => $value->color_hex,
                    'name' => $value->color_name
                ];
                Product::$color_map[strtolower($value->color_name)] = [
                    'hexcode' => $value->color_hex,
                    'name' => $value->color_name
                ];
            }
        }

        $westelm_cache_data = [];
        $variations = null;

        $variations_data = Product::get_variations((object)$prod[0], $westelm_variations_data, false);
        $prod[0] = (object) array_merge((array)$prod[0], $product_inventory_details);

        $is_wishlisted = Wishlist::is_wishlisted($user, $sku);

        /*
        $product,
        $variations,
        $is_listing_API_call = null,
        $isMarked = false,
        $isTrending = false,
        $is_details_minimal = false
         */
        return [
            "seo_data" => Product::product_seo($sku, $prod[0]->LS_ID),
            "product" => Product::get_details($prod[0], $variations_data, false, $is_wishlisted)
        ];
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


    public static function mark_image($product_sku, $image, $col)
    {

        $img_files = DB::table('master_data')
            ->select([$col])
            ->where('product_sku', $product_sku)
            ->get();

        if (isset($img_files[0])) {
            $file_paths = $img_files[0]->$col;
            $file_paths = explode(",", $file_paths);

            if (!in_array($image, $file_paths)) {
                $file_paths[] = $image;
                $file_paths_all = implode(",", $file_paths);

                return DB::table('master_data')
                    ->where('product_sku', $product_sku)
                    ->update([$col => $file_paths_all]);
            }
        }

        return false;
    }
    /**
     * Same as above function just changing name of table to master_new
     */
    public static function mark_image_master_new($product_sku, $image, $col)
    {

        $img_files = DB::table('master_new')
            ->select([$col])
            ->where('product_sku', $product_sku)
            ->get();

        if (isset($img_files[0])) {
            $file_paths = $img_files[0]->$col;
            $file_paths = explode(",", $file_paths);

            if (!in_array($image, $file_paths)) {
                $file_paths[] = $image;
                $file_paths_all = implode(",", $file_paths);

                return DB::table('master_new')
                    ->where('product_sku', $product_sku)
                    ->update([$col => $file_paths_all]);
            }
        }

        return false;
    }

    public static function get_selected_products($sku_array)
    {
        $product_rows = Product::whereIn('product_sku', $sku_array)->get();
        $response = [];

        $variations = null;
        $is_listing_API_call = true;
        $isMarked = false;
        $is_details_minimal = false;

        foreach ($product_rows as $product) {
            $response[] = Product::get_details($product, $variations, $is_listing_API_call, $isMarked, false, $is_details_minimal);
        }

        return $response;
    }
	
	 public static function get_userproduct_list($sku)
    {
		$response_user = [];
		$response_product = [];
		$response_user_str = '';
		$response_sku_str = '';
		$response = []; 
		
		 $user_rows = DB::table('user_views')
            ->select('user_id')
			->distinct()
            ->where('product_sku', $sku)
            ->get();
 
		$main_product_LSID = $product_rows = DB::table('master_data')
				->select(['LS_ID'])
				->where('product_sku', $sku)  
				->get();
				
				
		$main_LSID = explode(",",$main_product_LSID[0]->LS_ID) ;		
				
		$LSID = $main_LSID[0];	
       
		if(isset($user_rows)){
			foreach ($user_rows as $ur) {  
			  $response_user_str = $response_user_str.",".$ur->user_id;
			}
			$response_user_str = ltrim($response_user_str, ',');
			$user_array = explode(",",$response_user_str);
			
		 	$product_sku_rows = DB::table('user_views')
            ->select('product_sku')
            ->whereIn('user_id',$user_array)  
			->where('product_sku', '!=', $sku)
            ->get();
			
			
			
			if(isset($product_sku_rows)){
				foreach ($product_sku_rows as $pr) {  
				  $response_sku_str = $response_sku_str.",".$pr->product_sku;
				   
				}
				$response_sku_str = ltrim($response_sku_str, ',');
				$sku_array = explode(",",$response_sku_str);
				
				
				$product_rows = DB::table('master_data')
				->select(['id','serial','product_status','product_name','product_sku','LS_ID'])
				->whereIn('product_sku', $sku_array)  
				->where('product_status','active') 
				->get();
			
			    if(strlen($LSID)==3){
						$response = Product::get_product_for_three_digit($product_rows,$LSID);
				}
				else{
						$response = Product::get_product_for_four_digit($product_rows,$LSID);
				}
			} 
		}
		else{
		      // No User found
		}
		

        return $response;
    }
	
	
	
	public static function get_product_for_three_digit($product_rows,$LSID){
		
		$response = [];
		$response_nmatch = [];
		$response_match = [];
		$response_deptsame = [];
		$response_deptother = [];
		$response_catsame = [];
		$response_catother = [];
		$response_identical = [];
		$remainarr = [];
		 
		
		foreach ($product_rows as $product) {
					
					if (strpos($product->LS_ID, $LSID[1]) !== false)
					{
						array_push($response_match,$product);
					}
					else{
						   array_push($response_nmatch,$product);
					}
				}
				
				$response_match = array_values(array_unique($response_match,SORT_REGULAR));
				
				/* ================== Sort By Category Start =========================== */   
				
				foreach($response_match as $cat){
				
					$LS_ID_arr = explode(",",$cat->LS_ID);
					
					for($i=0;$i<count($LS_ID_arr);$i++){
						if (strpos($LS_ID_arr[$i], $LSID[1]) !== false){
							if((strpos($LS_ID_arr[$i],$LSID[1]))==1){
								array_push($response_catsame,$cat);
							}
							else{
									array_push($response_catother,$cat);
							}
						}
					}
				
				}
				/* ================== Sort By Category End =========================== */   
				
				
					
				$response_catsame = array_values(array_unique($response_catsame,SORT_REGULAR));
				
				
				/* ================== Sort By Department Start =========================== */  
				   
				foreach($response_catsame as $dept){
				
					$LS_ID_arr = explode(",",$dept->LS_ID);
					
					for($i=0;$i<count($LS_ID_arr);$i++){
						if (strpos($LS_ID_arr[$i], $LSID[0]) !== false){
							if($LS_ID_arr[$i] == $LSID){
								array_push($response_identical,$dept);
							}
							else{
									if((strpos($LS_ID_arr[$i],$LSID[0]))==0){
										array_push($response_deptsame,$dept);
									}
									else{
											array_push($response_deptother,$dept);
									}
							}
						}
					}
				
				}
				
				/* ================== Sort By Department End =========================== */  
				
				
				$response_identical = array_values(array_unique($response_identical,SORT_REGULAR));
				$response_deptsame = array_values(array_unique($response_deptsame,SORT_REGULAR));
				$response_deptother = array_values(array_unique($response_deptother,SORT_REGULAR)); // cat same
				$response_catother = array_values(array_unique($response_catother,SORT_REGULAR)); 
				$response_nmatch = array_values(array_unique($response_nmatch,SORT_REGULAR));
				
				$remainarr = array_values(array_merge($response_catother,$response_nmatch));
				$response_sku_str = '';
				$sku_array = [];
				
				if(isset($remainarr)){
					foreach ($remainarr as $pr) {  
					  $response_sku_str = $response_sku_str.",".$pr->product_sku;
					   
					}
					$response_sku_str = ltrim($response_sku_str, ',');
					$sku_array = explode(",",$response_sku_str);
					
					$product_rows1 = DB::table('user_views') 
					->whereIn('user_views.product_sku', $sku_array)  
					->join('master_data', 'user_views.product_sku', '=', 'master_data.product_sku')					
					->select(array('master_data.id','master_data.serial','master_data.product_status','master_data.product_name','master_data.product_sku','master_data.LS_ID','user_views.product_sku'))
					->groupBy('user_views.product_sku')
					->orderBy(\DB::raw('count(user_views.user_id)'), 'DESC')
					->get();
					
					$response_nmatch = [];
					foreach ($product_rows1 as $pr) {  
					  array_push($response_nmatch,$pr);
					  
					}
					
					 
				}
				
				
				$response = array_values(array_merge($response_identical, $response_deptsame, $response_deptother,  $response_nmatch));
				
				return $response;
	}
	
 

	public static function get_product_for_four_digit($product_rows,$LSID){
		
		$product_rows=[[
    {
        "id": 673,
        "serial": 29,
        "product_status": "active",
        "product_name": "Stone Table Rectangle 95\"",
        "product_sku": "479397",
        "LS_ID": "507"
    },
    {
        "id": 701,
        "serial": 51,
        "product_status": "active",
        "product_name": "Harper Brass Dining Table with Glass Top",
        "product_sku": "359011",
        "LS_ID": "507"
    },
    {
        "id": 1073,
        "serial": 20,
        "product_status": "active",
        "product_name": "Harper White Dining Table with Black Marble Top",
        "product_sku": "580101",
        "LS_ID": "507"
    },
    {
        "id": 1111,
        "serial": 13,
        "product_status": "active",
        "product_name": "Babylon Round Small Table",
        "product_sku": "584087",
        "LS_ID": "507"
    },
    {
        "id": 1353,
        "serial": 14,
        "product_status": "active",
        "product_name": "Stadium Dining Table",
        "product_sku": "628206",
        "LS_ID": "507"
    },
    {
        "id": 1391,
        "serial": 6,
        "product_status": "active",
        "product_name": "Cruz Travertine Dining Table",
        "product_sku": "601352",
        "LS_ID": "507"
    },
    {
        "id": 1409,
        "serial": 27,
        "product_status": "active",
        "product_name": "Babylon All Marble Table",
        "product_sku": "246571",
        "LS_ID": "507"
    },
    {
        "id": 1493,
        "serial": 1,
        "product_status": "active",
        "product_name": "Cy Metal and Marble Dining Table",
        "product_sku": "157291",
        "LS_ID": "507"
    },
    {
        "id": 1526,
        "serial": 1,
        "product_status": "active",
        "product_name": "Graywashed Pine Rylie Dining Table",
        "product_sku": "585354",
        "LS_ID": "507"
    },
    {
        "id": 1527,
        "serial": 2,
        "product_status": "active",
        "product_name": "Galvin Cafeteria Table",
        "product_sku": "473823",
        "LS_ID": "507"
    },
    {
        "id": 1528,
        "serial": 1,
        "product_status": "active",
        "product_name": "Marble Top Leilani Tulip Dining Table",
        "product_sku": "578200",
        "LS_ID": "507"
    },
    {
        "id": 4040,
        "serial": 6,
        "product_status": "active",
        "product_name": "Jensen Dining Table",
        "product_sku": "jensen-dining-table-h1039",
        "LS_ID": "507"
    },
    {
        "id": 4042,
        "serial": 8,
        "product_status": "active",
        "product_name": "Open Pedestal Round Dining Table",
        "product_sku": "open-pedestal-wood-round-dining-table-h4386",
        "LS_ID": "507"
    },
    {
        "id": 4131,
        "serial": 18,
        "product_status": "active",
        "product_name": "Anton Solid Wood Dining Table - Burnt Wax",
        "product_sku": "anton-solid-wood-dining-table-h4231",
        "LS_ID": "507"
    },
    {
        "id": 4242,
        "serial": 75,
        "product_status": "active",
        "product_name": "Live Edge Wood Dining Table",
        "product_sku": "live-edge-wood-table-h1850",
        "LS_ID": "507"
    },
    {
        "id": 5095,
        "serial": 97,
        "product_status": "active",
        "product_name": "Anton Solid Wood Dining Table (72\") & 6 Holland Chairs Set",
        "product_sku": "anton-solid-wood-dining-table-72-6-holland-chairs-set-h5037",
        "LS_ID": "507"
    },
    {
        "id": 7822,
        "serial": 5,
        "product_status": "active",
        "product_name": "Hayes 48\" Round Acacia Dining Table",
        "product_sku": "314111",
        "LS_ID": "507"
    },
    {
        "id": 8912,
        "serial": 17,
        "product_status": "active",
        "product_name": "Walton Ribbed Leg Dining Table",
        "product_sku": "564780",
        "LS_ID": "99,507"
    },
    {
        "id": 9307,
        "serial": 52,
        "product_status": "active",
        "product_name": "Basque Honey 82\" Dining Table",
        "product_sku": "658582",
        "LS_ID": "507"
    },
    {
        "id": 390,
        "serial": 56,
        "product_status": "active",
        "product_name": "Primitivo White Chair",
        "product_sku": "543286",
        "LS_ID": "504,213"
    },
    {
        "id": 410,
        "serial": 10,
        "product_status": "active",
        "product_name": "Venice Studio Grey Task/Office Chair",
        "product_sku": "394097",
        "LS_ID": "601,504,213"
    },
    {
        "id": 449,
        "serial": 4,
        "product_status": "active",
        "product_name": "Sophia Black Dining Chair",
        "product_sku": "377458",
        "LS_ID": "504,89,213"
    },
    {
        "id": 451,
        "serial": 18,
        "product_status": "active",
        "product_name": "Lucinda Black Stacking Chair",
        "product_sku": "591035",
        "LS_ID": "504,89,213"
    },
    {
        "id": 1042,
        "serial": 8,
        "product_status": "active",
        "product_name": "Foley Faux Mohair Grey Dining Chair",
        "product_sku": "591088",
        "LS_ID": "504,213"
    },
    {
        "id": 1103,
        "serial": 11,
        "product_status": "active",
        "product_name": "Foley Mink Velvet Dining Chair",
        "product_sku": "591090",
        "LS_ID": "504,213"
    },
    {
        "id": 1408,
        "serial": 101,
        "product_status": "active",
        "product_name": "Matera Dining Bench",
        "product_sku": "164105",
        "LS_ID": "216,504,815"
    },
    {
        "id": 1464,
        "serial": 6,
        "product_status": "active",
        "product_name": "Thea Cane Dining Chair",
        "product_sku": "687311",
        "LS_ID": "504"
    },
    {
        "id": 1466,
        "serial": 1,
        "product_status": "active",
        "product_name": "Lisette Grey Dining Chair",
        "product_sku": "121175",
        "LS_ID": "504"
    },
    {
        "id": 1524,
        "serial": 0,
        "product_status": "active",
        "product_name": "Wood Farmhouse Leona Extension Dining Table",
        "product_sku": "542375",
        "LS_ID": "508"
    },
    {
        "id": 1534,
        "serial": 5,
        "product_status": "active",
        "product_name": "Two Tone Wood Dominick Extension Dining Table",
        "product_sku": "566633",
        "LS_ID": "508"
    },
    {
        "id": 1575,
        "serial": 0,
        "product_status": "active",
        "product_name": "Round Back Paige Upholstered Dining Chair Set of 2",
        "product_sku": "10008028",
        "LS_ID": "504"
    },
    {
        "id": 1582,
        "serial": 72,
        "product_status": "active",
        "product_name": "Charcoal Gray Woven Aimee Dining Chair Set of 2",
        "product_sku": "549863",
        "LS_ID": "504"
    },
    {
        "id": 1587,
        "serial": 9,
        "product_status": "active",
        "product_name": "Weathered Gray Wood Jozy Dining Chairs Set of 2",
        "product_sku": "526102",
        "LS_ID": "504"
    },
    {
        "id": 1588,
        "serial": 34,
        "product_status": "active",
        "product_name": "Black Wood Kamron High Back Windsor Chairs Set of 2",
        "product_sku": "534985",
        "LS_ID": "504"
    },
    {
        "id": 1591,
        "serial": 6,
        "product_status": "active",
        "product_name": "Velvet Channel Back Isadora Dining Chair Set of 2",
        "product_sku": "574148",
        "LS_ID": "504"
    },
    {
        "id": 1637,
        "serial": 36,
        "product_status": "active",
        "product_name": "Burnt Alder Farmhouse Granger Dining Chair Set of 2",
        "product_sku": "589812",
        "LS_ID": "504"
    },
    {
        "id": 1671,
        "serial": 0,
        "product_status": "active",
        "product_name": "Distressed Wood Bistro Counter Stool",
        "product_sku": "437525",
        "LS_ID": "505"
    },
    {
        "id": 1673,
        "serial": 2,
        "product_status": "active",
        "product_name": "Zarah Wingback Upholstered Counter Stool",
        "product_sku": "566631",
        "LS_ID": "505"
    },
    {
        "id": 2737,
        "serial": 4,
        "product_status": "active",
        "product_name": "Distressed Wood Bistro Dining Chair Set of 2",
        "product_sku": "433870",
        "LS_ID": "504"
    },
    {
        "id": 3453,
        "serial": 1,
        "product_status": "active",
        "product_name": "Slope Leather Dining Chair",
        "product_sku": "leather-slope-dining-chair-h1529",
        "LS_ID": "504"
    },
    {
        "id": 3454,
        "serial": 1,
        "product_status": "active",
        "product_name": "Slope Leather Bar & Counter Stools",
        "product_sku": "slope-leather-bar-counter-stools-h1752",
        "LS_ID": "505"
    },
    {
        "id": 3455,
        "serial": 2,
        "product_status": "active",
        "product_name": "Framework Leather Dining Chair - Saddle",
        "product_sku": "framework-dining-chair-leather-saddle-h2681",
        "LS_ID": "504"
    },
    {
        "id": 3460,
        "serial": 5,
        "product_status": "active",
        "product_name": "Wire Frame Leather Dining Chair",
        "product_sku": "wire-frame-leather-dining-chair-h4005",
        "LS_ID": "504"
    },
    {
        "id": 4035,
        "serial": 1,
        "product_status": "active",
        "product_name": "Mid-Century Expandable Dining Table - Walnut",
        "product_sku": "parker-expandable-dining-table-g830",
        "LS_ID": "508"
    },
    {
        "id": 4036,
        "serial": 2,
        "product_status": "active",
        "product_name": "Mid-Century Rounded Expandable Dining Table",
        "product_sku": "mid-century-expandable-dining-table-round-h4230",
        "LS_ID": "508"
    },
    {
        "id": 4038,
        "serial": 4,
        "product_status": "active",
        "product_name": "Mid-Century Expandable Dining Table - Pebble",
        "product_sku": "mid-century-expandable-dining-table-pebble-h3996",
        "LS_ID": "508"
    },
    {
        "id": 4041,
        "serial": 7,
        "product_status": "active",
        "product_name": "Fishs Eddy Expandable Dining Table",
        "product_sku": "fishs-eddy-expandable-dining-table-h2403",
        "LS_ID": "508"
    },
    {
        "id": 4047,
        "serial": 2,
        "product_status": "active",
        "product_name": "Mid-Century A-Frame Bench",
        "product_sku": "a-frame-bench-h4311",
        "LS_ID": "503"
    },
    {
        "id": 4048,
        "serial": 6,
        "product_status": "active",
        "product_name": "Mid-Century Upholstered Dining Chair - Wood Legs",
        "product_sku": "mid-century-dining-chairs-h1361",
        "LS_ID": "504"
    },
    {
        "id": 4051,
        "serial": 8,
        "product_status": "active",
        "product_name": "Classic Café Dining Chair",
        "product_sku": "classic-cafe-dining-chair-walnut-h2099",
        "LS_ID": "504"
    },
    {
        "id": 4058,
        "serial": 4,
        "product_status": "active",
        "product_name": "Classic Café Walnut Bar & Counter Stools",
        "product_sku": "classic-cafe-walnut-bar-counter-stools-h3193",
        "LS_ID": "505"
    },
    {
        "id": 4187,
        "serial": 18,
        "product_status": "active",
        "product_name": "Mid-Century Upholstered Dining Chair - Metal Legs",
        "product_sku": "mid-century-upholstered-dining-chair-metal-h4713",
        "LS_ID": "504"
    },
    {
        "id": 4252,
        "serial": 24,
        "product_status": "active",
        "product_name": "Holland Dining Chair",
        "product_sku": "holland-dining-chair-h4232",
        "LS_ID": "504"
    },
    {
        "id": 4265,
        "serial": 37,
        "product_status": "active",
        "product_name": "Ellis Upholstered Dining Chair",
        "product_sku": "ellis-dining-chair-h2563",
        "LS_ID": "504"
    },
    {
        "id": 4992,
        "serial": 59,
        "product_status": "active",
        "product_name": "Round Back Dining Chair",
        "product_sku": "round-back-dining-chair-h5305",
        "LS_ID": "504"
    },
    {
        "id": 6510,
        "serial": 6,
        "product_status": "active",
        "product_name": "Lowe Onyx Leather Dining Chair",
        "product_sku": "305358",
        "LS_ID": "504,99"
    },
    {
        "id": 7795,
        "serial": 20,
        "product_status": "active",
        "product_name": "Tate Walnut Extendable Midcentury Dining Table",
        "product_sku": "296405",
        "LS_ID": "508"
    },
    {
        "id": 7828,
        "serial": 141,
        "product_status": "active",
        "product_name": "French Kitchen Island",
        "product_sku": "131558",
        "LS_ID": "514,509"
    },
    {
        "id": 7829,
        "serial": 7,
        "product_status": "active",
        "product_name": "Camille Anthracite Italian Dining Chair",
        "product_sku": "585299",
        "LS_ID": "504"
    },
    {
        "id": 7831,
        "serial": 16,
        "product_status": "active",
        "product_name": "Mist Acrylic Dining Chair",
        "product_sku": "291175",
        "LS_ID": "504"
    },
    {
        "id": 7835,
        "serial": 2,
        "product_status": "active",
        "product_name": "Crescent Black Rush Seat Dining Chair",
        "product_sku": "319130",
        "LS_ID": "504"
    },
    {
        "id": 7839,
        "serial": 3,
        "product_status": "active",
        "product_name": "Tig Indoor/Outdoor White Metal Dining Chair",
        "product_sku": "442132",
        "LS_ID": "504"
    },
    {
        "id": 7854,
        "serial": 8,
        "product_status": "active",
        "product_name": "Libby Cane Dining Chair",
        "product_sku": "581832",
        "LS_ID": "504"
    },
    {
        "id": 7868,
        "serial": 64,
        "product_status": "active",
        "product_name": "Folio Merlot Top-Grain Leather Dining Chair",
        "product_sku": "545959",
        "LS_ID": "504"
    },
    {
        "id": 7872,
        "serial": 11,
        "product_status": "active",
        "product_name": "Curran Black Dining Chair",
        "product_sku": "570536",
        "LS_ID": "504"
    },
    {
        "id": 7937,
        "serial": 1,
        "product_status": "active",
        "product_name": "Curran Quilted Chocolate Counter Stool",
        "product_sku": "559961",
        "LS_ID": "505,506"
    },
    {
        "id": 8429,
        "serial": 7,
        "product_status": "active",
        "product_name": "Tate 60\" Walnut Desk with Power Outlet",
        "product_sku": "455730",
        "LS_ID": "506,602"
    },
    {
        "id": 8927,
        "serial": 5,
        "product_status": "active",
        "product_name": "Helsing Desk",
        "product_sku": "565685",
        "LS_ID": "506,602,99"
    },
    {
        "id": 8934,
        "serial": 29,
        "product_status": "active",
        "product_name": "Addison White Slipcovered Dining Chair",
        "product_sku": "593162",
        "LS_ID": "504"
    },
    {
        "id": 8987,
        "serial": 1,
        "product_status": "active",
        "product_name": "Folio Green Top-Grain Leather Dining Chair",
        "product_sku": "636024",
        "LS_ID": "504"
    },
    {
        "id": 8988,
        "serial": 17,
        "product_status": "active",
        "product_name": "Folio Dark Green Top-Grain Leather Dining Chair",
        "product_sku": "635970",
        "LS_ID": "504"
    },
    {
        "id": 9154,
        "serial": 13,
        "product_status": "active",
        "product_name": "Folio Dark Blue Top-Grain Leather Dining Chair",
        "product_sku": "635470",
        "LS_ID": "504"
    },
    {
        "id": 9155,
        "serial": 15,
        "product_status": "active",
        "product_name": "Folio Dark Grey Top-Grain Leather Dining Chair",
        "product_sku": "635457",
        "LS_ID": "504"
    },
    {
        "id": 9157,
        "serial": 80,
        "product_status": "active",
        "product_name": "Folio Beige Top-Grain Leather Dining Chair",
        "product_sku": "635400",
        "LS_ID": "504"
    },
    {
        "id": 9194,
        "serial": 10,
        "product_status": "active",
        "product_name": "Folio Sand Top-Grain Leather Dining Chair",
        "product_sku": "543476",
        "LS_ID": "504,99"
    },
    {
        "id": 9196,
        "serial": 5,
        "product_status": "active",
        "product_name": "Clairette Rose Red Dining Armchair",
        "product_sku": "643264",
        "LS_ID": "504"
    },
    {
        "id": 9311,
        "serial": 2,
        "product_status": "active",
        "product_name": "Lakin 81\" Recycled Teak Extendable Dining Table",
        "product_sku": "462000",
        "LS_ID": "508"
    },
    {
        "id": 1093,
        "serial": 1,
        "product_status": "active",
        "product_name": "Burnham File Credenza",
        "product_sku": "598085",
        "LS_ID": "605"
    },
    {
        "id": 1408,
        "serial": 101,
        "product_status": "active",
        "product_name": "Matera Dining Bench",
        "product_sku": "164105",
        "LS_ID": "216,504,815"
    },
    {
        "id": 1971,
        "serial": 44,
        "product_status": "active",
        "product_name": "Metal Sylvia Accent Table with Numbered Drawers",
        "product_sku": "500123",
        "LS_ID": "315,225,402"
    },
    {
        "id": 6516,
        "serial": 1,
        "product_status": "active",
        "product_name": "Spotlight Ebony Credenza",
        "product_sku": "186514",
        "LS_ID": "605,99"
    },
    {
        "id": 1856,
        "serial": 8,
        "product_status": "active",
        "product_name": "Rose Pink Tyley Upholstered Chair",
        "product_sku": "526571",
        "LS_ID": "210"
    },
    {
        "id": 1925,
        "serial": 62,
        "product_status": "active",
        "product_name": "Espresso Rattan Papasan Chair Frame",
        "product_sku": "370647",
        "LS_ID": "220,210"
    },
    {
        "id": 2741,
        "serial": 0,
        "product_status": "active",
        "product_name": "Dusty Rose Faux Fur Papasan Chair Cushion",
        "product_sku": "573990",
        "LS_ID": "220"
    },
    {
        "id": 4353,
        "serial": 2,
        "product_status": "active",
        "product_name": "Anton Burnt Wax Floor Mirror",
        "product_sku": "rune-mirror-standing-d7606",
        "LS_ID": "1110"
    },
    {
        "id": 4354,
        "serial": 3,
        "product_status": "active",
        "product_name": "Anton Mirror - Round",
        "product_sku": "rune-mirror-round-d7605",
        "LS_ID": "1110"
    },
    {
        "id": 4685,
        "serial": 1,
        "product_status": "active",
        "product_name": "Reflected Diamonds Indoor/Outdoor Rug",
        "product_sku": "reflected-diamonds-indoor-outdoor-rug-t4384",
        "LS_ID": "1103"
    },
    {
        "id": 4708,
        "serial": 8,
        "product_status": "active",
        "product_name": "Mid-Century Asymmetrical Wood Framed Floor Mirror",
        "product_sku": "mid-century-asymmetrical-floor-mirror-w2834",
        "LS_ID": "1110"
    },
    {
        "id": 4710,
        "serial": 10,
        "product_status": "active",
        "product_name": "Industrial Shadowbox Floor Mirror - Antique Copper",
        "product_sku": "industrial-shadowbox-floor-mirror-h3373",
        "LS_ID": "1110"
    },
    {
        "id": 5628,
        "serial": 5,
        "product_status": "active",
        "product_name": "SZKLO Glass Triangle Mirror",
        "product_sku": "lcl-szklo-glass-triangle-mirror-d8922",
        "LS_ID": "1110"
    },
    {
        "id": 5921,
        "serial": 29,
        "product_status": "active",
        "product_name": "Kids Ever Simple White Small Desk",
        "product_sku": "449191",
        "LS_ID": "930"
    },
    {
        "id": 5931,
        "serial": 2,
        "product_status": "active",
        "product_name": "Kids Paxson Desk",
        "product_sku": "144202",
        "LS_ID": "930"
    },
    {
        "id": 9207,
        "serial": 100,
        "product_status": "active",
        "product_name": "Marcelene Rug 8'x10'",
        "product_sku": "138453",
        "LS_ID": "1130"
    },
    {
        "id": 9325,
        "serial": 3,
        "product_status": "active",
        "product_name": "Surina Black Rug 6'x9'",
        "product_sku": "567435",
        "LS_ID": "1130"
    },
    {
        "id": 9386,
        "serial": 41,
        "product_status": "active",
        "product_name": "Edge Brass 36\" Round Mirror",
        "product_sku": "137576",
        "LS_ID": "1110"
    },
    {
        "id": 9492,
        "serial": 155,
        "product_status": "active",
        "product_name": "Birch Terra Cotta Wool-Blend Abstract Rug 6'x9'",
        "product_sku": "229748",
        "LS_ID": "1130"
    },
    {
        "id": 9493,
        "serial": 156,
        "product_status": "active",
        "product_name": "Birch Terra Cotta Wool-Blend Abstract Rug 8'x10'",
        "product_sku": "229996",
        "LS_ID": "1130"
    },
    {
        "id": 9497,
        "serial": 164,
        "product_status": "active",
        "product_name": "Ceri Grey Indoor/Outdoor Rug 3'x5'",
        "product_sku": "325618",
        "LS_ID": "1130"
    },
    {
        "id": 9500,
        "serial": 167,
        "product_status": "active",
        "product_name": "Ceri Grey Indoor/Outdoor Rug 8'x10'",
        "product_sku": "325664",
        "LS_ID": "1130"
    },
    {
        "id": 9504,
        "serial": 172,
        "product_status": "active",
        "product_name": "Yumi Grey Multi-Color Rag Rug 5'x8'",
        "product_sku": "279231",
        "LS_ID": "1130"
    },
    {
        "id": 9536,
        "serial": 211,
        "product_status": "active",
        "product_name": "Cityscape Flatweave 8x10 Rug",
        "product_sku": "509940",
        "LS_ID": "1130"
    },
    {
        "id": 9757,
        "serial": 528,
        "product_status": "active",
        "product_name": "Torra Red Persian-Style Rug 9'x12'",
        "product_sku": "275203",
        "LS_ID": "1130"
    },
    {
        "id": 9837,
        "serial": 158,
        "product_status": "active",
        "product_name": "Louna Sofa",
        "product_sku": "106584",
        "LS_ID": "0"
    },
    {
        "id": 34,
        "serial": 35,
        "product_status": "active",
        "product_name": "3-Piece Peekaboo Acrylic Nesting Table Set",
        "product_sku": "102926",
        "LS_ID": "315,225,99"
    },
    {
        "id": 329,
        "serial": 2,
        "product_status": "active",
        "product_name": "Gwyneth Boucle Chair",
        "product_sku": "529566",
        "LS_ID": "99,213"
    },
    {
        "id": 419,
        "serial": 1,
        "product_status": "active",
        "product_name": "Boomerang Lounge Rattan Tub Chair Black",
        "product_sku": "516858",
        "LS_ID": "213"
    },
    {
        "id": 779,
        "serial": 5,
        "product_status": "active",
        "product_name": "Dorset Linen Credenza",
        "product_sku": "317352",
        "LS_ID": "99,512"
    },
    {
        "id": 786,
        "serial": 39,
        "product_status": "active",
        "product_name": "Reflect Rattan Credenza",
        "product_sku": "126995",
        "LS_ID": "512"
    },
    {
        "id": 822,
        "serial": 20,
        "product_status": "active",
        "product_name": "Stairway White 96\" Wall Mounted Bookcase",
        "product_sku": "474749",
        "LS_ID": "99"
    },
    {
        "id": 1038,
        "serial": 19,
        "product_status": "active",
        "product_name": "Casco Chair",
        "product_sku": "612120",
        "LS_ID": "213"
    },
    {
        "id": 1382,
        "serial": 22,
        "product_status": "active",
        "product_name": "Pavia Lounge Chair",
        "product_sku": "672137",
        "LS_ID": "213"
    },
    {
        "id": 1414,
        "serial": 20,
        "product_status": "active",
        "product_name": "Fitz Grey Swivel Chair",
        "product_sku": "107818",
        "LS_ID": "213"
    },
    {
        "id": 1415,
        "serial": 22,
        "product_status": "active",
        "product_name": "Matter Ivory Cement Square Coffee Table",
        "product_sku": "180914",
        "LS_ID": "224,823"
    },
    {
        "id": 1416,
        "serial": 15,
        "product_status": "active",
        "product_name": "Matter Grey Cement Rectangle Coffee Table",
        "product_sku": "180936",
        "LS_ID": "224,99,823"
    },
    {
        "id": 1854,
        "serial": 0,
        "product_status": "active",
        "product_name": "Feather Filled Swivel Brynn Armchair",
        "product_sku": "565724",
        "LS_ID": "211"
    },
    {
        "id": 1934,
        "serial": 0,
        "product_status": "active",
        "product_name": "Round White Marble Milan Coffee Table",
        "product_sku": "557811",
        "LS_ID": "224"
    },
    {
        "id": 1935,
        "serial": 0,
        "product_status": "active",
        "product_name": "Live Edge Wood Sansur Coffee Table",
        "product_sku": "565754",
        "LS_ID": "224"
    },
    {
        "id": 2052,
        "serial": 1,
        "product_status": "active",
        "product_name": "Black Suti Pouf",
        "product_sku": "507178",
        "LS_ID": "218"
    },
    {
        "id": 2061,
        "serial": 0,
        "product_status": "active",
        "product_name": "Woven Textured Floor Pouf",
        "product_sku": "550230",
        "LS_ID": "218"
    },
    {
        "id": 2067,
        "serial": 0,
        "product_status": "active",
        "product_name": "Gray Carved Wood Iver Ottoman",
        "product_sku": "550018",
        "LS_ID": "217"
    },
    {
        "id": 2121,
        "serial": 12,
        "product_status": "active",
        "product_name": "Bajot Stool with Sari Pouf",
        "product_sku": "508523",
        "LS_ID": "219,218"
    },
    {
        "id": 2971,
        "serial": 1,
        "product_status": "active",
        "product_name": "Milo Twin Bunk Bed - Pebble / White",
        "product_sku": "milo-twin-bunk-bed-d7223",
        "LS_ID": "911"
    },
    {
        "id": 2983,
        "serial": 1,
        "product_status": "active",
        "product_name": "Mid-Century 6-Drawer Dresser - White",
        "product_sku": "mid-century-6-drawer-dresser-white-g988",
        "LS_ID": "314"
    },
    {
        "id": 2984,
        "serial": 1,
        "product_status": "active",
        "product_name": "Mid-Century Nightstand - White Lacquer",
        "product_sku": "mid-century-nightstand-white-g967",
        "LS_ID": "315"
    },
    {
        "id": 3168,
        "serial": 52,
        "product_status": "active",
        "product_name": "Playa Outdoor Lounge Chair",
        "product_sku": "playa-outdoor-lounge-chair-h4127",
        "LS_ID": "811"
    },
    {
        "id": 3564,
        "serial": 1,
        "product_status": "active",
        "product_name": "Mid-Century Pop-Up Storage Coffee Table",
        "product_sku": "mid-century-pop-up-storage-coffee-table-h1903",
        "LS_ID": "224"
    },
    {
        "id": 3565,
        "serial": 2,
        "product_status": "active",
        "product_name": "Terrace Coffee Table",
        "product_sku": "terrace-coffee-table-h1030",
        "LS_ID": "224"
    },
    {
        "id": 3693,
        "serial": 25,
        "product_status": "active",
        "product_name": "Reeve Mid-Century Side Table - Marble",
        "product_sku": "reeve-mid-century-side-table-marble-h955",
        "LS_ID": "225"
    },
    {
        "id": 3964,
        "serial": 31,
        "product_status": "active",
        "product_name": "Ladder Bookshelf - Wide (Sand/Stone)",
        "product_sku": "ladder-bookshelf-wide-sand-stone-h3442",
        "LS_ID": "228"
    },
    {
        "id": 4097,
        "serial": 17,
        "product_status": "active",
        "product_name": "Roar & Rabbit™ Brass Geo Inlay Nightstand - Raw Mango",
        "product_sku": "roar-rabbit-brass-geo-inlay-nightstand-h1806",
        "LS_ID": "315"
    },
    {
        "id": 4422,
        "serial": 1,
        "product_status": "active",
        "product_name": "Mid-Century Headboard Storage Platform Bed - Acorn",
        "product_sku": "mid-century-bed-storage-headboard-acorn-d7192",
        "LS_ID": "911"
    },
    {
        "id": 4424,
        "serial": 3,
        "product_status": "active",
        "product_name": "Mid-Century Side Storage Platform Bed - White",
        "product_sku": "mid-century-storage-platform-bed-white-d7200",
        "LS_ID": "911"
    },
    {
        "id": 4791,
        "serial": 26,
        "product_status": "active",
        "product_name": "Jordan Shelf Brackets (Set of 2)",
        "product_sku": "jordan-shelf-brackets-set-of-2-brass-d7812",
        "LS_ID": "228"
    },
    {
        "id": 5948,
        "serial": 1,
        "product_status": "active",
        "product_name": "Avery Dusty Mauve Velvet Swivel Chair",
        "product_sku": "139388",
        "LS_ID": "921,99"
    },
    {
        "id": 5990,
        "serial": 2,
        "product_status": "active",
        "product_name": "Devon Black and Natural Modern Kids Chair",
        "product_sku": "257289",
        "LS_ID": "921"
    },
    {
        "id": 6020,
        "serial": 113,
        "product_status": "active",
        "product_name": "Small Mint Dash Nod Chair",
        "product_sku": "384851",
        "LS_ID": "921"
    },
    {
        "id": 6036,
        "serial": 2,
        "product_status": "active",
        "product_name": "Large Pink Velvet Bean Bag Chair",
        "product_sku": "387814",
        "LS_ID": "923,921"
    },
    {
        "id": 6041,
        "serial": 1,
        "product_status": "active",
        "product_name": "Large Mint Bean Bag Chair",
        "product_sku": "305361",
        "LS_ID": "99,923,921"
    },
    {
        "id": 6044,
        "serial": 13,
        "product_status": "active",
        "product_name": "Small Charcoal Bean Bag Chair",
        "product_sku": "608207",
        "LS_ID": "99,923,921"
    },
    {
        "id": 6096,
        "serial": 1,
        "product_status": "active",
        "product_name": "Dillon Natural Yukas Round Wood Coffee Table",
        "product_sku": "117217",
        "LS_ID": "224"
    },
    {
        "id": 6108,
        "serial": 49,
        "product_status": "active",
        "product_name": "Era Limestone Round Coffee Table",
        "product_sku": "337759",
        "LS_ID": "224"
    },
    {
        "id": 6200,
        "serial": 1,
        "product_status": "active",
        "product_name": "Leif Black Bunching Table",
        "product_sku": "435154",
        "LS_ID": "225"
    },
    {
        "id": 6480,
        "serial": 28,
        "product_status": "active",
        "product_name": "Axis II Armless Chair",
        "product_sku": "225172",
        "LS_ID": "99"
    },
    {
        "id": 6854,
        "serial": 2,
        "product_status": "active",
        "product_name": "Hampshire Spindle Olive Green Daybed",
        "product_sku": "269704",
        "LS_ID": "911"
    },
    {
        "id": 6874,
        "serial": 3,
        "product_status": "active",
        "product_name": "Simmons Kids® BeautySleep® Naturally Contoured Changing Pad",
        "product_sku": "185070",
        "LS_ID": "913"
    },
    {
        "id": 7021,
        "serial": 51,
        "product_status": "active",
        "product_name": "Maze Small White Bookcase",
        "product_sku": "327494",
        "LS_ID": "941"
    },
    {
        "id": 8036,
        "serial": 1,
        "product_status": "active",
        "product_name": "Ventana Glass Display Cabinet",
        "product_sku": "671101",
        "LS_ID": "99,511,229"
    },
    {
        "id": 8553,
        "serial": 230,
        "product_status": "active",
        "product_name": "Hoyne 21.5\" Iron Pendant",
        "product_sku": "108362",
        "LS_ID": "1123"
    },
    {
        "id": 8555,
        "serial": 1,
        "product_status": "active",
        "product_name": "Cosmo Brass Wire Pendant Light",
        "product_sku": "612912",
        "LS_ID": "1123"
    },
    {
        "id": 8711,
        "serial": 1,
        "product_status": "active",
        "product_name": "Nesting Charcoal and Grey Stain Play Table and Chairs Set",
        "product_sku": "341403",
        "LS_ID": "921"
    },
    {
        "id": 8794,
        "serial": 24,
        "product_status": "active",
        "product_name": "Clive 6-Arm Brass Chandelier",
        "product_sku": "562687",
        "LS_ID": "1126"
    },
    {
        "id": 8920,
        "serial": 1,
        "product_status": "active",
        "product_name": "Rio Nightstand",
        "product_sku": "563782",
        "LS_ID": "315"
    },
    {
        "id": 8921,
        "serial": 2,
        "product_status": "active",
        "product_name": "Renard Nightstand",
        "product_sku": "563371",
        "LS_ID": "315"
    },
    {
        "id": 8923,
        "serial": 4,
        "product_status": "active",
        "product_name": "Anaise Cane Nightstand",
        "product_sku": "563574",
        "LS_ID": "315"
    },
    {
        "id": 9085,
        "serial": 2,
        "product_status": "active",
        "product_name": "Kids Jewel Blush Dresser",
        "product_sku": "568078",
        "LS_ID": "943"
    },
    {
        "id": 9220,
        "serial": 4,
        "product_status": "active",
        "product_name": "Yellow Corduroy Small Nod Chair",
        "product_sku": "646212",
        "LS_ID": "921"
    },
    {
        "id": 9221,
        "serial": 2,
        "product_status": "active",
        "product_name": "Pink Corduroy Small Nod Chair",
        "product_sku": "646198",
        "LS_ID": "921"
    },
    {
        "id": 9238,
        "serial": 11,
        "product_status": "active",
        "product_name": "Snoozer Charcoal Storage Ottoman",
        "product_sku": "630517",
        "LS_ID": "921"
    },
    {
        "id": 9286,
        "serial": 16,
        "product_status": "active",
        "product_name": "Printed Play Chair Animal Print",
        "product_sku": "659268",
        "LS_ID": "921"
    },
    {
        "id": 9287,
        "serial": 17,
        "product_status": "active",
        "product_name": "Printed Play Chair Blue Palm Leaf",
        "product_sku": "659383",
        "LS_ID": "921"
    },
    {
        "id": 9288,
        "serial": 19,
        "product_status": "active",
        "product_name": "Printed Play Chair Orange Stripe",
        "product_sku": "659405",
        "LS_ID": "921"
    },
    {
        "id": 9394,
        "serial": 37,
        "product_status": "active",
        "product_name": "Finn Fur Armchair",
        "product_sku": "203479",
        "LS_ID": "211"
    },
    {
        "id": 9461,
        "serial": 1,
        "product_status": "active",
        "product_name": "Babyletto Washed Natural Origami Crib",
        "product_sku": "216536",
        "LS_ID": "912"
    },
    {
        "id": 9847,
        "serial": 1,
        "product_status": "active",
        "product_name": "Wrightwood Denim Blue Trundle Bed",
        "product_sku": "227361",
        "LS_ID": ""
    }
]];
		
		return $product_rows;
		$response = [];
		$response_nmatch = [];
		$response_match = [];
		$response_deptsame = [];
		$response_deptother = [];
		$response_catsame = [];
		$response_catother = [];
		$response_identical = [];
		$remainarr = [];
		
		foreach($product_rows as $pr){ 
		 //	$pr->LS_ID =  '1123';return strcmp($LSID,$pr->LS_ID);
			//$flag = in_array($LSID, $LS_ID_arr);
			//if(in_array($LSID, $LS_ID_arr)){
			if( (strcmp($LSID,$pr->LS_ID))==0){	
				array_push($response_identical,$pr);
			}
			else{
					array_push($response_catother,$pr);
			}
			
		}
		return $response_identical;
		$LSID_dept = $LSID[0].$LSID[1].$LSID[2];
		
		
	/* ================== Sort By Department Start =========================== */  
		   
		foreach($response_catother as $dept){
		
			$LS_ID_arr = explode(",",$dept->LS_ID);
			
			for($i=0;$i<count($LS_ID_arr);$i++){
				if (strpos($LS_ID_arr[$i], $LSID_dept) == 0){ 
					array_push($response_deptsame,$dept);
				}
				else{
						
						array_push($response_deptother,$dept); 
				}
			}
			
		
		}
		
		/* ================== Sort By Department End =========================== */  
		
		//$response_identical = array_values(array_unique($response_identical,SORT_REGULAR));
		$response_deptsame = array_values(array_unique($response_deptsame,SORT_REGULAR));
		$response_deptother = array_values(array_unique($response_deptother,SORT_REGULAR)); // cat same
		//$response_catother = array_values(array_unique($response_catother,SORT_REGULAR)); 
		//$response_nmatch = array_values(array_unique($response_nmatch,SORT_REGULAR));
						
		$response = array_values(array_merge($response_identical, $response_deptsame, $response_deptother));
				
		return $product_rows;
	}
	
 


};
