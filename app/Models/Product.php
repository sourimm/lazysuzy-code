<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;

class Product extends Model
{
    protected $table = "master_data";

    public static function get_LS_IDs($department, $category = null)
    {
        $LS_IDs = [];

        if (null == $category) {
            $data = DB::table('mapping_core')
                ->select('LS_ID')
                ->where('department_', $department)
                ->get();

            // var_dump($data);
            foreach ($data as $key => $val) {
                array_push($LS_IDs, $val->LS_ID);
            }
            // echo " < pre > " . print_r($LS_IDs, TRUE);
        } else {
            $data = DB::table("mapping_core")
                ->select('LS_ID')
                ->where(['department_' => $department, 'product_category_' => $category])
                ->get();

            // var_dump($data);
            foreach ($data as $key => $val) {
                array_push($LS_IDs, $val->LS_ID);
            }
            //echo " < pre > " . print_r($LS_IDs, TRUE);
        }

        return $LS_IDs;
    }

    public static function get_department_products($department, $category = null)
    {
        $perPage = 20;
        if (Input::get("page") > 0) {
            $start = ceil(Input::get("page") * $perPage);
            if (null == $category) {
                $query = DB::table("master_data")
                    ->whereRaw('LS_ID REGEXP "' . implode("|", Product::get_LS_IDs($department)) . '"')
                    ->offset($start)
                    ->limit($perPage);
            } else {
                $query = DB::table("master_data")
                    ->whereRaw('LS_ID REGEXP "' . implode("|", Product::get_LS_IDs($department)) . '"')
                    ->offset($start)
                    ->limit($perPage);
            }

            $products = $query->get();
            //$result           = $this->load->view('user/ajax_products', $data);

            echo "<pre>" . print_r($products, true);
        } else {

            if (null == $category) {
                $query = DB::table("master_data")
                    ->whereRaw('LS_ID REGEXP "' . implode("|", Product::get_LS_IDs($department)) . '"')
                    ->limit(20);
            } else {
                $query = DB::table("master_data")
                    ->whereRaw('LS_ID REGEXP "' . implode("|", Product::get_LS_IDs($department)) . '"')
                    ->limit(20);
            }

            $products = $query->get();

            echo "<pre>" . print_r($products, true);
        }
    }
}
