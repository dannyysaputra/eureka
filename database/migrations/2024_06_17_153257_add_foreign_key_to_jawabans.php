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
            // Drop the existing foreign key and column for user_id
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');
        });

        Schema::table('jawabans', function (Blueprint $table) {
            // Add the nullable user_id and dosen_id columns
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('cascade');
            $table->foreignId('dosen_id')->nullable()->constrained('dosens')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('jawabans', function (Blueprint $table) {
            // Drop the foreign keys and columns for user_id and dosen_id
            $table->dropForeign(['user_id']);
            $table->dropForeign(['dosen_id']);
            $table->dropColumn(['user_id', 'dosen_id']);
        });

        Schema::table('jawabans', function (Blueprint $table) {
            // Recreate the original user_id column
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
        });
    }
};
