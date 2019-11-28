<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;



class User extends Authenticatable
{
    use Notifiable;

	protected $fillable = ['name', 'email', 'password', 'first_name', 'last_name', 'gender', 'oauth_provider', 'oauth_uid', 'picture', 'locale'];

    public function products()
    {
        return $this->belongsToMany(Product::class , 'user_wishlists','user_id' , 'product_id');
    }
    public function identities()
    {
   		return $this->hasMany('App\Models\SocialIdentity');
	}

}
