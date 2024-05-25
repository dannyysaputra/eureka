<?php

namespace App\Models;

use Conner\Likeable\Likeable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Jawaban extends Model
{
    use HasFactory, Likeable;

    protected $guarded = [
        'id'
    ];

    protected $casts = [
        'is_validated' => 'boolean',
    ];  

    public function pertanyaan(): BelongsTo
    {
        return $this->belongsTo(Pertanyaan::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
