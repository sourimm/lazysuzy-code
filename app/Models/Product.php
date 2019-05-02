<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    public function productMap(){
        return $this->belongsTo(DepartmentMapping::class , 'ls_id');
    }
}
