<?php

namespace App\Board\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

use App\Board\Scopes\AuthAndActiveScope;

class Board extends Model
{    
  protected $table = 'board';
  protected $primaryKey = 'board_id';
  protected $fillable = ['state', 'title', 'preview', 'is_active'];   
  
  protected static function boot() {
    parent::boot();
    static::addGlobalScope(new AuthAndActiveScope);
    static::saving(function($board){
      $board->user_id = Auth::id();
    });
  }
  
  public function scopeID($query, $boardID) {
    if($boardID)
      return $query->where($this->primaryKey, $boardID);
  }

  public static function board($id = null) {
    $boards = Board::id($id)->get();
    $id ?: $boards->makeHidden(['state']);
    return $boards;
  }
}
