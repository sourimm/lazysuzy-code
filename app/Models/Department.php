<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    public function categories()
    {
        return $this->belongsToMany(Category::class, 'department_categories');
    }
}
