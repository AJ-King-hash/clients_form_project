<?php

namespace Database\Factories;

use App\Models\AssessmentCategory;
use App\Models\DiagnosticRule;
use Illuminate\Database\Factories\Factory;

/**
 * @extends Factory<DiagnosticRule>
 */
class DiagnosticRuleFactory extends Factory
{
    protected $model = DiagnosticRule::class;

    public function definition(): array
    {
        return [
            'assessment_category_id' => AssessmentCategory::factory(),
            'result_tier' => $this->faker->numberBetween(1, 4),
            'min_score' => 0,
            'max_score' => 18,
            'is_special_foundation' => false,
            'preliminary_teaser' => $this->faker()->sentence(),
            'stage_title' => $this->faker()->catchPhrase(),
            'current_diagnosis' => $this->faker()->paragraph(),
            'technical_analysis' => $this->faker()->paragraph(),
            'recommendation_cta' => $this->faker()->sentence(),
        ];
    }
}
