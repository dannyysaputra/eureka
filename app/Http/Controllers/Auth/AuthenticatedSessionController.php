<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        $photoPath = '/images/form-bg.png';
        $backgroundPath = '/images/auth-bg.png';

        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
            'photoPath' => $photoPath,
            'backgroundPath' => $backgroundPath
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    // public function store(LoginRequest $request): RedirectResponse
    // {
    //     $request->authenticate();

    //     $request->session()->regenerate();
    //     return redirect()->intended(route('pertanyaan', absolute: false));

    //     // Determine the authenticated guard and redirect accordingly
    //     // if (Auth::guard('dosen')->check()) {
    //     //     return redirect()->intended(route('pertanyaan'));
    //     // } else if (Auth::guard('web')->check()) {
    //     //     // dd(session()->all());
    //     //     return redirect()->intended(route('pertanyaan'));
    //     // }

    //     // // Default redirect if no guard matches (optional)
    //     // return redirect()->intended(route('login'));
    // }

    public function store(Request $request)
    {
        $credentials = $request->validate(
            [
                'email' => 'required',
                'password' => 'required',
            ]
        );

        if (Auth::guard('web')->attempt($credentials)) {
            $request->session()->regenerate();
            // dd(session()->all());
            return redirect()->intended(route('pertanyaan'));
        }

        return back()->with('failed', 'Percobaan masuk gagal. Silahkan coba lagi!');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        // dd(Auth::guard('web')->check());

        Auth::guard('web')->logout();
        Auth::guard('dosens')->logout();

        // dd(session()->all());
    
        $request->session()->invalidate();
        $request->session()->regenerateToken();
    
        return redirect('/');
    }
}
