<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
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
        // $pertanyaans = Pertanyaan::where('user_id', $user->id)->get()->toArray();
        // $pertanyaans = $user->pertanyaan;
        // $jawabans = Jawaban::where('user_id', $user->id)->get();
        $user->pertanyaan;
        $user->jawabans;

        // dd($user);

        $photoPath = '/images/nav-bg.png';

        return Inertia::render('Profile', [
            // 'pertanyaans', $pertanyaans,
            // 'jawabans', $jawabans,
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
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
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
