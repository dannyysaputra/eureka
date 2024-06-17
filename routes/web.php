<?php

use App\Http\Controllers\AnswerController;
use App\Http\Controllers\CollectionController;
use App\Http\Controllers\DosenController;
use App\Http\Controllers\LeaderboardController;
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
    
Route::middleware('auth:web')->group(function () {
    Route::get('/ajukan-pertanyaan', [QuestionController::class, 'askQuestion'])->name('ajukan-pertanyaan');
    Route::post('/submit-pertanyaan', [QuestionController::class, 'store'])->name('submit-pertanyaan');

    Route::post('/submit-jawaban', [AnswerController::class, 'store'])->name('submit-jawaban');
    Route::post('/jawaban/{id}/like', [AnswerController::class, 'likeAnswer'])->name('likeAnswer');
    Route::post('/jawaban/{id}/validate', [AnswerController::class, 'validateAnswer'])->name('validateAnswer');
    Route::delete('/jawaban/{id}', [AnswerController::class, 'destroy'])->name('jawaban.destroy');
    Route::put('/jawaban/{id}', [AnswerController::class, 'update'])->name('jawaban.update');
    
    Route::get('/edit-pertanyaan/{id}', [QuestionController::class, 'updateView'])->name('pertanyaan.updateView');
    Route::delete('/pertanyaan/{id}', [QuestionController::class, 'destroy'])->name('pertanyaan.destroy');
    Route::put('/pertanyaan/{id}', [QuestionController::class, 'update'])->name('pertanyaan.update');

    Route::get('/detail-pertanyaan/{id}', [QuestionController::class, 'show'])->name('detail-pertanyaan');
    Route::post('/pertanyaan/{id}/like', [QuestionController::class, 'likePost'])->name('like');

    Route::get('/pertanyaan-saya', [QuestionController::class, 'myQuestion'])->name('pertanyaan-saya');
    Route::get('/pertanyaan', [QuestionController::class, 'index'])->name('pertanyaan');

    Route::get('/leaderboard', [LeaderboardController::class, 'index'])->name('leaderboard');

    Route::get('/profile', [ProfileController::class, 'index'])->name('profile');   
    Route::get('/edit-profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
        
    Route::get('/koleksi', [CollectionController::class, 'index'])->name('koleksi');
    Route::post('/pertanyaan/{id}/add-collection', [CollectionController::class, 'addCollection']);
    Route::post('/pertanyaan/{id}/remove-collection', [CollectionController::class, 'removeCollection']);
});

Route::middleware('auth:dosens')->group(function () {
    Route::get('/dosen/pertanyaan', [QuestionController::class, 'index'])->name('dosen.pertanyaan');
    Route::get('/dosen/detail-pertanyaan/{id}', [QuestionController::class, 'show'])->name('dosen.detail-pertanyaan');
    
    Route::post('/dosen/jawaban/{id}/validate', [AnswerController::class, 'validateAnswer'])->name('dosen.validateAnswer');
    Route::post('/dosen/submit-jawaban', [AnswerController::class, 'store'])->name('dosen.submit-jawaban');
    Route::delete('/dosen/jawaban/{id}', [AnswerController::class, 'destroy'])->name('dosen.jawaban.destroy');
    Route::put('/dosen/jawaban/{id}', [AnswerController::class, 'update'])->name('dosen.jawaban.update');

    Route::get('/dosen/koleksi', [CollectionController::class, 'index'])->name('koleksi');
    Route::post('/dosen/pertanyaan/{id}/add-collection', [CollectionController::class, 'addCollection']);
    Route::post('/dosen/pertanyaan/{id}/remove-collection', [CollectionController::class, 'removeCollection']);
});


require __DIR__.'/auth.php';
