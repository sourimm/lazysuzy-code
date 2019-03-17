<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    public function products()
    {
        return $this->belongsToMany(Product::class , 'user_wishlists','user_id' , 'product_id');
    }
}
