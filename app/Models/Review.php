<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;
use Auth;

class Review extends Model
{
  
	
	public static function save_product_review($request, $data,$user_id) {
		
		 $validator = null;
		 $imglist = '';
		if(array_key_exists('rimage', $data) && isset($data['rimage'])) {
			
			$upload_folder = public_path('uimg');
			for($i=0;$i<count($data['rimage']);$i++){
			$image_name = time() . '-' . Utility::generateID() . '.'. $data['rimage'][$i]->getClientOriginalExtension() ;
			$uplaod = $data['rimage'][$i]->move($upload_folder, $image_name);
			$imglist .= $image_name.',,';
			} 
			
			if($uplaod) {
				//$user->picture = '/uimg/' . $image_name;
				//$user->update();
			}
			else 
				$error[] = response()->json(['error' => 'image could not be uploaded. Please try again.'], 422);
		}
		
		
		 $is_inserted = DB::table('master_reviews')
                    ->insert([
								'user_id' => $user_id,
								'product_sku' => $data['product_sku'],
								'user_name' => $data['user_name'],
								'user_email' => $data['user_email'],
								'user_location' => $data['user_location'],
								'review_images' => $imglist,
								'status' => $data['status'],
								'count_helpful' => $data['count_helpful'],
								'count_reported' => $data['count_reported'],
								'source' => $data['source'],
								'headline' => $data['headline'],
								'review' => $data['review'],
								'rating' => $data['rating']
							]);

      // sent in the request is updated
      $error = [];

     
        
    }
	
	 public static function get_product_review($sku){
		 
		$all_reviews = [];
		$highest_reviews = [];
		$lowest_reviews = [];
		$reviews = [];
		
        $rows = DB::table("master_reviews")
            ->select("*")
            ->where('product_sku', '=', $sku)
			->where('status', '2')
            ->orderBy("id", "DESC")
			 ->limit(6)
            ->get(); 
			
		foreach ($rows as $row){
            array_push($all_reviews, $row);
	    }
		 
        $rows = DB::table("master_reviews")
            ->select("*")
            ->where('product_sku', '=', $sku)
			->where('status', '2')
            ->orderBy("rating", "DESC")
			 ->limit(6)
            ->get(); 
			
		foreach ($rows as $row){
            array_push($highest_reviews, $row);
	    }
		
		
        $rows = DB::table("master_reviews")
            ->select("*")
            ->where('product_sku', '=', $sku)
			->where('status', '2')
             ->orderBy("rating", "ASC")
			 ->limit(6)
            ->get(); 
			
		foreach ($rows as $row){
            array_push($lowest_reviews, $row);
	    } 
	  
		 $count_rating = DB::table('master_reviews')->where('product_sku', '=', $sku)->where('status', '2')->count();	
			
		//print_r($count2);
		$tot_rating = DB::table('master_reviews')->where('product_sku', '=', $sku)->where('status', '2')->sum('rating');
		//print_r('rat='.$count2);
		
		$reviews['all_reviews']= $all_reviews;
		$reviews['highest_reviews']= $highest_reviews;
		$reviews['lowest_reviews']= $lowest_reviews;
		$reviews['count_rating']= $count_rating;
		$reviews['tot_rating']= $tot_rating;
		
        return $reviews; 
	 
	 }
	
	
   
}
