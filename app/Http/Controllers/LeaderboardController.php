<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LeaderboardController extends Controller
{
    public function index()
    {
        $users = User::orderBy('points', 'desc')
            ->take('10')
            ->with('jurusan')
            ->get();

        $photoPath = '/images/nav-bg.png';

        return Inertia::render('Leaderboard', [
            'users' => $users,
            'photoPath' => $photoPath
        ]);
    }
}
