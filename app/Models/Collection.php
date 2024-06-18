<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\MorphPivot;

class Collection extends MorphPivot
{
    protected $keyType = 'string'; // Tipe kunci adalah string (UUID)
    public $incrementing = false; // Non-incrementing key

    // Definisikan atribut yang fillable jika perlu
    protected $fillable = ['collectible_id', 'collectible_type', 'pertanyaan_id'];
}
