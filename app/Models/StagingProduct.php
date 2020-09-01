<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StagingProduct extends Model
{
    protected $table = "staging_data";
    //Change Attribute names of timestamps
    const CREATED_AT = 'created_date';
    const UPDATED_AT = 'updated_date';

    protected $fillable = ['status'];
    protected $casts = [
        'product_dimension' => 'array',
    ];
}
