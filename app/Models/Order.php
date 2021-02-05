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

   
  
	public static function get_order_status($user_id)
	{
		$orderid   = Input::get("orderid");
		$zipcode   = Input::get("zipcode");
		$arr = []; 
			
		if($user_id>0)
		{
			$data   = DB::table('lz_order_delivery')
						->select('shipping_f_name','shipping_l_name','shipping_address_line1','shipping_address_line2','shipping_state','shipping_zipcode','order_id')
						->where('user_id', $user_id)   ;
						

			if ($orderid != '') { 
				$data = $data
					->where('order_id', $orderid);
			} 
			if ($zipcode != '') { 
				$data = $data
					->where('shipping_zipcode', $zipcode);
			}
			 
			$data = $data->get(); 
			if($data!='[]'){
				$response['status']=true;
				$response['header']=$data; 
				
				foreach($data as $datasingle){ 
				/*	$product_rows_child = DB::table('lz_orders') 
					->where('order_id', $datasingle->order_id)    	
					->join('master_data', 'master_data.product_sku', '=', 'lz_orders.product_sku')		
					->join('lz_inventory', 'lz_inventory.product_sku', '=', 'lz_orders.product_sku')		
					->join('lz_ship_code', 'lz_ship_code.code', '=', 'lz_inventory.ship_code')		
					->join('master_brands', 'master_brands.value', '=', 'master_data.brand')	
					->select(array('lz_orders.quantity','lz_orders.price','lz_orders.status','lz_orders.note','lz_orders.date','lz_orders.tracking','lz_inventory.ship_code','lz_ship_code.label','master_data.product_name','master_data.main_product_images as image','master_brands.name as brand_name','master_data.product_sku','lz_ship_code.label'))
					->get(); */
					
					$product_rows_child = DB::table('lz_orders') 
					->where('order_id', $datasingle->order_id)   
					->join('master_data', 'master_data.product_sku', '=', 'lz_orders.product_sku')						
					->select(array('lz_orders.quantity','lz_orders.price','lz_orders.status','lz_orders.note','lz_orders.date','lz_orders.tracking','master_data.product_name','master_data.main_product_images as image','master_brands.name as brand_name','master_data.product_sku'))
					->get(); 
					
					foreach($product_rows_child as $pr){
					//	$pr->image =  env('APP_URL').$pr->image; 
						array_push($arr,$pr);
					
					}
					$response['details'][$datasingle->order_id]=$arr;
					$arr = [];
					 
				}	
				
			
			}
			else{
					$response['status']=false;
					$response['msg']='No data found.';
			}
				
		}
		else{
				$response['status']=false;
				$response['msg']='Not authenticaticated User.';
		}
		
		return $response;
	}		

};
