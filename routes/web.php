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

Route::post('/api/login', 'Auth\UserController@login')->name('login');
Route::post('/api/register', 'Auth\UserController@register');
Route::post('/api/user/update', 'Auth\UserController@update')->middleware('auth:api');
Route::get('/api/logout', 'Auth\UserController@logout')->middleware('auth:api');


Route::group(['middleware' => 'auth:api'], function () {
    //Route::post('details', 'UserController@details');
});

Route::get('/api/get-user', 'API@get_user')->middleware('auth:api')->name('get-user');
Route::get('/api/brand/{key?}', 'API@get_all_brands')->middleware('auth:api')->name('get_all_brands');

Route::get('/api/categories/{dept}', 'API@get_categories')->middleware('auth:api')->name('cat-api');

Route::get('/api/all-departments', 'DepartmentController@index')->middleware('auth:api')->name('get_all_departments');
Route::get('/api/departments/{dept}', 'DepartmentController@get_department')->middleware('auth:api')->name('get_department');
Route::get('/api/categories', 'CategoryController@get_all_categories')->middleware('auth:api')->name('get_category');
Route::get('/api/products/{dept}/{cat?}/{subCat?}', 'API@filter_products')->middleware('auth:api')->name('get-products');
Route::get('/api/products/{dept}/{cat}', 'API@filter_products')->middleware('auth:api')->name('category');
Route::get('/api/product/{sku}', 'API@get_product_details')->middleware('auth:api')->name('get-product-details');

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

// cart and transaction apis
Route::post('/api/cart/add', 'API@add_to_cart')->middleware(['auth:api'])->name('add-to-cart');
Route::post('/api/cart/remove', 'API@remove_from_cart')->middleware(['auth:api'])->name('remove-from-cart');
Route::get('/api/cart', 'API@get_cart')->name('get-cart')->middleware(['auth:api']);


// payment routes
Route::post('/api/payment/charge', 'Payment\PaymentController@charge_client')->middleware(['auth:api'])->name('client-secret');
Route::get('/api/order', 'Payment\PaymentController@get_order')->middleware(['auth:api'])->name('get-order');

// inventory
Route::get('/api/inventory', 'API@get_inventory')->name('get-inventory');



// Board Routes
Route::get('/api/board/asset/preview', '\App\Board\Controllers\BoardController@get_asset_for_preview')->middleware(['cors']);
Route::get('/api/board/asset/{id?}', '\App\Board\Controllers\BoardController@get_asset')->middleware(['cors', 'auth:api']);
Route::post('/api/board/asset/{id?}', '\App\Board\Controllers\BoardController@update_asset')->middleware(['cors', 'auth:api']);

Route::get('/api/board/preview/{id}', '\App\Board\Controllers\BoardController@get_board_for_preview')->middleware(['cors']);
Route::get('/api/board/{id?}', '\App\Board\Controllers\BoardController@get_board')->middleware(['cors', 'auth:api']);
Route::post('/api/board/{id?}', '\App\Board\Controllers\BoardController@update_board')->middleware(['cors', 'auth:api']);


/* ==================================================BACKEND ADMIN APIS========================================== */

Route::middleware(['auth:api', 'cors', 'admin'])->group(function() {

    Route::get('/api/admin/products/{dept}/{cat?}/{subCat?}', 'Admin\Dashboard@filter_products')->name('admin-get-products');
    Route::get('/api/admin/products/{dept}/{cat}', 'Admin\Dashboard@filter_products')->name('admin-category');
    Route::get('/api/admin/product/{sku}', 'Admin\Dashboard@get_product_details')->name('admin-get-product-details');
});

/* ============================================================================================================== */