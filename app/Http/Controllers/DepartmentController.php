<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;


class DepartmentController extends Controller
{
    public function index(Request $request)
    {
        $is_board_view = INPUT::get("board-view");
        if ($is_board_view === "true") 
            return response()->json(Department::get_board_categories());

        return response()->json(Department::get_all_Departments());
    }

    public function get_department($dept)
    {

        return response()->json(Department::get_single_department($dept));
    }
}
