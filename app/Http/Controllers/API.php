<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Whislist;
use App\Models\Variations;
use Illuminate\Http\Request;
use App\Models\Wishlist;

class API extends Controller
{
    public function index(Request $request)
    {
        return false;
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

    public function mark_favourite($sku)
    {
        return Wishlist::mark_favourite_product($sku);
    }

    public function unmark_favourite($sku)
    {
        return Wishlist::unmark_favourite_product($sku);
    }

    public function get_wishlist() {
        return Wishlist::get_whishlist();
    }
}
