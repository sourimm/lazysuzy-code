<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\DepartmentMapping;
use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Http\Request;

class PdpController extends Controller
{
    public function index(Request $request)
    {
        return view('pages.detailspage');
    }

}
