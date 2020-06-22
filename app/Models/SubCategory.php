<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class SubCategory extends Model
{
    protected $table = "mapping_core";

    public static function get_sub_categories($department, $category)
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

    /**
     * This will take catgeory LS_ID and output an array of 
     * sub-category LS_IDs included in the catgeory
     *
     * @param [type] $cat_LS_ID
     * @return void
     */
    public static function get_sub_cat_LSIDs($cat_LS_IDs) 
    {
        $LS_IDs = [];
        // we'll have to get the cat_name_url value because then only we can
        // search for sub-categories
        // SELECT * FROM mapping_core WHERE cat_name_long =  (SELECT cat_name_url FROM mapping_core WHERE LS_ID = '210');

        // checking for wrong input, because we're going ot use 
        // this input directly in the query, there is some scope of 
        // security flaws
        for ($i = 0; $i < sizeof($cat_LS_IDs); $i++) {
            if(!is_numeric($cat_LS_IDs[$i])) return null;
            else $cat_LS_IDs[$i] = '\'' . $cat_LS_IDs[$i] . '\'';
        }

        $LS_ID_string = implode(",", $cat_LS_IDs);
        $LS_ID_string  = '(' . $LS_ID_string . ')';
        $rows = DB::select( DB::raw("SELECT LS_ID FROM mapping_core WHERE cat_name_long in (SELECT cat_name_long FROM mapping_core WHERE LS_ID in $LS_ID_string) AND LS_ID NOT IN $LS_ID_string") );
        
        foreach ($rows as $r) {
            $LS_IDs[] = $r->LS_ID;
        }

        return $LS_IDs;
    }
}
