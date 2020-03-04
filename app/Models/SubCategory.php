<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubCategory extends Model
{
    protected $table = "mapping_core";

    public static function getSubCategories($department, $category)
    {
        $sub_categories = [];
        $rows = SubCategory::select(['cat_sub_name', 'LS_ID', 'cat_sub_url']);

        if ($department != "all")
            $rows = $rows->where('dept_name_short', $department);
        
        $rows = $rows->where('cat_name_url', $category)
            ->whereRaw('LENGTH(cat_sub_name) != 0')
            ->get()
            ->toArray();

        foreach ($rows as $row) {
            array_push($sub_categories, [
                'sub_category' => $row['cat_sub_name'],
                'link' => "/products/" . strtolower($department) . "/" . strtolower($category) . "/" . strtolower( $row['cat_sub_url']), 
                'LS_ID' => $row['LS_ID']
            ]);
        }
        return $sub_categories;
    }
}
