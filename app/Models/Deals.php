<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Deals extends Model
{
    protected $table = 'site_deals';
    public static function get_deals() {

        return Deals::orderBy('rank', 'ASC')->limit(3)->get();
    }
}
