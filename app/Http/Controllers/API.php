<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

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

}
