<?php

namespace Database\Factories;

use App\Models\AssessmentCategory;
use App\Models\AssessmentSubmission;
use Illuminate\Database\Factories\Factory;

/**
 * @extends Factory<AssessmentSubmission>
 */
class AssessmentSubmissionFactory extends Factory
{
    protected $model = AssessmentSubmission::class;

    public function definition(): array
    {
        return [
            'assessment_category_id' => AssessmentCategory::factory(),
            'lead_name' => $this->faker->name(),
            'lead_phone' => $this->faker->phoneNumber(),
            'lead_business_name' => $this->faker->company(),
            'lead_email' => $this->faker->email(),
            'total_score' => $this->faker->numberBetween(6, 18),
            'blue_answers_count' => $this->faker->numberBetween(0, 6),
            'triggered_tier' => $this->faker->numberBetween(1, 4),
            'selected_goal_tag' => $this->faker->randomElement(['red', 'yellow', 'green', 'blue']),
            'preliminary_teaser' => $this->faker()->sentence(),
            'full_report_json' => [],
        ];
    }
}
