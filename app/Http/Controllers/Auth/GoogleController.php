<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
    public function signInwithGoogle() {
        return Socialite::driver('google')->redirect();
    }

    public function callbackToGoogle() {
        try {
            $user = Socialite::driver('google')->user();

            $finduser = User::where('social_id', $user->id)->first();

            if ($finduser) {
                Auth::login($finduser);

                return redirect(route('dashboard', absolute: false));
            } else {
                $newUser = User::create([
                    'name' => $user->name,
                    'email' => $user->email,
                    'nim' => $this->generateUniqueNim(),
                    'angkatan' => '2222',
                    'jurusan' => 'ti',
                    'social_id' => $user->id,
                    'social_type' => 'google',
                    'password' => encrypt('password12345')
                ]);

                Auth::login($newUser);

                return redirect(route('dashboard', absolute: false));
            }
        } catch (Exeception $e) {
            dd($e->getMessage());
        }
    }

    public function generateUniqueNim() {
        do {
            $nim = random_int(100000, 999999);
        } while (User::where("nim", "=", $nim)->first());
        return $nim;
    }
}
