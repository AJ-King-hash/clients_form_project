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
        Schema::create('goal_ctas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('assessment_category_id')->constrained()->onDelete('cascade');
            $table->enum('color_tag', ['red', 'yellow', 'green', 'blue']);
            $table->json('cta_text');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('goal_ctas');
    }
};