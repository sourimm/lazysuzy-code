<?php
namespace App\Models;

use App\Models\Category;
use App\Models\SubCategory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    protected $table = "mapping_core";
    public function categories()
    {
        return $this->belongsToMany(Category::class, 'department_categories');
    }

    public static function get_all_departments()
    {
        $departments = [];
        $base_site   = request()->getHttpHost();
        $rows        = Department::select(['department', 'department_', 'LS_ID'])
            ->whereRaw('LENGTH(product_category) = 0 AND LENGTH(product_sub_category) = 0')
            ->get()
            ->toArray();
        
        $departments['all_departments'] = [];

        foreach ($rows as $row) {
            $dept       = $row['department'];
            $dept_LS_ID = $row['LS_ID'];
            $categories = Category::get_categories($row['department_']);
            array_push($departments['all_departments'], [
                'department' => $dept,
                'LS_ID'      => $dept_LS_ID,
                'link'       => '/products/'. strtolower($row['department_']),
                'categories' => $categories,
            ]);
        }

        // trending categories will return N top results. Pass N as argument.
        $departments['trending_categories'] = Category::trending_categories(5);
        $departments['trending_products'] = Product::trending_products(10);
        return $departments;
    }

    public static function get_single_department($dept)
    {
        $c_cat = [];
        $dept  = strtolower(trim($dept));
        $row   = Department::select(['department', 'LS_ID'])
            ->where('department_', $dept)
            ->whereRaw('LENGTH(product_category) = 0 AND LENGTH(product_sub_category) = 0')
            ->get()
            ->toArray();
        if (isset($row[0]['LS_ID'])) {
            $dept       = $row[0]['department'];
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

    public static function get_department_info($LS_ID) {

        $LS_IDs = explode(",", $LS_ID);
        $rows = Department::select("*")
            ->whereIn('LS_ID', $LS_IDs)
            ->get()
            ->toArray();
        
        $dept_info = [];
        foreach ($rows as $key => $value) {
            array_push($dept_info, [
                'department_name' => $value['department'],
                'department_url' => '/products/' . $value['department_'],
                'category_name' => $value['product_category'],
                'category_url' => '/products/' . $value['department_'] . '/' . $value['product_category_'],
                'sub_category_name' => $value['product_sub_category'],
                'sub_category_url' => '/products/' . $value['department_'] . '/' . $value['product_category_'] . '/' . $value['product_sub_category_'],
            ]);
        }
        return $dept_info;
    }
}
