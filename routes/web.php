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

 // mail template checking route
 Route::get('/mail-test', 'MailerController@send_catalogue')->name('catalogue');


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

Route::post('/api/login', 'Auth\UserController@login');
Route::post('/api/register', 'Auth\UserController@register');
Route::get('/api/logout', 'Auth\UserController@logout');


Route::group(['middleware' => 'auth:api'], function () {
    //Route::post('details', 'UserController@details');
});

Route::get('/api/get-user', 'API@get_user')->middleware('auth:api')->name('get-user');
Route::get('/api/brand/{key?}', 'API@get_all_brands')->name('get_all_brands');

Route::get('/api/categories/{dept}', 'API@get_categories')->name('cat-api');

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

Route::get('/api/wishlist', 'API@get_wishlist')->middleware('auth:api')->name('get-wishlist');
Route::get('/api/mark/favourite/{sku}', 'API@mark_favourite')->middleware('auth:api')->name('mark-favourite');
Route::get('/api/unmark/favourite/{sku}', 'API@unmark_favourite')->middleware('auth:api')->name('unmark-favourite');
Route::get('/api/subscribe', 'API@subscribe_user')->name('subscribe');
Route::get('/api/banners', 'API@get_banners')->name('banners');

// redundant
Route::get('/wishlist', 'ProductController@showWishList')->name('show-wishlist');

Route::post('/api/board', '\App\Board\Controllers\Server@get_output')->middleware('cors');


// payment routes
Route::get('/api/payment/charge/{sku}', 'Payment\PaymentController@charge_client')->name('client-secret');

// cart and trancastion apis
Route::post('/api/cart/add/{sku}', 'API@add_to_cart')->name('add-to-cart');
Route::post('/api/cart/remove/{sku}', 'API@remove_from_cart')->name('remove-from-cart');
Route::get('/api/cart', 'API@get_cart')->name('get-cart');