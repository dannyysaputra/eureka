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

        $user->addPoints(10);

        $jawaban->save();

        return redirect()->back();
    }

    public function update(Request $request, $id) : RedirectResponse
    {
        $jawaban = Jawaban::findOrFail($id);

        $request->validate([
            'deskripsiJawaban' => 'required',
        ]);

        $jawaban->deskripsi_jawaban = $request->deskripsiJawaban;
        $jawaban->save();

        return redirect()->back();
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

    public function validateAnswer($id)
    {
        $jawaban = Jawaban::findOrFail($id);

        if ($jawaban->is_validated) {
            $jawaban->is_validated = false;
        } else {
            $jawaban->is_validated = true;
        }

        $user = $jawaban->user;
        $user->addPoints(25);
        
        $jawaban->save();

        $pertanyaan = $jawaban->pertanyaan;
        if (!$pertanyaan->jawabans()->where('is_validated', true)->exists()) {
            $pertanyaan->is_answered = false;
        } else {
            $pertanyaan->is_answered = true;
        }
        $pertanyaan->save();
        
        return redirect()->back()->with('success', 'Jawaban berhasil divalidasi.');
    }

    public function destroy($id): RedirectResponse
    {
        $jawaban = Jawaban::findOrFail($id);
        $jawaban->delete();

        return redirect()->back();
    }
}
