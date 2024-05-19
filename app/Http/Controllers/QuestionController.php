<?php

namespace App\Http\Controllers;

use App\Events\QuestionLiked;
use App\Models\Jurusan;
use App\Models\MataKuliah;
use App\Models\Pertanyaan;
use Carbon\Carbon;
use Faker\Core\Uuid;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class QuestionController extends Controller
{
    public function index(): Response
    {
        $pertanyaans = Pertanyaan::with('likes')->join('users', 'pertanyaans.user_id', '=', 'users.id')
        ->select('pertanyaans.*', DB::raw("SUBSTRING_INDEX(users.name, ' ', 1) as nama_depan"))
        ->get()
        ->map(function ($pertanyaan) {
            $deskripsi = Str::limit(strip_tags($pertanyaan->deskripsi), 100); // Hanya ambil 100 karakter

            // Hitung waktu yang sudah berlalu
            $createdAt = Carbon::parse($pertanyaan->created_at);
            $daysAgo = $createdAt->floatDiffInDays(); // Selisih hari    
            $timeAgo = $daysAgo < 30 ? round($daysAgo) . ' days ago' : $createdAt->diffForHumans(); // Format "x days ago" atau "x months ago"

            return array_merge($pertanyaan->toArray(), [
                'deskripsi' => $deskripsi,
                'timeAgo' => $timeAgo,
            ]);
        });
        

        $photoPath = '/images/nav-bg.png';
        return Inertia::render('Question', [
            'photoPath' => $photoPath,
            'pertanyaans' => $pertanyaans
        ]);
    }

    public function show($id): Response
    {
        $pertanyaan = Pertanyaan::where('id', $id)->first();

        $photoPath = '/images/nav-bg.png';
        return Inertia::render('DetailQuestion', [
            'photoPath' => $photoPath,
            'pertanyaan' => $pertanyaan
        ]);
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

    public function likePost($id)
    {
        $pertanyaan = Pertanyaan::find($id);

        if ($pertanyaan->liked()) {
            $pertanyaan->unlike($id);
        }else{
            $pertanyaan->like();
        }
        
        $pertanyaan->save();

        QuestionLiked::dispatch($pertanyaan->load(['likes']));
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
            'created_at' => now()
        ]);

        $pertanyaan->save();
        
        return redirect(route('pertanyaan', absolute: false));
    }
}
