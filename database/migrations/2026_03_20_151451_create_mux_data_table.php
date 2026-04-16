<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('mux_data', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('asset_id');
            $table->string('playback_id')->nullable();
            $table->uuid('chapter_id')->unique();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mux_data');
    }
};
