<?php

namespace App\Http\Controllers\Admin;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class Dashboard extends Controller
{
    public function filter_products($dept, $cat = null, $subCat = null)
    {
        $isAdminApiCall = true;
        $data = Product::get_filter_products($dept, $cat, $subCat, $isAdminApiCall);
        
       
        foreach($data['products'] as $x => $product) {

            // set variations to null 
            unset($data['products'][$x]['variations']);


            $images = $data['products'][$x]['on_server_images'];
            $images_with_base = [];
            foreach($images as $img) {
                $images_with_base[] = [
                    'url' => $img,
                    'btag' => null
                ];
            }

            $data['products'][$x]['on_server_images'] = $images_with_base;
        }

        return $data;
    }

    public function get_product_details($sku)
    {
        return Product::get_product_details($sku);
    }
}
