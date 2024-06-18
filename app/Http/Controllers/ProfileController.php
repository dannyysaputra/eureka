<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Dosen;
use App\Models\Jawaban;
use App\Models\Jurusan;
use App\Models\Pertanyaan;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $jurusan = Jurusan::find($user->jurusan_id);
        $user->pertanyaan;
        $user->jawabans;

        $photoPath = '/images/nav-bg.png';

        return Inertia::render('Profile', [
            'user' => $user,
            'jurusan' => $jurusan,
            'photoPath' => $photoPath,
        ]);
    }
    
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        // $user = Auth::user();
        $jurusans = Jurusan::all();

        $photoPath = '/images/nav-bg.png';

        return Inertia::render('Profile/EditProfile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'photoPath' => $photoPath,
            // 'user' => $user,
            'jurusans' => $jurusans,
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = Auth::user();
        $data = $request->validated();
        // dd($data);

        $user->jurusan_id = (int) $data['jurusanId'];

        if ($user->role === 'dosen') {
            $user->nip = $data['nip'] ?? $user->nip;
        } else {
            $user->nim = $data['nim'] ?? $user->nim;
            $user->angkatan = $data['angkatan'] ?? $user->angkatan;
        }

        $user->fill($data);

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        if ($user->role === 'dosen') {
            return Redirect::route('dosen.profile.edit')->with('status', 'Profile updated!');
        } else {
            return Redirect::route('profile.edit')->with('status', 'Profile updated!');
        }
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
