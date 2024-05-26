<?php

namespace App\Http\Controllers;

use App\Models\Pertanyaan;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CollectionController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $pertanyaans = Pertanyaan::whereHas('collectedBy', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })
        ->with(['likes' => function ($query) {
            $query->select('likeable_id', 'user_id');
        }, 'mataKuliah'])
        ->withCount('jawabans')
        ->get()
        ->map(function ($pertanyaan) {  
            $deskripsi = Str::limit(strip_tags($pertanyaan->deskripsi), 100); // Hanya ambil 100 karakter

            // Hitung waktu yang sudah berlalu
            $createdAt = Carbon::parse($pertanyaan->created_at);
            $daysAgo = $createdAt->floatDiffInDays(); // Selisih hari    
            $timeAgo = $daysAgo < 30 ? round($daysAgo) . ' days ago' : $createdAt->diffForHumans(); // Format "x days ago" atau "x months ago"

            $namaDepan = explode(' ', $pertanyaan->user->name)[0];

            return array_merge($pertanyaan->toArray(), [
                'deskripsi' => $deskripsi,
                'timeAgo' => $timeAgo,
                'nama_depan' => $namaDepan,
            ]);
        });

        $photoPath = '/images/nav-bg.png';

        return Inertia::render('Collection', [
            'pertanyaans' => $pertanyaans,
            'photoPath' => $photoPath
        ]);
    }

    public function addCollection($questionId)
    {
        auth()->user()->collections()->attach($questionId);
    }

    // Menghapus Collection
    public function removeCollection($questionId)
    {
        auth()->user()->collections()->detach($questionId);
    }
}
