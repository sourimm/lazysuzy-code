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
        
        $product_sku = $request->route('sku');
        return Cache::remember($product_sku, env('CACHE_LIFETIME'), 
            function() use($next, $request) {
                return $next($request);
            }
        );
    }
}
