<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;
use Auth;

class Review extends Model
{
  
	
	public static function save_product_review($data,$user_id) {
     // $data = $request->all();  'rating' => $data['rating'],
      $validator = null;
    
	  
	     $is_inserted = DB::table('master_reviews')
                    ->insert([
								'user_id' => $user_id,
								'product_sku' => $data['product_sku'],
								'user_name' => $data['user_name'],
								'user_email' => $data['user_email'],
								'user_location' => $data['user_location'],
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



      /*if(array_key_exists('image', $data)
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
      }*/
      
      return [
        'errors' => $error, 
        'user' => Auth::user()
      ];
        
    }
	
	 public static function get_product_review($sku){
		 
		$all_reviews = [];
		$highest_reviews = [];
		$lowest_reviews = [];
		$reviews = [];
		
        $rows = DB::table("master_reviews")
            ->select("*")
            ->where('product_sku', '=', $sku)
            ->orderBy("id", "DESC")
			 ->limit(6)
            ->get(); 
			
		foreach ($rows as $row){
            array_push($all_reviews, $row);
	    }
		 
        $rows = DB::table("master_reviews")
            ->select("*")
            ->where('product_sku', '=', $sku)
            ->orderBy("rating", "DESC")
			 ->limit(6)
            ->get(); 
			
		foreach ($rows as $row){
            array_push($highest_reviews, $row);
	    }
		
		
        $rows = DB::table("master_reviews")
            ->select("*")
            ->where('product_sku', '=', $sku)
             ->orderBy("rating", "ASC")
			 ->limit(6)
            ->get(); 
			
		foreach ($rows as $row){
            array_push($lowest_reviews, $row);
	    } 
		
		$row_cnt = DB::table("master_reviews")
            ->select("COUNT(*) as cnt")
            ->where('product_sku', '=', $sku)
            ->get(); 
		print_r($row_cnt);
		$tot_rating = DB::table('master_reviews')->sum('raing')->where('product_sku' '=' $sku);
		
		$reviews['all_reviews']= $all_reviews;
		$reviews['highest_reviews']= $highest_reviews;
		$reviews['lowest_reviews']= $lowest_reviews;
		$reviews['tot_rating']= $tot_rating;
		//$reviews['tot_rating']= $tot_rating;
		
        return $reviews; 
	 
	 }
	
	
   
}
