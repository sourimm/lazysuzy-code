<?php
namespace App\Models;

use App\Models\Utility;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

class Brands extends Model
{
    protected $table = "master_brands";
    public static $base_site_url = "https://www.lazysuzy.com";

    public static function get_all($key) {
        $rows = Brands::select("*");

        if ($key !== null) $rows = $rows->where("value", $key);

        $rows = $rows->get()
            ->toArray();;

        $brands = [];

        foreach($rows as $row) {
            array_push($brands, [
                'name' => $row['name'],
                'value' => $row['value'],
                'logo' => Brands::$base_site_url . $row['logo'],
                'url' => $row['url'],
                'description' => $row['description'],
                'cover_image' => $row['cover_image'],
            ]);
        }

        return $brands;

    }

    public static function get_banners() {
        
        $banners = [];
        $rows = DB::table("site_banners")
                    ->select("*")
                    ->where("is_active", 1)
                    ->get();

        $agent = $_SERVER['HTTP_USER_AGENT'];
        
        if (Utility::is_mobile($agent)) {
            $image_col = "image_mobile";
        }
        else {
            $image_col = "image";
        }

        foreach($rows as $row) {
            
            array_push($banners, [
                "name" => $row->name,
                "image" => Brands::$base_site_url . $row->$image_col,
                "link" => Brands::$base_site_url . $row->url
            ]);
        }
        
        return $banners;
    }
}
