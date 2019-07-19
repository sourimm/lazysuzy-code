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
Route::get('/product/{sku}', 'PdpController@index')->name('index');
Route::get('/login', 'Auth\LoginController@index')->name('signup');

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

Route::get('/api/all-departments', 'DepartmentController@index')->name('get_all_departments');
Route::get('/api/departments/{dept}', 'DepartmentController@get_department')->name('get_department');
Route::get('/api/categories', 'CategoryController@get_all_categories')->name('get_category');
Route::get('/api/products/{dept}/{cat?}/{subCat?}', 'API@filter_products')->name('get-products');
Route::get('/api/product/{sku}', 'API@get_product_details')->name('get-product-details');

// has a filter attached. request has format attribute_1=<val>&attribute_2=<val> and so on...
Route::get('/api/variation/product/{sku}', 'API@get_product_variations')->name('get-product-variations');

// takes a swatch image url as input ?swatch=<url>
Route::get('/api/filters/variation/product/{sku}', 'API@get_swatch_filter')->name('get-product-attribute-filters');

Route::get('/api/wishlist', 'API@get_wishlist')->name('get-wishlist');
Route::get('/api/mark/favourite/{sku}', 'API@mark_favourite')->name('mark-favourite');
Route::get('/api/unmark/favourite/{sku}', 'API@unmark_favourite')->name('unmark-favourite');
