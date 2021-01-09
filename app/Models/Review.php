<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;
use Auth;

class Review extends Model
{
   /* public static function get_review($is_board_view = false)
    {
        if (Auth::check()) {
            $user = Auth::user();
            $products = DB::table("user_wishlists")
                ->join("master_data", "master_data.product_sku", "=", "user_wishlists.product_id")
                ->join("master_brands", "master_data.site_name", "=", "master_brands.value");

            if ($is_board_view)
                $products->where("master_data.image_xbg_processed", 1);

            $products = $products->where("user_wishlists.user_id", $user->id)
                ->where("user_wishlists.is_active", 1)
                ->get()->toArray();

            $products_structured = [];
            foreach ((object) $products as $prod) {
                $variations = Product::get_variations($prod, null, true);

                // inject inventory details
                $product_inventory_details = Inventory::get_product_from_inventory($user, $prod->product_sku);
                $prod = (object) array_merge($product_inventory_details, (array) $prod);

                array_push($products_structured, Product::get_details($prod, $variations, true, true));
            }

            return [
                "products" => $products_structured
            ];
        }
    }
    
	
	*/
	public static function save_product_review(Request $request)
    {
		
		 $data = $request->all(); dd($data); 
        /*$result = [];
        $result["status"] = 0;

        if (Auth::check()) {
            $result["type"] = "permanent";

            $user = Auth::user();
            $wishlist_product_count = DB::table("user_wishlists")
                ->where("user_id", $user->id)
                ->where("product_id", $sku)
                ->get();

            if (count($wishlist_product_count) == 0) {
                $id = DB::table("user_wishlists")
                    ->insertGetId([
                        "user_id" => $user->id,
                        "product_id" => $sku
                    ]);

                if ($id != null) {
                    $result["status"] = 1;
                    $result["msg"] = "Product marked favourite successfully";
                }
            } else {

                // update is_active to 1 by default
                DB::table("user_wishlists")
                    ->where("user_id", $user->id)
                    ->where("product_id", $sku)
                    ->update(["is_active" => 1]);
                $result["msg"] = "Product already marked favourite";
            }
        } else {
            $result["type"] = "temporary";
            // handle no login requests
        }

        return $result;*/
    }
	
	
	public function details_update(Request $request) {
      $data = $request->all();
      $validator = null;
      $user = Auth::user(); // get the user


      // allow users to save empty values in the following fields
      // update info if request has the attrs
      if(array_key_exists('description', $data) 
        && (isset($data['description']) || strlen($data['description']) == 0))
        $user->description = $data['description'];
      
      if (array_key_exists('location', $data) 
        && (isset($data['location']) || strlen($data['location']) == 0))
        $user->location = $data['location'];
      
      if (array_key_exists('tag_line', $data)
        && (isset($data['tag_line']) || strlen($data['tag_line']) == 0))
        $user->tag_line = $data['tag_line'];
      
      // update data once that does not require validation
      $user->update();

      // validated data will be updated seperately so that if 
      // any data fails the validation all the other info 
      // sent in the request is updated
      $error = [];
      if (array_key_exists('website', $data)
          && (isset($data['website']) || strlen($data['website']) == 0)) {
          
          $user->website = $data['website'];
          $user->update();
        
      }

      if (array_key_exists('username', $data)
          && (isset($data['username']) && strlen($data['username']) > 0)) {
        $validator = Validator::make($data, [
          'username' => 'unique:users|alpha_dash'
        ]);

        if ($validator->fails())
          $error[] = response()->json(['error' => $validator->errors()], 422);
        else {
          $user->username = $data['username'];
          $user->update();
        }
      }

      if(array_key_exists('image', $data)
        && isset($data['image'])) {
        $validator = Validator::make($data, [
          'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validator->fails())
          $error[] = response()->json(['error' => $validator->errors()], 422);
        else {
          // uplaod image
          $upload_folder = public_path('uimg');
          $image_name = time() . '-' . Utility::generateID() . '.' . request()->image->getClientOriginalExtension();
          $uplaod = request()->image->move($upload_folder, $image_name);

          if($uplaod) {
            $user->picture = '/uimg/' . $image_name;
            $user->update();
          }
          else 
            $error[] = response()->json(['error' => 'image could not be uploaded. Please try again.'], 422);
         
        }
      }
      
      return [
        'errors' => $error, 
        'user' => Auth::user()
      ];
        
    }
   
}
