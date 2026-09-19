<?php

namespace Tests\Feature;

use App\Models\AssessmentCategory;
use App\Models\AssessmentSubmission;
use App\Models\DiagnosticRule;
use App\Models\GoalCta;
use App\Models\Question;
use App\Models\QuestionOption;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class AssessmentControllerTest extends TestCase
{
    use RefreshDatabase;

    private function makeCategory(string $slug = 'written-content'): AssessmentCategory
    {
        $category = AssessmentCategory::factory()->create(['slug' => $slug]);
        $goalColor = 'green';

        foreach (range(1, 7) as $number) {
            $question = Question::factory()->for($category)->create([
                'question_number' => $number,
                'is_goal_question' => $number === 7,
            ]);

            foreach (range(1, 4) as $index) {
                QuestionOption::factory()->for($question)->create([
                    'color_tag' => $number === 7 && $index === 1 ? $goalColor : 'red',
                    'score_weight' => $number === 7 ? 0 : 1,
                ]);
            }
        }

        DiagnosticRule::factory()->for($category)->create([
            'min_score' => 0,
            'max_score' => 18,
            'is_special_foundation' => false,
        ]);

        GoalCta::factory()->for($category)->create(['color_tag' => $goalColor]);

        return $category;
    }

    private function nonGoalAnswers(AssessmentCategory $category): array
    {
        return $category->questions
            ->where('is_goal_question', false)
            ->mapWithKeys(fn ($question) => [$question->id => $question->options->first()->id])
            ->all();
    }

    #[Test]
    public function test_evaluate_teaser_returns_teaser_without_a_goal_answer(): void
    {
        $category = $this->makeCategory();

        $response = $this->postJson(route('assessment.evaluate-teaser'), [
            'category_slug' => $category->slug,
            'answers' => $this->nonGoalAnswers($category),
        ]);

        $response->assertOk()
            ->assertJsonPath('score', 6)
            ->assertJsonPath('blue_count', 0)
            ->assertJsonFragment(['stage_title' => $category->diagnosticRules->first()->stage_title]);
    }

    #[Test]
    public function test_evaluate_teaser_rejects_fewer_than_six_answers(): void
    {
        $category = $this->makeCategory();
        $answers = $this->nonGoalAnswers($category);
        array_pop($answers);

        $response = $this->postJson(route('assessment.evaluate-teaser'), [
            'category_slug' => $category->slug,
            'answers' => $answers,
        ]);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors('answers');
    }

    #[Test]
    public function test_evaluate_teaser_rejects_answer_ids_from_another_category(): void
    {
        $category = $this->makeCategory();
        $other = $this->makeCategory('other-category');
        $answers = $this->nonGoalAnswers($category);
        $answers[array_key_first($answers)] = $other->questions->first()->options->last()->id;

        $response = $this->postJson(route('assessment.evaluate-teaser'), [
            'category_slug' => $category->slug,
            'answers' => $answers,
        ]);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['answers.0', 'answers.']);
    }

    #[Test]
    public function test_submit_creates_submission_and_returns_reports(): void
    {
        $category = $this->makeCategory();
        $answers = $this->nonGoalAnswers($category);
        $goalQuestion = $category->questions->firstWhere('is_goal_question', true);
        $answers[$goalQuestion->id] = $goalQuestion->options->first()->id;

        $response = $this->postJson(route('assessment.submit'), [
            'category_slug' => $category->slug,
            'answers' => $answers,
            'name' => 'John Doe',
            'phone' => '0101234567',
            'business_name' => 'Acme',
            'email' => 'john@example.com',
        ]);

        $response->assertOk()
            ->assertJsonStructure(['uuid', 'report' => ['goal_cta_text', 'score', 'blue_count', 'tier']])
            ->assertJsonPath('report.score', 6)
            ->assertJsonPath('report.blue_count', 0)
            ->assertJsonPath('report.tier', 1);

        $this->assertSame(1, AssessmentSubmission::where('uuid', $response->json('uuid'))->count());
    }

    #[Test]
    public function test_submit_rejects_missing_goal_answer(): void
    {
        $category = $this->makeCategory();

        $response = $this->postJson(route('assessment.submit'), [
            'category_slug' => $category->slug,
            'answers' => $this->nonGoalAnswers($category),
            'name' => 'John Doe',
            'phone' => '0101234567',
            'business_name' => 'Acme',
        ]);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors('answers');
    }

    #[Test]
    public function test_submit_rejects_missing_lead_details(): void
    {
        $category = $this->makeCategory();
        $answers = $this->nonGoalAnswers($category);
        $goalQuestion = $category->questions->firstWhere('is_goal_question', true);
        $answers[$goalQuestion->id] = $goalQuestion->options->first()->id;

        $response = $this->postJson(route('assessment.submit'), [
            'category_slug' => $category->slug,
            'answers' => $answers,
        ]);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['name', 'phone', 'business_name']);
    }
}