<?php

namespace App\Models;

use App\Models\Collections;
use App\Http\Controllers\ProductController;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\DB;

use Auth;

class ProductCategory extends Model
{
  
    public static $base_siteurl = 'https://www.lazysuzy.com';

    public static function get_dept_list()
    {

        $arr = [];
        $rows = DB::table("mapping_core")
            ->select(['dept_name_long', 'dept_name_short', 'dept_name_url'])
			->distinct('dept_name_short') 
			->orderBy('dept_name_long','ASC')
            ->get();

        foreach ($rows as $product) {
            array_push($arr, $product);
        }

        return $arr;
    }

   
	
 


};
