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
     print_r($_FILES["file"]);
     
        
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
