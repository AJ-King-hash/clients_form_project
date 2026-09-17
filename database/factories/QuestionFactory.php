<?php

namespace Database\Factories;

use App\Models\AssessmentCategory;
use App\Models\Question;
use Illuminate\Database\Factories\Factory;

/**
 * @extends Factory<Question>
 */
class QuestionFactory extends Factory
{
    protected $model = Question::class;

    public function definition(): array
    {
        return [
            'assessment_category_id' => AssessmentCategory::factory(),
            'question_number' => $this->faker->numberBetween(1, 7),
            'text' => $this->faker()->sentence(),
            'is_goal_question' => false,
        ];
    }
}
