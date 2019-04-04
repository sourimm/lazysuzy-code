<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $products = Product::paginate(20);
        if ($request->ajax()) {
            return $products;
        }
        return view('products');
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

    public function getProductDepartmentWise(Request $request)
    {
        $products = Product::where('department','LIKE', '%'.$request->department.'%')->paginate(16);
        return $products;
    }

    public function getProductCategoryWise(Request $request)
    {
        $products = Product::where('product_category','LIKE', '%'.$request->category.'%')->paginate(16);
        return $products;
    }

}
