<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Filters extends Model
{

    /**
     * Filter Factory for applying set of filters
     * replace all ABCFilter::apply() calls wiht this one call
     * and make all filter changes bases in the last param passed
     *
     * @param [type] $cat
     * @param [type] $dept
     * @param [type] $all_filters
     * @param [type] $query
     * @param [type] $filter_id
     * @return void
     */
    public static function apply($cat, $dept, $all_filters, $query, $filter_id = NULL) {

        // set filters based on the $filters_id

        return $query;
    }
}
