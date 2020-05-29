<?php

namespace App\Http\Controllers\Admin;

use App\Models\Utility;
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
            $xbg_primary = $data['products'][$x]['xbg_primary'];
            $xbg_secondary = $data['products'][$x]['xbg_secondary'];

            // image names without extension
            $xbg_primary = Utility::get_core_image_name($xbg_primary);
            $xbg_secondary = Utility::get_core_image_name($xbg_secondary);

            foreach($images as $img) {
                $btag = null;
                $image_name = explode("/", $img);
                $image_name = end($image_name);

                // image name without the extension
                $image_name = current(explode(".", $image_name));
                
                if($xbg_primary == $image_name) $btag = 'primary';
                else if($xbg_secondary == $image_name) $btag = 'secondary';

                $images_with_base[] = [
                    'url' => $img,
                    'btag' => $btag
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
