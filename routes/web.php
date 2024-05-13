<?php

use App\Http\Controllers\ProfileController;
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

Route::get('/pertanyaan', function () {
    $photoPath = '/images/nav-bg.png';
    return Inertia::render('Question', ['photoPath' => $photoPath]);
})->name('pertanyaan');

Route::get('/ajukan-pertanyaan', function () {
    $photoPath = '/images/nav-bg.png';
    return Inertia::render('AskQuestion', ['photoPath' => $photoPath]);
})->name('ajukan-pertanyaan');

Route::get('/dashboard', function () {
    $photoPath = '/images/nav-bg.png';
    return Inertia::render('Dashboard', ['photoPath' => $photoPath]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
