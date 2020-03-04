<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

Route::get('/', 'HomeController@index')->name('index');
Route::get('/products/{dept}/{cat?}', 'ProductController@index')->name('products');
Route::get('/products/{dept}', 'ProductController@index')->name('categories');
Route::get('/product/{sku}', 'PdpController@index')->name('index');
Route::get('/login', 'Auth\LoginController@index')->name('signup');
Route::get('/wishlist', function () {
    return view('pages.wishlist');
});
Route::get('/search', function () {
    return view('pages.search');
});
Route::get('/privacypolicy', function () {
    return view('pages.privacypolicy');
});
Route::get('/termsofservice', function () {
    return view('pages.terms');
});
Route::get('/aboutus', function () {
    return view('pages.aboutus');
});
Route::get('/brand/{brand_name}',function(){
    return view('pages.brands');
});
Route::get('/category', function () {
    return view('pages.category');
});



Auth::routes();

Route::get('/logout', 'Auth\LoginController@logout');
Route::get('/home', 'HomeController@index')->name('home');
Route::get('redirect/{driver}', 'Auth\LoginController@redirectToProvider')
->name('login.provider')
->where('driver', implode('|', config('auth.socialite.drivers')));
Route::get('login/{driver}/callback', 'Auth\LoginController@handleProviderCallback')
->name('login.callback')
->where('driver', implode('|', config('auth.socialite.drivers')));


/*
*   API ROUTES
*/
Route::post('/api/register', 'API@register_user')->name('register');
Route::get('/api/get-user', 'API@get_user')->name('get-user');
Route::get('/api/brand/{key?}', 'API@get_all_brands')->name('get_all_brands');

Route::get('/api/categories/{dept}', 'API@get_categories')->name('subscribe');

Route::get('/api/all-departments', 'DepartmentController@index')->name('get_all_departments');
Route::get('/api/departments/{dept}', 'DepartmentController@get_department')->name('get_department');
Route::get('/api/categories', 'CategoryController@get_all_categories')->name('get_category');
Route::get('/api/products/{dept}/{cat?}/{subCat?}', 'API@filter_products')->name('get-products');
Route::get('/api/products/{dept}/{cat}', 'API@filter_products')->name('category');
Route::get('/api/product/{sku}', 'API@get_product_details')->name('get-product-details');

// has a filter attached. request has format attribute_1=<val>&attribute_2=<val> and so on...
Route::get('/api/variation/product/{sku}', 'API@get_product_variations')->name('get-product-variations');

// takes a swatch image url as input ?swatch=<url>
Route::get('/api/filters/variation/product/{sku}', 'API@get_swatch_filter')->name('get-product-attribute-filters');

Route::get('/api/wishlist', 'API@get_wishlist')->name('get-wishlist');
Route::get('/api/mark/favourite/{sku}', 'API@mark_favourite')->name('mark-favourite');
Route::get('/api/unmark/favourite/{sku}', 'API@unmark_favourite')->name('unmark-favourite');
Route::get('/api/subscribe', 'API@subscribe_user')->name('subscribe');
Route::get('/api/banners', 'API@get_banners')->name('banners');

// redundant
Route::get('/wishlist', 'ProebductController@showWishList')->name('show-wishlist');