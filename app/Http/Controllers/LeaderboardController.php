<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class LeaderboardController extends Controller
{
    public function index()
    {
        $photoPath = '/images/nav-bg.png';

        return Inertia::render('Leaderboard', [
            'photoPath' => $photoPath
        ]);
    }
}
