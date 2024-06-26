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

        $userId = null;
        $dosenId = null;
        $valid = false;

        if ($user->role === 'dosen') {
            $dosenId = $user->id;
            $valid = true;
        } else {
            $userId = $user->id;
        }

        $request->validate([
            'deskripsiJawaban' => 'required',
            'pertanyaanId' => 'required',
        ]);

        $jawaban = Jawaban::create([
            'deskripsi_jawaban' => $request->deskripsiJawaban,
            'pertanyaan_id' => $request->pertanyaanId,
            'is_validated' => $valid,
            'user_id' => $userId,
            'dosen_id' => $dosenId
        ]);

        if ($userId !== null) {
            $user->addPoints(10);
        }

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
        $user = $jawaban->user;

        if ($jawaban->is_validated) {
            $jawaban->is_validated = false;
            $user->minusPoints(25);
        } else {
            $user->addPoints(25);
            $jawaban->is_validated = true;
        }

        
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
