<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Variations;
use Illuminate\Http\Request;
use App\Models\Wishlist;
use App\Models\Brands;
use App\Models\Subscribe;
use App\Models\Department;
use App\Models\User;

use Auth;
use Subscribe as GlobalSubscribe;

class API extends Controller
{
    public function index(Request $request)
    {
        return false;
    }

    public function get_user() 
    {
        return [
            "auth" => [
                "is_user" => Auth::check(),
                "id" => Auth::check() ? Auth::user()->id : null,
                "user" => Auth::user()

            ]
        ];
    }
    
    public function login_user() {
        return User::login();
    }
    public function getProducts($dept, $cat = null)
    {
        return Product::get_department_products($dept, $cat);
    }

    public function filter_products($dept, $cat = null, $subCat = null)
    {
        return Product::get_filter_products($dept, $cat, $subCat);
    }
   
    public function get_product_details($sku)
    {
        return Product::get_product_details($sku);
    }

    public function get_product_variations($sku)
    {
        return Variations::get_variations($sku);
    }

    public function get_swatch_filter($sku)
    {
        return Variations::get_swatch_filter($sku);
    }

    public function mark_favourite($sku)
    {
        return Wishlist::mark_favourite_product($sku);
    }

    public function unmark_favourite($sku)
    {
        return Wishlist::unmark_favourite_product($sku);
    }

    public function get_wishlist()
    {
        return Wishlist::get_whishlist();
    }

    public function get_all_brands($key = null) {
        return Brands::get_all($key);
    }

    public function subscribe_user() {
        return Subscribe::subscribe_user();
    }

    public function get_categories($dept_url_name) {
        return Department::get_single_department($dept_url_name);
    }

    public function get_banners() {
        return Brands::get_banners();
    }
}
