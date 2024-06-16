<?php


use App\Http\Controllers\ContactController;


Route::get('/greeting', function () {
    return 'Hello World';
});


Route::resource('contacts', ContactController::class);

