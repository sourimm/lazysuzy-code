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
API ROUTES
 */

Route::get('/api/all-departments', 'DepartmentController@index')->name('get_all_departments');
Route::get('/api/departments/{dept}', 'DepartmentController@get_department')->name('get_department');
Route::get('/api/categories', 'CategoryController@get_all_categories')->name('get_category');
Route::get('/api/products/{dept}/{cat?}/{subCat?}', 'API@filter_products')->name('get-products');