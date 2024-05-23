<?php

namespace App\Http\Controllers;

use App\Events\AnswerLiked;
use App\Models\Jawaban;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AnswerController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $user = Auth::user();

        $request->validate([
            'deskripsiJawaban' => 'required',
            'pertanyaanId' => 'required',
        ]);

        $jawaban = Jawaban::create([
            'deskripsi_jawaban' => $request->deskripsiJawaban,
            'pertanyaan_id' => $request->pertanyaanId,
            'user_id' => $user->id
        ]);

        $jawaban->save();

        return redirect(route('pertanyaan', absolute: false));
    }

    public function likeAnswer($id)
    {
        $jawaban = Jawaban::find($id);

        if ($jawaban->liked()) {
            $jawaban->unlike();
        }else{
            $jawaban->like();
        }
        
        $jawaban->load('likes');

        AnswerLiked::dispatch($jawaban);
    }
}