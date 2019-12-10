<?php
namespace App\Models;

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
}