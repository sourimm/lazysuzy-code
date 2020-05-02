<?php

namespace App\Board\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Board\Models\Board;
use App\Models\Utility;

class BoardController extends Controller 
{
    public static function get_board() {
        return Board::board();
    }

    public static function get_board_with_id($id) {
        return Board::board($id);
    }

    public static function update_board(Request $req, $id = null) {
        return Board::update_board($req, $id);
    } 

    public static function get_asset() {
        return Board::asset();
    }

    public static function get_asset_with_id($id) {
        return Board::asset($id);
    } 

    public static function update_asset(Request $req, $id = null) {
        return Board::update_asset($req, $id);
    }

    
}