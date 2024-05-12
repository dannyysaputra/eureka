<?php

namespace Database\Seeders;

use App\Models\Jurusan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class JurusanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Jurusan::truncate();

        $json = File::get('database/data/jurusan.json');
        $jurusans = collect(json_decode($json));

        $jurusans->each(function ($jurusan) {
            Jurusan::insert([
                'nama_jurusan' => $jurusan->nama_jurusan,
                'slug' => Str::of($jurusan->nama_jurusan)->slug('-')
            ]);
        }); 
    }
}
