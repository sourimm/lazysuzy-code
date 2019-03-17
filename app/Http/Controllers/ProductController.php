<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $products = Product::get()->paginate(20);
        if ($request->ajax()) {
            return $products;
        }
        return $products;
    }

    public function productDetails(Request $request , $id)
    {
        $product = Product::find($id);
        return $product;
    }

    public function addToWishList(Request $request , ProductService $service)
    {
        $product = $service->addToWishList($request);
        return $product;
    }
}
