<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;
use Validator;
use Auth;

class Review extends Model
{
  
	
	public static function save_product_review($data,$user_id) {
		
		 $validator = null;
		 $imglist = '';
		  $error = [];
		if(array_key_exists('rimage', $data) && isset($data['rimage'])) {
			/*	$validator = Validator::make($data, [
			  'rimage' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
			]);*/
			
			/*if ($validator->fails())
			  $error[] = response()->json(['error' => $validator->errors()], 422);
			else {*/
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
				//}
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
								'rating' => $data['rating'],
								'submission_time' => date("Y-m-d H:i:s")
							]);

      // sent in the request is updated
      return [
        'errors' => $error, 
       // 'user' => Auth::user()
      ];

     
        
    }
	
	 public static function get_product_review($sku,$limit){ 
		$all_reviews = [];
		$highest_reviews = [];
		$lowest_reviews = [];
		$reviews = [];
		
        $rows = DB::table("master_reviews")
            ->select("*")
            ->where('product_sku', '=', $sku)
			->where('status', '2')
            ->orderBy("id", "DESC")
			 ->limit($limit)
            ->get(); 
			
		foreach ($rows as $row){
            array_push($all_reviews, $row);
	    }
		 
        $rows = DB::table("master_reviews")
            ->select("*")
            ->where('product_sku', '=', $sku)
			->where('status', '2')
            ->orderBy("rating", "DESC")
			 ->limit($limit)
            ->get(); 
			
		foreach ($rows as $row){
            array_push($highest_reviews, $row);
	    }
		
		
        $rows = DB::table("master_reviews")
            ->select("*")
            ->where('product_sku', '=', $sku)
			->where('status', '2')
             ->orderBy("rating", "ASC")
			 ->limit($limit)
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
	
	   public static function get_all_review($sku)
    {
        $perPage = 24; 
        $RATING_ASC = "rating_low_to_high";
        $RATING_DESC = "rating_high_to_low"; 

        $sort_type_filter = [
            
            [
                "name" => "Rating: Low to High",
                "value" => $RATING_ASC,
                "enabled" => false
            ],
            [
                "name" => "Rating: High to Low",
                "value" => $RATING_DESC,
                "enabled" => false
            ]

        ];

        // getting all the extra params from URL to parse applied filters
        $page_num    = Input::get("pageno");
        $limit       = Input::get("limit");
        $sort_type   = Input::get("sort_type");

        $all_filters = [];
        $query       = DB::table('master_reviews')->where('product_sku', '=', $sku)->where('status', '2');

        if (isset($sort_type)) {
            for ($i = 0; $i < sizeof($sort_type_filter); $i++) {
                if ($sort_type_filter[$i]['value'] == $sort_type) {
                    $sort_type_filter[$i]['enabled'] = true;
                }
            }
        }

        $all_filters['sort_type'] = $sort_type_filter;
        if (!isset($limit)) {
            $limit = $perPage;
        }

        $start = $page_num * $limit;

        // 7. sort_type
        if (isset($sort_type)) {

            if ($sort_type == $RATING_ASC) {
                $query = $query->orderBy('rating', 'asc');
            } else if ($sort_type == $RATING_DESC) {
                $query = $query->orderBy('rating', 'desc');
            }else {
                $query = $query->orderBy('id', 'desc');
            }
        }
        else { 
                $query = $query->orderBy('id', 'desc');
        }

     


        // 6. limit
        $all_filters['limit'] = $limit;
        $all_filters['count_all'] = $query->count();
        $query = $query->offset($start)->limit($limit);
		$query = $query->get();
        echo $query->toSql();
        print_r($query->getBindings());
        die(); 
		
		foreach ($query as $row){
            array_push($all_reviews, $row);
	    } 
		
		return $all_reviews; 
       
       // $a = Product::get_product_obj($query->get(), $all_filters, $sku);

        // add debug params to test quickly
       // $a['a'] = Utility::get_sql_raw($query);
     //   return $a;
    }

  
   
}
