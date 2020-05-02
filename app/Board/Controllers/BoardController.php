<?php

namespace App\Board\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Board\Models\Board;
use App\Models\Utility;

class BoardController extends Controller 
{
    private static $upload_folder = 'uploads/board';
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

    public static function do_upload(Request $req) {


        if($req->hasFile('file')) {
            // file upload
            $file = $req->file('file');
            $file_name = Utility::generateID() . $file->getClientOriginalName();
            $file_path = BoardController::$upload_folder . '/' . $file_name;
            $file->move(BoardController::$upload_folder, $file_name);

            $req->merge([
                'path' => '/' . $file_path
            ]);
            
            return Board::update_asset($req);
            
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

            $file_path = BoardController::$upload_folder . '/' . Utility::generateID();
            file_put_contents($file_path, $remote_image);

            $image_meta = getimagesize($file_path);
            
            if(isset($image_meta['mime'])) {
                $image_ext = Utility::mimeToText($image_meta['mime']);
                unlink($file_path);
                $file_path .= '.' . $image_ext;

                $req->merge([
                    'path' => '/' . $file_path
                ]);

                if (file_put_contents($file_path, $remote_image))
                    return Board::update_asset($req);
            }
            else {
                return [
                    'msg' => 'incorrect mime info'
                ];
            }
        }
        else {
            return [
                'msg' => 'send file or url to upload'
            ];
        }
    }
}