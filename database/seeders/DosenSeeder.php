<?php

namespace Database\Seeders;

use App\Models\Dosen;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DosenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Dosen::insert([
            // 'id' => Str::uuid(),
            'jurusan_id' => '1',
            'name' => 'Wisnu Uriawan',
            'email' => 'wisnu_u@uinsgd.ac.id',
            'nip' => '0418117801',
            'password' => Hash::make('dosen12345')
        ]);
    }
}
