<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\DepartmentMapping;
use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $departments = Department::all();
        $products = Product::paginate(20);
        $categories = DepartmentMapping::get();
        $singleDepartment = Department::get_single_department($request->dept);
        $departmentName = $singleDepartment['department'];
        $listedCategories = $singleDepartment['categories'];

        if (($request->dept!=''&& $request->dept!='mirrors')&&$request->cat== '') {
            return view('pages.category', compact('departmentName', 'listedCategories'));
        }
        if ($request->ajax()) {
            return $products;
        }
        return view('pages.listing', compact('departments', 'products', 'categories'));
    }

    public function productDetails(Request $request, $id)
    {
        $product = Product::find($id);
        return $product;
    }

    public function addToWishList(Request $request, ProductService $service)
    {
        $product = $service->addToWishList($request);
        return $product;
    }

    public function getProductDepartmentWise(Request $request)
    {
        $products = Product::where('department', 'LIKE', '%' . $request->department . '%')->paginate(16);
        return $products;
    }

    public function getProductCategoryWise(Request $request)
    {
        $products = Product::where('product_category', 'LIKE', '%' . $request->category . '%')->paginate(16);
        return $products;
    }

    public function showWishList(Request $request) {
        return view('pages/wishlist');
    }

}
