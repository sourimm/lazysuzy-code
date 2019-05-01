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

        $rows = Department::select(['department', 'LS_ID'])
            ->whereRaw('LENGTH(product_category) = 0 AND LENGTH(product_sub_category) = 0')
            ->get()
            ->toArray();

        foreach ($rows as $row) {
            $department = [];
            $dept       = $row['department'];
            $dept_LS_ID = $row['LS_ID'];

            $categories = Category::get_categories($dept);
            array_push($department, [
                'department' => $dept,
                'LS_ID'      => $dept_LS_ID,
                'categories' => $categories,
            ]);
            array_push($departments, $department);
        }

        return $departments;
    }

    public static function get_single_department($dept)
    {
        $c_cat = [];

        $dept = strtolower(trim($dept));
        $row  = Department::select(['department', 'LS_ID'])
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
                'sub_categories' => $sub_categories,
            ]);
        }

        return [
            'department' => $dept,
            'LS_ID'      => $dept_LS_ID,
            'catgories'  => $c_cat,
        ];
    }
}
