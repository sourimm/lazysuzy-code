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
                ->where('department_', $department)
                ->where('product_category_', $category)
                ->get();

            // var_dump($data);
            foreach ($data as $key => $val) {
                array_push($LS_IDs, $val->LS_ID);
            }
        }

        return $LS_IDs;
    }

    public static function get_department_products($department, $category = null)
    {
        $perPage = 20;
        $p_send  = [];

        if (Input::get("page") > 0) {
            $start = ceil(Input::get("page") * $perPage);
            if (null == $category) {
                $query = DB::table("master_data")
                    ->whereRaw('LS_ID REGEXP "' . implode("|", Product::get_LS_IDs($department)) . '"')
                    ->offset($start)
                    ->limit($perPage);
            } else {
                $query = DB::table("master_data")
                    ->whereRaw('LS_ID REGEXP "' . implode("|", Product::get_LS_IDs($department, $category)) . '"')
                    ->offset($start)
                    ->limit($perPage);
            }

            //$result           = $this->load->view('user/ajax_products', $data);
        } else {

            if (null == $category) {
                $query = DB::table("master_data")
                    ->whereRaw('LS_ID REGEXP "' . implode("|", Product::get_LS_IDs($department)) . '"')
                    ->limit(20);
            } else {
                $query = DB::table("master_data")
                    ->whereRaw('LS_ID REGEXP "' . implode("|", Product::get_LS_IDs($department, $category)) . '"')
                    ->limit(20);
            }
        }

        $products = $query->get()->toArray();
        foreach ($products as $product) {
            array_push($p_send, [
                'id'               => $product->id,
                'sku'              => $product->product_sku,
                'sku_hash'         => $product->sku_hash,
                'site'             => $product->site_name,
                'name'             => $product->product_name,
                'product_url'      => $product->product_url,
                'is_price'         => $product->price,
                'model_code'       => $product->model_code,
                'description'      => $product->product_description,
                'thumb'            => explode("\n", $product->thumb),
                'color'            => $product->color,
                'images'           => explode(",", $product->images),
                'was_price'        => $product->was_price,
                'features'         => explode("<br>", $product->product_feature),
                'collection'       => $product->collection,
                'set'              => $product->product_set,
                'condition'        => $product->product_condition,
                'created_date'     => $product->created_date,
                'updated_date'     => $product->updated_date,
                'on_server_images' => explode(",", $product->product_images),
                'main_image'       => $product->main_product_images,
                'reviews'          => $product->reviews,
                'rating'           => $product->rating,
                'LS_ID'            => $product->LS_ID,

            ]);
        }

//echo "<pre>" . print_r($products, true);
        return $p_send;
    }
};
