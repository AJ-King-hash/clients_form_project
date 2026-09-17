<?php

namespace Database\Factories;

use App\Models\AssessmentCategory;
use App\Models\GoalCta;
use Illuminate\Database\Factories\Factory;

/**
 * @extends Factory<GoalCta>
 */
class GoalCtaFactory extends Factory
{
    protected $model = GoalCta::class;

    public function definition(): array
    {
        return [
            'assessment_category_id' => AssessmentCategory::factory(),
            'color_tag' => $this->faker->randomElement(['red', 'yellow', 'green', 'blue']),
            'cta_text' => $this->faker()->paragraph(),
        ];
    }
}
