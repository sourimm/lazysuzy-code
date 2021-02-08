<?php

namespace App\Models;

use App\Models\Collections;
use App\Http\Controllers\ProductController;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\DB;
use App\Models\Department;
use App\Models\Dimension;
use App\Models\Cart;

use Auth;

class Order extends Model
{
    protected $table = "master_data";
    public static $base_siteurl = 'https://www.lazysuzy.com';
	
	
	public static function get_order_history($user_id)
    {
		$head_array = [];
		$child_array = [];
		
		if($user_id>0)
		{
			
			/*$product_rows = DB::table('lz_order_delivery') 
			->where('user_id', $user_id)   						
			->select("*")
			->get();*/
			
			$product_rows_child = DB::table('lz_orders') 
			->where('user_id', $user_id)    						
			->select("*")
			->get(); 
				
			/*foreach($product_rows as $pr) {  */
			 foreach($product_rows_child as $pr) {  
				
					
				for($i = 0; $i < count($product_rows_child); $i++)
				{
				  if($product_rows_child[$i]->order_id == $pr->order_id)
				  {
					array_push($child_array,$product_rows_child[$i]);
				  }
				}
				$pr->orders = 	json_encode($child_array) ;
				array_push($head_array,$pr); 
			}
			
			$a['status']=true;
			$a['response'] = $head_array;
			
			
		}
		else{
				$a['status']=false;
				$a['msg']='Not authenticaticated User.';
		}	

		return $a;	
	}

   
  
	public static function get_order_status()
	{
			$orderid   = Input::get("orderid");
			$zipcode   = Input::get("zipcode");
			$arr = []; 
			$arrheader = []; 
			$data   = DB::table('lz_order_delivery')
						->select('shipping_f_name','shipping_l_name','shipping_address_line1','shipping_address_line2','shipping_state','shipping_zipcode','order_id','shipping_city','created_at');
			

			$is_authenticated = Auth::check();
			$user = Auth::user();return $user;
            if ($user->user_type>0) {	
					 
					$data = $data
					->where('user_id', $user->id);
			}
			else{
					if ($orderid != '' && $zipcode != ''){
						$data = $data
							->where('order_id', $orderid)
							->where('shipping_zipcode', $zipcode);
					}
				     else{
						 
							$response['status']=false;
							$response['msg']='Order Number & Zipcode both are required.';
							return $response;
					 }
					
				
			}

		
			 
			$data = $data->get(); 
			if($data!='[]'){
				$response['status']=true;
				
				foreach($data as $datasingle){ 
				   $datasingle->created_at = date("F j, Y", strtotime($datasingle->created_at));
				   
					$product_rows_child = DB::table('lz_orders') 
					->where('order_id', $datasingle->order_id)    	
					->join('master_data', 'master_data.product_sku', '=', 'lz_orders.product_sku')		
					->join('lz_inventory', 'lz_inventory.product_sku', '=', 'lz_orders.product_sku')		
					->join('lz_ship_code', 'lz_ship_code.code', '=', 'lz_inventory.ship_code')		
					->join('master_brands', 'master_brands.value', '=', 'master_data.brand')	
					->select(array('lz_orders.quantity','lz_orders.price','lz_orders.status','lz_orders.note','lz_orders.date','lz_orders.tracking','lz_orders.tracking_url','lz_inventory.ship_code','lz_ship_code.label','master_data.product_name','master_data.main_product_images as image','master_brands.name as brand_name','master_data.product_sku','lz_ship_code.label'))
					->get(); 
				
					
					foreach($product_rows_child as $pr){
					 	$pr->image =  env('APP_URL').$pr->image; 
						array_push($arr,$pr);
					
					}
					$datasingle->products = $arr;
					array_push($arrheader,$datasingle); 
					$arr = [];
					 
				}	
				
			
			}
			else{
					$response['status']=false;
					$response['msg']='No data found.';
			}
			$response['data']=$arrheader;	
		 
		
		return $response;
	}


    public static function save_product_review($data) {
		
		
		$is_authenticated = Auth::check();
			$user = Auth::user();return $data;
		
		
		if(!isset($data['user_location'])){
			$data['user_location']='null';
		}
		if(!isset($data['headline'])){
			$data['headline']='null';
		}
		if(!isset($data['review'])){
			$data['review']='null';
		}
		 $validator = null;
		 $imglist = '';
		  $error = [];
		if(array_key_exists('rimage', $data) && isset($data['rimage'])) {
			
					$upload_folder = public_path('public/images/uimg');
					for($i=0;$i<count($data['rimage']);$i++){
					$image_name = time() . '-' . Utility::generateID() . '.'. $data['rimage'][$i]->getClientOriginalExtension() ;
					$uplaod = $data['rimage'][$i]->move($upload_folder, $image_name);
					$imglist .= 'images/uimg/'.$image_name.',,';
					} 
					
					if($uplaod) {
						//$user->picture = '/uimg/' . $image_name;
						//$user->update();
					}
					else 
						$error[] = response()->json(['error' => 'image could not be uploaded. Please try again.'], 422);
		}
		 $datetime = date("Y-m-d H:i:s");
		
		/*						
			'count_helpful' => $data['count_helpful'],
			'count_reported' => $data['count_reported'],
			'source' => $data['source'],
		*/
		
		 $is_inserted = DB::table('user_reviews')
                    ->insert([
								'user_id' => $user_id,
								'product_sku' => $data['product_sku'],
								'headline' => $data['headline'],
								'review' => $data['review'],
								'rating' => $data['rating'],
								'review_images' => $imglist,
								'user_name' => $data['user_name'], 
								'user_email' => $data['user_email'],
								'user_location' => $data['user_location'],
								'status' => $data['status'],
								'submission_time' => $datetime
							]);
		if($is_inserted==1){
			$a['status']=true;
		}
		else{
			$a['status']=false;
		}
		
		$a['errors'] = $error;
	
        return $a;

     
        
    }
	
	

};
