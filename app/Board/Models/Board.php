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
  protected $fillable = ['state', 'title', 'preview', 'is_active'];   
  
  protected static function boot() {
    parent::boot();
    static::addGlobalScope(new AuthAndActiveScope);
    static::creating(function($board){
      $board->uuid = (string) Str::uuid();
    });
    static::saving(function($board){
      $board->user_id = Auth::id();
    });
  }
  
  public function scopeID($query, $boardID) {
    if($boardID)
      return $query->where($this->primarySearchKey, $boardID);
  }

  public static function board($id = null) {
    $boards = Board::id($id)->get();
    $id ?: $boards->makeHidden(['state']);
    return $boards;
  }
}
