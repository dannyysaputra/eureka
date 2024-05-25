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
        Schema::table('jawabans', function (Blueprint $table) {
            $table->boolean('is_validated')->default(false); 
        });

        Schema::table('pertanyaans', function (Blueprint $table) {
            $table->boolean('is_answered')->default(false); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('jawabans', function (Blueprint $table) {
            $table->dropColumn('is_validated');
        });

        Schema::table('pertanyaans', function (Blueprint $table) {
            $table->dropColumn('is_answered');
        });
    }
};
