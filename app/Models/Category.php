<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = "mapping_core";
    protected static $base_site = "https://lazysuzy.com";
    protected $listing_base_url = "/products";

    public static function get_categories($dept = null)
    {
        $c_cat = [];
        $base_site = request()->getHttpHost();
        $listing_base_url = "/products";

        if (isset($_GET['dept'])) {
            $dept = strtolower(trim($_GET['dept']));
        }

        $rows = Category::select(['product_category', 'product_category_',
            'category_image','LS_ID'])
            ->where('department_', $dept)
            ->whereRaw('LENGTH(product_category) != 0 AND LENGTH(product_sub_category) = 0')
            ->get()
            ->toArray();

        foreach ($rows as $row) {
            $sub_categories = SubCategory::getSubCategories($dept, $row['product_category_']);
            array_push($c_cat, [
                'category' => $row['product_category'],
                'LS_ID' => $row['LS_ID'],
                'image' =>  $row['category_image'],
                'link' => $listing_base_url . '/' . strtolower($dept) . '/' . strtolower($row['product_category_']),
                'sub_categories' => $sub_categories
            ]);
        }
        return $c_cat;
    }
}
