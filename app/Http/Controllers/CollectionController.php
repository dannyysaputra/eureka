<?php

namespace App\Http\Controllers;

use App\Models\Dosen;
use App\Models\Pertanyaan;
use App\Models\User;
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

        // Query untuk collectors (User)
        $pertanyaansFromCollectors = Pertanyaan::whereHas('collectors', function ($query) use ($user) {
            $query->where('users.id', $user->id);
        })
        ->with(['likes' => function ($query) {
            $query->select('likeable_id', 'user_id');
        }, 'mataKuliah', 'collectors', 'dosenCollectors'])
        ->withCount('jawabans')
        ->get();

        // Query untuk dosenCollectors (Dosen)
        $pertanyaansFromDosenCollectors = Pertanyaan::whereHas('dosenCollectors', function ($query) use ($user) {
            $query->where('dosens.id', $user->id);
        })
        ->with(['likes' => function ($query) {
            $query->select('likeable_id', 'user_id');
        }, 'mataKuliah', 'collectors', 'dosenCollectors'])
        ->withCount('jawabans')
        ->get();

        // Gabungkan hasil query
        $pertanyaans = $pertanyaansFromCollectors->merge($pertanyaansFromDosenCollectors)->map(function ($pertanyaan) {
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
        $user = auth()->user();
        $user->collectedPertanyaans()->attach($questionId, ['collectible_id' => $user->id]);
    
        // Validasi bahwa pertanyaan ada
        // $pertanyaan = Pertanyaan::findOrFail($questionId);

        // if ($user->role === 'dosen') {
        //     $dosen = Dosen::find($user->id); 
        //     if ($dosen) {
        //         $dosen->collectedPertanyaans()->attach($pertanyaan);
        //     }
        // } else {
        //     $mahasiswa = User::find($user->id);
        //     $mahasiswa->collectedPertanyaans()->attach($pertanyaan);
        // }
    }

    // Menghapus Collection
    public function removeCollection($questionId)
    {
        $user = auth()->user();
    
        if ($user->role === 'dosen') {
            $dosen = Dosen::find($user->id);
            if ($dosen) {
                $dosen->collectedPertanyaans()->detach($questionId);
            }
        } else {
            $mahasiswa = User::find($user->id);
            $mahasiswa->collectedPertanyaans()->detach($questionId);
        }
    }
}
