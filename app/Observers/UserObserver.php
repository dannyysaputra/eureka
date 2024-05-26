<?php

namespace App\Observers;

use App\Models\User;

class UserObserver
{
    /**
     * Handle the User "saving" event.
     *
     * @param  \App\Models\User  $user
     * @return void
     */
    public function saving(User $user)
    {
        $user->level = $this->calculateLevel($user->points);
    }

    /**
     * Calculate the user level based on points.
     *
     * @param  int  $points
     * @return string
     */
    private function calculateLevel($points)
    {
        if ($points >= 675) {
            return 'Sang Sepuh';
        } elseif ($points >= 500) {
            return 'Dewa Kampus';
        } elseif ($points >= 350) {
            return 'Pahlawan Skripsi';
        } elseif ($points >= 225) {
            return 'Suhu Diskusi';
        } elseif ($points >= 125) {
            return 'Jago Nanya';
        } elseif ($points >= 50) {
            return 'Maba Bingung';
        } else {
            return 'Pemula';
        }
    }

    /**
     * Handle the User "updated" event.
     */
    public function updated(User $user): void
    {
        //
    }

    /**
     * Handle the User "deleted" event.
     */
    public function deleted(User $user): void
    {
        //
    }

    /**
     * Handle the User "restored" event.
     */
    public function restored(User $user): void
    {
        //
    }

    /**
     * Handle the User "force deleted" event.
     */
    public function forceDeleted(User $user): void
    {
        //
    }
}
