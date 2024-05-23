<?php

namespace App\Http\Controllers;

use App\Events\QuestionLiked;
use App\Models\Jawaban;
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
        $pertanyaans = Pertanyaan::with(['likes' => function ($query) {
            $query->select('likeable_id', 'user_id');
        }])->join('users', 'pertanyaans.user_id', '=', 'users.id')
        ->join('mata_kuliahs', 'pertanyaans.matkul_id', '=', 'mata_kuliahs.id')
        ->select('pertanyaans.*', DB::raw("SUBSTRING_INDEX(users.name, ' ', 1) as nama_depan"), 'mata_kuliahs.nama_matkul as matkul_name')
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

        $topCourses = DB::table('pertanyaans')
        ->join('mata_kuliahs', 'pertanyaans.matkul_id', '=', 'mata_kuliahs.id')
        ->select('pertanyaans.matkul_id', 'mata_kuliahs.nama_matkul as matkul_name', DB::raw('count(*) as total_questions'))
        ->groupBy('pertanyaans.matkul_id', 'mata_kuliahs.nama_matkul') 
        ->orderByDesc('total_questions')
        ->limit(5)
        ->get();
        

        $photoPath = '/images/nav-bg.png';
        return Inertia::render('Question', [
            'photoPath' => $photoPath,
            'pertanyaans' => $pertanyaans,
            'topCourses' => $topCourses
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
            'created_at' => now()
        ]);

        $pertanyaan->save();
        
        return redirect(route('pertanyaan', absolute: false));
    }

    public function destroy($id): RedirectResponse
    {
        $pertanyaan = Pertanyaan::findOrFail($id);
        $pertanyaan->delete();

        return redirect(route('pertanyaan-saya', absolute:false));
    }


    public function show($id): Response
    {
        $pertanyaan = Pertanyaan::with('user.jurusan')
            ->where('pertanyaans.id', $id)
            ->join('users', 'pertanyaans.user_id', '=', 'users.id')
            ->join('jurusans', 'users.jurusan_id', '=', 'jurusans.id')
            ->select('pertanyaans.*', 'users.name as user_name', 'jurusans.nama_jurusan as jurusan_name')
            ->first();

        $pertanyaan->deskripsi = strip_tags($pertanyaan->deskripsi);

        $jawabans = Jawaban::where('jawabans.pertanyaan_id', $id)
            ->with(['likes' => function ($query) {
                $query->select('likeable_id', 'user_id');
            }])
            ->join('users', 'jawabans.user_id', '=', 'users.id')
            ->join('jurusans', 'users.jurusan_id', '=', 'jurusans.id')
            ->select('jawabans.*', 'users.name as user_name', 'jurusans.nama_jurusan as jurusan_name')
            ->get();

        $photoPath = '/images/nav-bg.png';
        return Inertia::render('DetailQuestion', [
            'photoPath' => $photoPath,
            'pertanyaan' => $pertanyaan,
            'jawabans' => $jawabans
        ]);
    }

    public function myQuestion(): Response
    {
        $user = Auth::user();

        $pertanyaans = Pertanyaan::with(['likes' => function ($query) {
                $query->select('likeable_id', 'user_id');
            }])
            ->join('users', 'pertanyaans.user_id', '=', 'users.id')
            ->join('jurusans', 'users.jurusan_id', '=', 'jurusans.id')
            ->where('pertanyaans.user_id', $user->id)
            ->select('pertanyaans.*', DB::raw("SUBSTRING_INDEX(users.name, ' ', 1) as nama_depan"), 'jurusans.nama_jurusan as jurusan_name')
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
        
        return Inertia::render('MyQuestion', [
            'photoPath' => $photoPath,
            'pertanyaans' => $pertanyaans
        ]);
    }

    public function askQuestion(): Response
    {
        $pertanyaans = Pertanyaan::with(['likes' => function ($query) {
                $query->select('likeable_id', 'user_id');
            }])->join('users', 'pertanyaans.user_id', '=', 'users.id')
            ->join('mata_kuliahs', 'pertanyaans.matkul_id', '=', 'mata_kuliahs.id')
            ->get()
            ->map(function ($pertanyaan) {
                $deskripsi = Str::limit(strip_tags($pertanyaan->deskripsi), 100); // Hanya ambil 100 karakter
                return array_merge($pertanyaan->toArray(), [
                    'deskripsi' => $deskripsi
                ]);
        });

        $topCourses = DB::table('pertanyaans')
            ->join('mata_kuliahs', 'pertanyaans.matkul_id', '=', 'mata_kuliahs.id')
            ->select('pertanyaans.matkul_id', 'mata_kuliahs.nama_matkul as matkul_name', DB::raw('count(*) as total_questions'))
            ->groupBy('pertanyaans.matkul_id', 'mata_kuliahs.nama_matkul')
            ->orderByDesc('total_questions')
            ->limit(5)
            ->get();

        $photoPath = '/images/nav-bg.png';

        $user = Auth::user();
        $jurusan = $user->jurusan;

        $mataKuliahs = MataKuliah::where('jurusan_id', $jurusan->id)->get();

        return Inertia::render('AskQuestion', [
            'pertanyaans' => $pertanyaans,
            'topCourses' => $topCourses,
            'photoPath' => $photoPath,
            'mataKuliahs' => $mataKuliahs
        ]);
    }

    public function likePost($id)
    {
        $pertanyaan = Pertanyaan::find($id);

        if ($pertanyaan->liked()) {
            $pertanyaan->unlike();
        }else{
            $pertanyaan->like();
        }
        
        $pertanyaan->save();

        QuestionLiked::dispatch($pertanyaan->load(['likes']));
    }
}
