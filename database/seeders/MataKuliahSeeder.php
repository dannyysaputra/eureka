<?php

namespace Database\Seeders;

use App\Models\MataKuliah;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class MataKuliahSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        MataKuliah::truncate();

        $json = File::get('database/data/mata-kuliah.json');
        $mataKuliahs = collect(json_decode($json));

        $mataKuliahs->each(function ($mataKuliah) {
            MataKuliah::insert([
                'jurusan_id' => $mataKuliah->jurusan_id,
                'kode_matkul' => $mataKuliah->kode_matkul,
                'nama_matkul' => $mataKuliah->nama_matkul,
                'sks' => $mataKuliah->sks,
                'semester' => $mataKuliah->semester,
            ]);
        });
    }
}
