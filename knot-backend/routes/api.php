<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;

// Improvement: add a history table and ping the history table to get the latest data of the updates for a specific contact to be sclable as the data grows

Route::middleware([])->group(function () {
    // Get list of contacts
    Route::get('/contacts', [ContactController::class, 'index']);

    // Get a single contact
    Route::get('/contacts/{id}', [ContactController::class, 'show']);

    // Create a new contact
    Route::post('/contacts', [ContactController::class, 'store']);

    // Update an existing contact
    Route::put('/contacts/{id}', [ContactController::class, 'update']);

    // Delete a contact
    Route::delete('/contacts/{id}', [ContactController::class, 'destroy']);
});

