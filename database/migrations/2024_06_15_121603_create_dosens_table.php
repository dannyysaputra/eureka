<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('dosens', function (Blueprint $table) {
            $table->id();
            // $table->uuid('id')->primary();
            $table->foreignId('jurusan_id')->constrained('jurusans');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('nip')->unique();
            $table->string('password');
            $table->string('avatar')->nullable();
            $table->string('role')->default('dosen');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dosens');
    }
};
