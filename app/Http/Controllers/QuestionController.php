<?php

namespace App\Http\Controllers;

use App\Models\Jurusan;
use App\Models\MataKuliah;
use App\Models\Pertanyaan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class QuestionController extends Controller
{
    public function index(): Response
    {
        $photoPath = '/images/nav-bg.png';
        return Inertia::render('Question', ['photoPath' => $photoPath]);
    }

    public function askQuestion(): Response
    {
        $photoPath = '/images/nav-bg.png';

        $user = Auth::user();
        $jurusan = $user->jurusan;

        $mataKuliahs = MataKuliah::where('jurusan_id', $jurusan->id)->get();

        return Inertia::render('AskQuestion', [
            'photoPath' => $photoPath,
            'mataKuliahs' => $mataKuliahs
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $user = Auth::user();
        $userId = $user->id;

        $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required',
            'mataKuliah' => 'required'
        ]);

        $pertanyaan = Pertanyaan::create([
            'judul' => $request->judul,
            'deskripsi' => $request->deskripsi,
            'matkul_id' => $request->mataKuliah,
            'user_id' => $userId,
            'created_at' => date_create()
        ]);

        $pertanyaan->save();
        
        return redirect(route('pertanyaan', absolute: false));
    }
}
