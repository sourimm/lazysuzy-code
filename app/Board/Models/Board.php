<?php

namespace App\Board\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\Models\Utility;
use Auth;

class Board extends Model
{
    private static $board_table = "board";
    private static $assets_table = "asset";

    public static function board($id = null) {
        $user_id = Utility::get_user_id();
        if($id != null) {
            return DB::table(Board::$board_table)
                    //->where('user_id', $user_id)
                    ->where('board_id', $id)
                    ->where('is_active', 1)
                    ->get();
        }
        else {
            return DB::table(Board::$board_table)
                //->where('user_id', $user_id)
                ->where('is_active', 1)
                ->get();
        }
    }

    public static function asset($id = null) {
        $user_id = Utility::get_user_id();
        if ($id != null) {
            return DB::table(Board::$assets_table)
                ->where('asset_id', $id)
                //->where('user_id', $user_id)
                ->where('is_active', 1)
                ->get();
        } else {
            return DB::table(Board::$assets_table)
                //->where('user_id', $user_id)
                ->where('is_active', 1)
                ->get();
        }
    }

    public static function update_asset($req, $id) {
        $user_id = Utility::get_user_id();

        $data = [
            'name' => $req->input('name'),
            'price' => $req->input('price'),
            'brand' => $req->input('brand'),
            'path' => $req->input('path'),
            'transparent_path' => $req->input('transparent_path'),
            'is_private' => $req->input('is_private'),
        ];

        foreach($data as $field => $val) {
            if (strlen($val) == 0) 
                unset($data[$field]);
        }

        if($id == null) {
            // insert data 
            $data['user_id'] = $user_id;
            $insertID = DB::table(Board::$assets_table)
                            ->insertGetId($data);

            return Board::asset($insertID);
        }

        DB::table(Board::$assets_table)
            //->where('user_id', $user_id)
            ->where('asset_id', $id)
            ->update($data);
        
        return Board::asset($id); 
    }

    public static function update_board($req, $id) {
        $user_id = Utility::get_user_id();
        $data = [
            'state' => $req->input('state'),
            'title' => $req->input('title'),
            'preview' => $req->input('preview'),
        ];

        foreach ($data as $field => $val) {
            if (strlen($val) == 0)
                unset($data[$field]);
        }

        if($id == null) {
            // insert board data
            $data['user_id'] = $user_id;
            $insertID = DB::table(Board::$board_table)
                            ->insertGetId($data);

            return Board::board($insertID);
        }

        $data = [
            'state' => $req->input('state'),
            'title' => $req->input('title'),
            'preview' => $req->input('preview'),
        ];

        DB::table(Board::$board_table)
            //->where('user_id', $user_id)
            ->where('board_id', $id)
            ->update($data);
        
        return Board::board($id);
    }

}
