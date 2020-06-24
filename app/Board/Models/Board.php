<?php

namespace App\Board\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

use App\Board\Scopes\AuthAndActiveScope;

class Board extends Model
{    
  protected $table = 'board';
  protected $primaryKey = 'board_id';
  protected $primarySearchKey = 'uuid';
  protected $fillable = ['state', 'title', 'preview', 'type_room', 'type_style', 'type_privacy', 'is_published', 'is_active'];
  protected static function boot() {
    parent::boot();
    static::addGlobalScope(new AuthAndActiveScope);
    static::creating(function($board){
      $board->uuid = Board::randomId(6);
      // $board->uuid = (string) Str::uuid();
    });
    static::saving(function($board){
      $board->user_id = Auth::id();
    });
  }
  
  public function setIsLikedAttribute($value) {
    $this->attributes['is_liked'] = $value;
  }

  private static function randomId($length = 10){

     $str_result = '0123456789abcdefghijklmnopqrstuvwxyz'; 
     $id = substr(str_shuffle($str_result), 0, $length);
     
     $validator = \Validator::make(['uuid'=>$id],['uuid'=>'unique:board']);
     
     if($validator->fails())
          return $this->randomId();

     return $id;
  }
  
  public function scopeID($query, $boardID) {
    if($boardID)
      return $query->where($this->primarySearchKey, $boardID);
  }

  public static function board($id = null) {
    $boards = Board::id($id)->get();
    // $id ?: $boards->makeHidden(['state']);
    return $boards;
  }
}
