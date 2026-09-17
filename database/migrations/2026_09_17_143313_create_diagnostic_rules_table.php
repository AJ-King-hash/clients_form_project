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
        Schema::create('diagnostic_rules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('assessment_category_id')->constrained()->onDelete('cascade');
            $table->integer('result_tier');
            $table->integer('min_score');
            $table->integer('max_score');
            $table->boolean('is_special_foundation')->default(false);
            $table->json('preliminary_teaser');
            $table->json('stage_title');
            $table->json('current_diagnosis');
            $table->json('technical_analysis');
            $table->json('recommendation_cta');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('diagnostic_rules');
    }
};