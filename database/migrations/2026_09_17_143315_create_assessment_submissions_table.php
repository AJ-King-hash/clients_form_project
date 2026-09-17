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
        Schema::create('assessment_submissions', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('assessment_category_id')->constrained()->onDelete('cascade');
            $table->string('lead_name');
            $table->string('lead_phone');
            $table->string('lead_business_name');
            $table->string('lead_email')->nullable();
            $table->integer('total_score');
            $table->integer('blue_answers_count');
            $table->integer('triggered_tier');
            $table->string('selected_goal_tag');
            $table->text('preliminary_teaser');
            $table->json('full_report_json');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assessment_submissions');
    }
};
