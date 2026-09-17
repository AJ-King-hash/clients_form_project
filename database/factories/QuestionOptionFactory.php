<?php

namespace Database\Factories;

use App\Models\Question;
use Illuminate\Database\Factories\Factory;

/**
 * @extends Factory<QuestionOption>
 */
class QuestionOptionFactory extends Factory
{
    protected $model = \App\Models\QuestionOption::class;

    public function definition(): array
    {
        return [
            'question_id' => Question::factory(),
            'color_tag' => $this->faker->randomElement(['red', 'yellow', 'green', 'blue']),
            'score_weight' => $this->faker->randomElement([1, 2, 3]),
            'text' => $this->faker()->sentence(),
        ];
    }
}
