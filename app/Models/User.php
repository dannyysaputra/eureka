<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Observers\UserObserver;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable 
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [
        'id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    // protected $appends = ['level', 'rank_position'];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    protected static function boot()
    {
        parent::boot();
        self::observe(UserObserver::class);
    }

    public function addPoints($points) {
        $this->points += $points;
        $this->save();
    }

    public function minusPoints($points) {
        $this->points -= $points;
        $this->save();
    }

    public function getRankPositionAttribute()
    {
        $users = User::orderBy('points', 'desc')->get();
        foreach ($users as $index => $user) {
            if ($user->id === $this->id) {
                return $index + 1;  
            }
        }
        return null;
    }

    public function jurusan(): BelongsTo
    {
        return $this->belongsTo(Jurusan::class);
    }

    public function pertanyaan() : HasMany
    {
        return $this->hasMany(Pertanyaan::class);
    }

    public function jawabans(): HasMany
    {
        return $this->hasMany(Jawaban::class);
    }

    public function collectedPertanyaans()
    {
        return $this->morphedByMany(Pertanyaan::class, 'collectible', 'collections', 'collectible_id', 'pertanyaan_id');
    }
}
