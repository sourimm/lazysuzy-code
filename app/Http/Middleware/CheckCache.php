<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Cache;

class CheckCache
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next) {
        
        $key = json_encode($request->fullUrl());
        $key = md5($key);
        return Cache::remember($key, env('CACHE_LIFETIME'), 
            function() use($next, $request) {
                return $next($request);
            }
        );

    }
}
