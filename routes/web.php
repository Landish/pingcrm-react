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

use App\Http\Controllers\Auth\LoginController;

Route::get('/')->name('dashboard')->uses('DashboardController')->middleware('auth'); // Dashboard
Route::post('logout',[LoginController::class,'logout'])->name('logout'); //logout
Route::get('/img/{path}', 'ImagesController@show')->where('path', '.*'); // Images
Route::get('reports')->name('reports')->uses('ReportsController')->middleware('auth'); // Reports


Route::middleware(['guest'])->group(function () {
    Route::get('login', [LoginController::class, 'showLoginForm'])->name('login');
    Route::post('login',[LoginController::class,'login'])->name('login.attempt');
});



Route::controller(UsersController::class)->middleware(['auth'])->group(function () {

    Route::get('users','index')->name('users')->middleware('remember');
    Route::get('users/create', 'create')->name('users.create');
    Route::post('users','store')->name('users.store');
    Route::get('users/{user}/edit','edit')->name('users.edit');
    Route::put('users/{user}','update')->name('users.update');
    Route::delete('users/{user}', 'destroy')->name('users.destroy');
    Route::put('users/{user}/restore','restore')->name('users.restore');

});



// Organizations
Route::controller(OrganizationsController::class)->middleware(['auth'])->group(function () {

    Route::get('organizations','index')->name('organizations')->middleware('remember');
    Route::get('organizations/create','create')->name('organizations.create');
    Route::post('organizations','store')->name('organizations.store');
    Route::get('organizations/{organization}/edit','edit')->name('organizations.edit');
    Route::put('organizations/{organization}','update')->name('organizations.update');
    Route::delete('organizations/{organization}','destroy')->name('organizations.destroy');
    Route::put('organizations/{organization}/restore','restore')->name('organizations.restore');

});



// Contacts
Route::controller(ContactsController::class)->middleware(['auth'])->group(function () {
    Route::get('contacts','index')->name('contacts')->middleware('remember');
    Route::get('contacts/create','create')->name('contacts.create');
    Route::post('contacts','store')->name('contacts.store');
    Route::get('contacts/{contact}/edit','edit')->name('contacts.edit');
    Route::put('contacts/{contact}','update')->name('contacts.update');
    Route::delete('contacts/{contact}','destroy')->name('contacts.destroy');
    Route::put('contacts/{contact}/restore','restore')->name('contacts.restore');

});


// 500 error
Route::get('500', function () {
    echo $fail;
});
