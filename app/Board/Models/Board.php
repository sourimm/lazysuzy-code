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
    private static $upload_folder = 'uploads/board';


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

    public static function update_asset($req, $id = null) {
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

        // handle file upload
        $upload = Board::do_upload($req);
        if($upload == true) {
            return [
                'status' => 'success',
                'msg' => 'file uploaded'
            ];
        }

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

    public static function do_upload($req) {


        if($req->hasFile('file')) {
            // file upload
            $file = $req->file('file');
            $file_name = Utility::generateID() . $file->getClientOriginalName();
            $file_path = Board::$upload_folder . '/' . $file_name;
            $file->move(Board::$upload_folder, $file_name);

            $req->merge([
                'path' => '/' . $file_path
            ]);
            
            Board::update_asset($req);
            return true;
            
        }
        else if($req->has('url')) {
            // url. file download
            $url = $req->input('url');
            $remote_image = file_get_contents($url, false, stream_context_create(array(
                'ssl' => array(
                    'verify_peer' => false,
                    'verify_peer_name' => false,
                ),
            )));

            $file_path = Board::$upload_folder . '/' . Utility::generateID();
            file_put_contents($file_path, $remote_image);

            $image_meta = getimagesize($file_path);
            
            if(isset($image_meta['mime'])) {
                $image_ext = Utility::mimeToText($image_meta['mime']);
                unlink($file_path);
                $file_path .= '.' . $image_ext;

                $req->merge([
                    'path' => '/' . $file_path
                ]);

                if (file_put_contents($file_path, $remote_image)){
                    Board::update_asset($req);
                    return true;
                }
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }

}
