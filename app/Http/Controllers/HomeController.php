<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $departments = Department::get();
        return view('homepage' , compact('departments'));
    }
}
