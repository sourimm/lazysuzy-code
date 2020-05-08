<?php

namespace App\Board\Controllers;

use App\Http\Controllers\Controller;
use App\Board\Models\Asset;
use App\Board\Models\Board;

use Illuminate\Http\File;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class BoardController extends Controller 
{
    public static function get_board($id = null) {
        return Board::board($id);
    }

    public static function get_asset($id = null) {
      return Asset::asset($id);
    }
    
    public static function update_board(Request $request, $id = null) {
        if($id){
          $board = Board::board($id);
          if($board){
            $board->first()->update($request->all());
            return $board;
          }
        }
        else
          return Board::create($request->all());
    } 

    public static function update_asset(Request $request, $id = null) {

      $data = $request->all();
      $client = new \GuzzleHttp\Client(['verify' => false]);
        
      $validator = Validator::make($data, [
        'is_private' => 'boolean',
        'is_active' => 'boolean',
        'file' => 'sometimes|image',
        'url' => 'sometimes|url',
        'transparent' => 'sometimes|boolean'
      ]);
      
      if ($validator->fails()) {
        return response()->json(['error' => $validator->errors()->all()], 401);
      }
      
      // image was uploaded using URL
      if(isset($data['url'])){
        $response = $client->get($data['url']);
        if($response->getStatusCode() == 200){
          $data['path'] = self::store_content($response->getBody());
        }
      }
      // image was uploaded using file
      else if(isset($data['file'])){
        $data['path'] = Storage::putFile('public', $request->file('file'));
      }
      
      if($id){
        $asset = Asset::findOrFail($id);
        // check if transparent request is made
        if(isset($data['transparent'])){
          $response = $client->post(env('REMOVEBG_API_ENDPOINT'), [
            'headers' => ['X-API-Key' => env('REMOVEBG_API_KEY')],
            'form_params' => [
              'image_url' => url($asset->path),
              'format' => 'png',
            ]
          ]);
          $asset->transparent_path = self::store_content($response->getBody());
        }
        $asset->update($data);
        return $asset;
      }
      else
        return Asset::create($data);
    }
    
    private static function store_content($content) {
      $filename = "temp" . DIRECTORY_SEPARATOR . Str::random();
      Storage::put($filename, $content);
      $path = Storage::putFile('public', new File(storage_path('app') .DIRECTORY_SEPARATOR. $filename));
      Storage::delete($filename);
      return $path;
    }

    
}
