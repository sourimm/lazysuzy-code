<?php

namespace App\Models;

use App\Models\Category;
use App\Models\SubCategory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    protected $table = "mapping_core";
    public static $base_siteurl = "https://www.lazysuzy.com";
    public function categories()
    {
        return $this->belongsToMany(Category::class, 'dept_name_urlcategories');
    }

    public static function get_all_departments($dept_name_urlapi = true)
    {
        $departments = [];
        $base_site   = request()->getHttpHost();
        $rows        = Department::select(['dept_name_long', 'dept_name_url', 'LS_ID', 'dept_name_short'])
            ->whereRaw('LENGTH(cat_name_short) = 0 AND LENGTH(cat_sub_name) = 0')
            ->get()
            ->toArray();

        $departments['all_departments'] = [];

        foreach ($rows as $row) {
            $dept       = $row['dept_name_short'];
            $dept_LS_ID = $row['LS_ID'];
            $categories = Category::get_categories($row['dept_name_short']);
            array_push($departments['all_departments'], [
                'department' => $dept,
                'LS_ID'      => $dept_LS_ID,
                'link'       => '/products/' . strtolower($row['dept_name_url']),
                'categories' => $categories,
            ]);
        }

        if ($dept_name_urlapi) {
            // trending categories will return N top results. Pass N as argument.
            $departments['trending_categories'] = Category::trending_categories(5);
            $departments['trending_products'] = Product::trending_products(10);
        }
        return $departments;
    }

    public static function j($dept)
    {
        $c_cat = [];
        $dept  = strtolower(trim($dept));
        $row   = Department::select(['dept_name_long', 'LS_ID'])
            ->where('dept_name_url', $dept)
            ->whereRaw('LENGTH(cat_name_long) = 0 AND LENGTH(cat_sub_name) = 0')
            ->get()
            ->toArray();
        if (isset($row[0]['LS_ID'])) {
            $dept       = $row[0]['dept_name_long'];
            $dept_LS_ID = $row[0]['LS_ID'];
        } else {
            return null;
        }
        $categories = Category::get_categories($dept);
        foreach ($categories as $category) {
            $sub_categories = SubCategory::getSubCategories($dept, $category['category']);
            array_push($c_cat, [
                'category'       => $category['category'],
                'LS_ID'          => $category['LS_ID'],
                'image'          => $category['image'],
                'link'          => $category['link'],
                'sub_categories' => $sub_categories,
            ]);
        }
        return [
            'dept_name_long' => $dept,
            'LS_ID'      => $dept_LS_ID,
            'categories'  => $c_cat,
        ];
    }

    public static function get_dept_name_urlinfo($LS_ID)
    {

        $LS_IDs = explode(",", $LS_ID);
        $rows = Department::select("*")
            ->whereIn('LS_ID', $LS_IDs)
            ->get()
            ->toArray();

        $dept_info = [];
        foreach ($rows as $key => $value) {
            array_push($dept_info, [
                'dept_name_urlname' => $value['dept_name_long'],
                'dept_name_urlurl' => '/products/' . $value['dept_name_url'],
                'category_name' => $value['cat_name_long'],
                'category_url' => '/products/' . $value['dept_name_url'] . '/' . $value['cat_name_long_'],
                'sub_category_name' => $value['cat_sub_name'],
                'sub_category_url' => '/products/' . $value['dept_name_url'] . '/' . $value['cat_name_long_'] . '/' . $value['cat_sub_name_'],
            ]);
        }
        return $dept_info;
    }

    public static function get_single_department($dept)
    {
        $c_cat = [];
        $dept  = strtolower(trim($dept));
        $row   = Department::select(['dept_name_short', 'LS_ID'])
            ->where('dept_name_url', $dept)
            ->whereRaw('LENGTH(cat_name_long) = 0 AND LENGTH(cat_sub_name) = 0')
            ->get()
            ->toArray();
        if (isset($row[0]['LS_ID'])) {
            $dept       = $row[0]['dept_name_short'];
            $dept_LS_ID = $row[0]['LS_ID'];
        } else {
            return null;
        }
        $categories = Category::get_categories($dept);
        foreach ($categories as $category) {
            $sub_categories = SubCategory::getSubCategories($dept, $category['category']);
            array_push($c_cat, [
                'category'       => $category['category'],
                'LS_ID'          => $category['LS_ID'],
                'image'          => $category['image'],
                'link'          => $category['link'],
                'sub_categories' => $sub_categories,
            ]);
        }
        return [
            'department' => $dept,
            'LS_ID'      => $dept_LS_ID,
            'categories'  => $c_cat,
        ];
    }


    public static function get_board_categories()
    {
        $cols = ["LS_ID", "dept_name_url", "cat_name_long_", "filter_label"];
        $rows = Department::select($cols)
            ->where("board_view", 1)
            ->get()
            ->toArray();

        $categories = [];
        foreach ($rows as $row) {
            array_push($categories, [
                'category' => $row['filter_label'],
                'LS_ID' => $row['LS_ID'],
                'link' => '/products/' . $row['dept_name_url'] . '/' . $row['cat_name_long_']
            ]);
        }

        return $categories;
    }
}
