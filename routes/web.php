<?php

use App\Http\Controllers\AnswerController;
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



Route::get('/collection', function () {
        $photoPath = '/images/nav-bg.png';
        return Inertia::render('Collection', ['photoPath' => $photoPath]);
    })->name('collection');
    
Route::middleware('auth')->group(function () {
    Route::get('/ajukan-pertanyaan', [QuestionController::class, 'askQuestion'])->name('ajukan-pertanyaan');
    Route::post('/submit-pertanyaan', [QuestionController::class, 'store'])->name('submit-pertanyaan');

    Route::post('/submit-jawaban', [AnswerController::class, 'store'])->name('submit-jawaban');
    Route::post('/jawaban/{id}/like', [AnswerController::class, 'likeAnswer'])->name('likeAnswer');
    Route::post('/jawaban/{id}/validate', [AnswerController::class, 'validateAnswer'])->name('likeAnswer');
    
    Route::get('/pertanyaan', [QuestionController::class, 'index'])->name('pertanyaan');
    Route::get('/edit-pertanyaan/{id}', [QuestionController::class, 'updateView'])->name('pertanyaan.updateView');
    Route::delete('/pertanyaan/{id}', [QuestionController::class, 'destroy'])->name('pertanyaan.destroy');
    Route::put('/pertanyaan/{id}', [QuestionController::class, 'update'])->name('pertanyaan.update');

    Route::get('/detail-pertanyaan/{id}', [QuestionController::class, 'show'])->name('detail-pertanyaan');
    Route::post('/pertanyaan/{id}/like', [QuestionController::class, 'likePost'])->name('like');

    Route::get('/pertanyaan-saya', [QuestionController::class, 'myQuestion'])->name('pertanyaan-saya');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
