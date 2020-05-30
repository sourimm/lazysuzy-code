<?php

namespace App\Http\Controllers\Admin;

use App\Models\Utility;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Input;

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

    public function mark_image(Request $request) {
        $image = Input::post('image');
        $sku = Input::post('product_sku');
        $type = Input::post('type');


        if(strlen($image) > 0 && strlen($sku) > 0 
            && in_array($type, config('admin.image_process'))) {

                $image_process_columns = config('admin.image_process_columns');
                $image_process_folders = config('admin.image_process_folders');
              
                // incomming image will have domain name at the starting
                // we'll have to remove the domain name
                $image =  str_replace(env('APP_URL'), "", $image);
                // construct the new location path 
                $image_path_elements =  explode("/", $image);
                $image_path_elements[2] = $image_process_folders[$type]; // new folder

                $image_name = explode(".", $image_path_elements[3]);
                $new_image_name = $image_name[0] . "_" . $image_process_folders[$type];
                $image_name[0] = $new_image_name;
                
                $new_image_name = implode(".", $image_name);
                $image_path_elements[3] = $new_image_name;
                $new_image_path = implode("/", $image_path_elements);

                $image = public_path() . $image;
                $new_image_path = public_path() . $new_image_path; 

                $image_folder = public_path() . "/" . $image_path_elements[1] . "/" . $image_path_elements[2];
              
                // if folder not exists make folder
                if(!File::exists($image_folder))
                    File::makeDirectory($image_folder);
                
                // if file noe exists make file
                if(!File::exists($new_image_path))
                    File::copy($image, $new_image_path);
                
                if(File::exists($new_image_path)) {
                    $db_path = str_replace(public_path(), "", $new_image_name);
                    return [
                        'status' => (bool) Product::mark_image($sku, $db_path, $image_process_columns[$type]),
                        'image' => $db_path
                    ];
                }
                
            }
            else {
                return response()->json([
                    'message' => 'Unprocessable Entity',
                    'params' => $request->all()
                ], 422);
            }
    }
}
