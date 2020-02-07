<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = "mapping_core";

    public static $base_site_url = "https://www.lazysuzy.com";

    protected $listing_base_url = "/products";

    public static function get_categories($dept = null)
    {
        $c_cat = [];
        $base_site = request()->getHttpHost();
        $listing_base_url = "/products";

        if (isset($_GET['dept'])) {
            $dept = strtolower(trim($_GET['dept']));
        }

        $rows = Category::select(['cat_name_long', 'cat_name_url',
            'cat_image','LS_ID', 'filter_label', 'cat_name_short'])
            ->where('dept_name_short', $dept)
            ->whereRaw('LENGTH(cat_name_short) != 0 AND LENGTH(cat_sub_name) = 0')
            ->get()
            ->toArray();

        foreach ($rows as $row) {
            $sub_categories = SubCategory::getSubCategories($dept, $row['cat_name_url']);
            array_push($c_cat, [
                'category' => $row['cat_name_short'],
                'product_category_' => $row['cat_name_url'],
                'filter_label' => ucfirst($row['filter_label']),
                'LS_ID' => $row['LS_ID'],
                'image' => Category::$base_site_url . '' . $row['cat_image'],
                'link' => $listing_base_url . '/' . strtolower($dept) . '/' . strtolower($row['cat_name_url']),
                'sub_categories' => $sub_categories
            ]);
        }
        return $c_cat;
    }

    public static function trending_categories($limit) {
        
        $trending_categories = [];
        $cols = [
            'dept_name_long', 'cat_name_long', 'cat_name_url',
            'cat_image', 'cat_name_short', 'dept_name_url'
        ];
        
        $rows = Category::select($cols)
            ->orderBy('rank', 'ASC')
            ->whereRaw('rank > 0')
            ->limit($limit)
            ->get()
            ->toArray();
        
            foreach($rows as $row) {
            array_push($trending_categories, [
                'category' => $row['cat_name_short'],
                'link' => '/products/' . $row['dept_name_url'] . "/" . $row['cat_name_url'],
                'image' => $row['cat_image']
            ]);
        }
        
        return $trending_categories;
        
    }
}
