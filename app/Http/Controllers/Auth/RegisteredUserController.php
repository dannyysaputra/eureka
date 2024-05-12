<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Jurusan;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        $photoPath = '/images/form-bg.png';
        $backgroundPath = '/images/auth-bg.png';
        $jurusans = Jurusan::all();

        return Inertia::render('Auth/Register', [
            'photoPath' => $photoPath, 
            'backgroundPath' => $backgroundPath,
            'jurusans' => $jurusans
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'nim' => 'required|string|lowercase|max:11|unique:'.User::class,
            'angkatan' => 'required|string|max:5',
            'jurusanId' => 'required',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'nim' => $request->nim,
            'angkatan' => $request->angkatan,
            'jurusan_id' => $request->jurusanId,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('pertanyaan', absolute: false));
    }
}
