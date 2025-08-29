<?php

use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [TaskController::class, 'index'])->name('tasks.index');
Route::post('/task', [TaskController::class, 'store']);
Route::delete('/task/{id}', [TaskController::class, 'destroy']);

Route::get('/welcome', function () {
    return Inertia::render('Welcome', [
        'canLogin' => false,
        'canRegister' => false,
        'laravelVersion' => app()->version(),
        'phpVersion' => PHP_VERSION,
    ]);
});
