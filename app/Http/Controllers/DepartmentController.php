<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(Department::get_all_Departments());
    }

    public function get_department($dept)
    {
        return response()->json(Department::get_single_department($dept));
    }
}
