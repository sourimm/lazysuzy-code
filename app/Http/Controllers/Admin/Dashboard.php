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
            $xbg_primary = $data['products'][$x]['xbg_primary'];
            $xbg_secondary = $data['products'][$x]['xbg_secondary'];

            // image names without extension
            $xbg_primary = explode("/", $xbg_primary);
            $xbg_primary = end($xbg_primary);
            $xbg_primary = current(explode(".", $xbg_primary));

            $xbg_secondary = explode("/", $xbg_secondary);
            $xbg_secondary = end($xbg_secondary);
            $xbg_secondary = current(explode(".", $xbg_secondary));

            foreach($images as $img) {
                $btag = null;
                $image_name = explode("/", $img);
                $image_name = end($image_name);

                // image name without the extension
                $image_name = current(explode(".", $image_name));
                
                if(strpos($xbg_primary, $image_name) !== false) $btag = 'primary';
                else if(strpos($xbg_secondary, $image_name) !== false) $btag = 'secondary';

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
