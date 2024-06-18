<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Jurusan extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_jurusan'
    ];

    public function mataKuliahs() : HasMany
    {
        return $this->hasMany(MataKuliah::class);
    }

    public function users() : HasMany
    {
        return $this->hasMany(User::class);
    }

    public function dosens() : HasMany
    {
        return $this->hasMany(Dosen::class);
    }
}
