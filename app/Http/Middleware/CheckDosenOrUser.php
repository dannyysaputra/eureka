<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckDosenOrUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // return $next($request);
        $guard = session('guard');

        // Check if the user is authenticated with either 'web' or 'dosen' guard
        if ($guard && Auth::guard($guard)->check()) {
            return $next($request);
        }

        // Redirect to login if not authenticated
        return redirect()->route('login');
    }
    // public function handle(Request $request, Closure $next, $userType): Response
    // {
    //     if(auth()->user()->type == $userType){
    //         return $next($request);
    //     }
          
    //     return redirect()->route('login');
    // }
}
