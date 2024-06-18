<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Dosen extends Authenticatable
{
    use HasFactory, HasUuids;

    protected $guarded = [
        'id'
    ];

    public function jurusan(): BelongsTo
    {
        return $this->belongsTo(Jurusan::class);
    }

    public function collectedPertanyaans()
    {
        return $this->morphedByMany(Pertanyaan::class, 'collectible', 'collections', 'collectible_id', 'pertanyaan_id')
            ->withPivot('collectible_type');
    }

    public function jawabans(): HasMany
    {
        return $this->hasMany(Jawaban::class);
    }
}
