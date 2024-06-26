<?php

namespace App\Models;

use Conner\Likeable\Likeable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Pertanyaan extends Model
{
    use HasFactory, HasUuids, Likeable;

    protected $guarded = [
        'id'
    ];

    protected $casts = [
        'is_answered' => 'boolean',
    ];

    public function mataKuliah(): BelongsTo
    {
        return $this->belongsTo(MataKuliah::class, 'matkul_id'); 
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function jawabans(): HasMany
    {
        return $this->hasMany(Jawaban::class);
    }

    public function collectors()
    {
        return $this->morphToMany(User::class, 'collectible', 'collections', 'pertanyaan_id', 'collectible_id')
            ->withPivot('collectible_type');
    }

    public function dosenCollectors()
    {
        return $this->morphToMany(Dosen::class, 'collectible', 'collections', 'pertanyaan_id', 'collectible_id')
            ->withPivot('collectible_type');
    }
}
