<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuestionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $photoPath = '/images/nav-bg.png';

    return Inertia::render('Welcome', [
        'photoPath' => $photoPath,
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');


Route::get('/pertanyaan', [QuestionController::class, 'index'])->name('pertanyaan');
Route::get('/detail-pertanyaan/{id}', [QuestionController::class, 'show'])->name('detail-pertanyaan');

// Route::get('/dashboard', function () {
//     $photoPath = '/images/nav-bg.png';
//     return Inertia::render('Dashboard', ['photoPath' => $photoPath]);
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/ajukan-pertanyaan', [QuestionController::class, 'askQuestion'])->name('ajukan-pertanyaan');
    Route::post('/submit-pertanyaan', [QuestionController::class, 'store'])->name('submit-pertanyaan');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
