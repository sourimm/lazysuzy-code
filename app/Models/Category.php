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

        $rows = Category::select(['product_category', 'product_category_',
            'category_image','LS_ID', 'filter_label'])
            ->where('department_', $dept)
            ->whereRaw('LENGTH(product_category) != 0 AND LENGTH(product_sub_category) = 0')
            ->get()
            ->toArray();

        foreach ($rows as $row) {
            $sub_categories = SubCategory::getSubCategories($dept, $row['product_category_']);
            array_push($c_cat, [
                'category' => $row['product_category'],
                'filter_label' => ucfirst($row['filter_label']),
                'LS_ID' => $row['LS_ID'],
                'image' => Category::$base_site_url . '' . $row['category_image'],
                'link' => $listing_base_url . '/' . strtolower($dept) . '/' . strtolower($row['product_category_']),
                'sub_categories' => $sub_categories
            ]);
        }
        return $c_cat;
    }

    public static function trending_categories($limit) {
        
        $trending_categories = [];
        $cols = [
            'department_', 'product_category', 'product_category_',
            'category_image'
        ];
        
        $rows = Category::select($cols)
            ->orderBy('rank', 'ASC')
            ->whereRaw('rank > 0')
            ->limit($limit)
            ->get()
            ->toArray();
        
            foreach($rows as $row) {
            array_push($trending_categories, [
                'category' => $row['product_category'],
                'link' => '/products/' . $row['department_'] . "/" . $row['product_category_'],
                'image' => $row['category_image']
            ]);
        }
        
        return $trending_categories;
        
    }
}
