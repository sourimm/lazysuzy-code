<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = "mapping_core";
    protected $base_site = "https://lazysuzy.com";

    public static function get_categories($dept = null)
    {
        $c_cat = [];
        $base_site = request()->getHttpHost();


        if (isset($_GET['dept'])) {
            $dept = strtolower(trim($_GET['dept']));
        }

        $rows = Category::select(['product_category', 'product_category_', 'LS_ID'])
            ->where('department_', $dept)
            ->whereRaw('LENGTH(product_category) != 0 AND LENGTH(product_sub_category) = 0')
            ->get()
            ->toArray();

        foreach ($rows as $row) {
            $sub_categories = SubCategory::getSubCategories($dept, $row['product_category_']);
            array_push($c_cat, [
                'category' => $row['product_category'],
                'LS_ID' => $row['LS_ID'],
                'link' => $base_site . '/' . $dept . '/' . $row['product_category_'],   
                'sub_categories' => $sub_categories
            ]);
        }

        return $c_cat;
    }
}
