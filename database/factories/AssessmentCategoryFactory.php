<?php

namespace Database\Factories;

use App\Models\AssessmentCategory;
use Illuminate\Database\Factories\Factory;

/**
 * @extends Factory<AssessmentCategory>
 */
class AssessmentCategoryFactory extends Factory
{
    protected $model = AssessmentCategory::class;

    public function definition(): array
    {
        return [
            'slug' => $this->faker->unique()->slug(),
            'title' => $this->faker()->catchPhrase(),
            'description' => $this->faker()->paragraph(),
        ];
    }
}
