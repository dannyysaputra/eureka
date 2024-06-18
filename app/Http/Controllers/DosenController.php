<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DosenController extends Controller
{
    public function store(Request $request)
    {
        $credentials = $request->validate(
            [
                'email' => 'required',
                'password' => 'required',
            ]
        );

        if (Auth::guard('dosens')->attempt($credentials)) {
            $request->session()->regenerate();
            return redirect()->intended(route('dosen.pertanyaan'));
        }

        return back()->with('failed', 'Percobaan masuk gagal. Silahkan coba lagi!');
    }
}
