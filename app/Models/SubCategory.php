<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubCategory extends Model
{
    protected $table = "mapping_core";

    public static function getSubCategories($department, $category)
    {
        $sub_categories = [];

        $rows = SubCategory::select(['product_sub_category', 'LS_ID', 'product_sub_category_'])
            ->where('department_', $department)
            ->where('product_category_', $category)
            ->whereRaw('LENGTH(product_sub_category) != 0')
            ->get()
            ->toArray();

        foreach ($rows as $row) {
            array_push($sub_categories, [
                'sub_category' => $row['product_sub_category'],
                'link' => "/products/" . strtolower($department) . "/" . strtolower($category) . "/" . strtolower( $row['product_sub_category_']), 
                'LS_ID' => $row['LS_ID']
            ]);
        }

        return $sub_categories;
    }
}
