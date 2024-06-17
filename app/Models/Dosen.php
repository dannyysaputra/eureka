<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Dosen extends Authenticatable
{
    use HasFactory;

    protected $guarded = [
        'id'
    ];

    public function jurusan(): BelongsTo
    {
        return $this->belongsTo(Jurusan::class);
    }

    public function collectedPertanyaans()
    {
        return $this->morphedByMany(Pertanyaan::class, 'collectible', 'collections', 'collectible_id', 'pertanyaan_id');
    }
}
