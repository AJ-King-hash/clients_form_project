<?php

namespace App\Services;

use App\Models\AssessmentCategory;
use App\Models\AssessmentSubmission;
use App\Models\DiagnosticRule;
use App\Models\GoalCta;
use App\Models\QuestionOption;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use RuntimeException;

class AssessmentDiagnosticService
{
    public function calculateAndEvaluate(
        AssessmentCategory $category,
        array $answers,
        array $leadData
    ): AssessmentSubmission {
        $evaluation = $this->evaluate($category, $answers);

        return AssessmentSubmission::create([
            'uuid' => (string) Str::uuid(),
            'assessment_category_id' => $category->id,
            'lead_name' => $leadData['name'],
            'lead_phone' => $leadData['phone'],
            'lead_business_name' => $leadData['business_name'],
            'lead_email' => $leadData['email'] ?? null,
            'total_score' => $evaluation['total_score'],
            'blue_answers_count' => $evaluation['blue_count'],
            'triggered_tier' => $evaluation['tier'],
            'selected_goal_tag' => $evaluation['goal_tag'],
            'preliminary_teaser' => $evaluation['rule']->preliminary_teaser ?? '',
            'full_report_json' => [
                'category_title' => $category->title,
                'stage_title' => $evaluation['rule']->stage_title ?? '',
                'current_diagnosis' => $evaluation['rule']->current_diagnosis ?? '',
                'technical_analysis' => $evaluation['rule']->technical_analysis ?? '',
                'recommendation_cta' => $evaluation['rule']->recommendation_cta ?? '',
                'goal_cta_text' => $evaluation['goal_cta']->cta_text ?? '',
                'score' => $evaluation['total_score'],
                'blue_count' => $evaluation['blue_count'],
                'tier' => $evaluation['tier'],
            ],
        ]);
    }

    public function evaluateTeaser(
        AssessmentCategory $category,
        array $answers
    ): array {
        $evaluation = $this->evaluate($category, $answers, requireGoal: false);

        return [
            'preliminary_teaser' => $evaluation['rule']->preliminary_teaser ?? '',
            'stage_title' => $evaluation['rule']->stage_title ?? '',
            'score' => $evaluation['total_score'],
            'blue_count' => $evaluation['blue_count'],
        ];
    }

    /**
     * @param array<int, int> $answers
     *
     * @return array{
     *     total_score: int,
     *     blue_count: int,
     *     tier: int,
     *     goal_tag: ?string,
     *     rule: DiagnosticRule,
     *     goal_cta: ?GoalCta
     * }
     */
    private function evaluate(
        AssessmentCategory $category,
        array $answers,
        bool $requireGoal = true,
    ): array {
        $scoringOptions = $this->scoringOptions($category, $answers);

        if ($scoringOptions->count() !== 6) {
            throw new RuntimeException('Exactly six scoring answers are required.');
        }

        $totalScore = $scoringOptions->sum('score_weight');
        $blueCount = $scoringOptions->where('color_tag', 'blue')->count();

        $rule = $blueCount >= 3
            ? $category->diagnosticRules()
                ->where('is_special_foundation', true)
                ->first()
            : $category->diagnosticRules()
                ->where('is_special_foundation', false)
                ->where('min_score', '<=', $totalScore)
                ->where('max_score', '>=', $totalScore)
                ->first();

        if ($rule === null) {
            throw new RuntimeException('No diagnostic rule matches the assessment score.');
        }

        $goalQuestion = $category->questions()
            ->where('is_goal_question', true)
            ->with('options')
            ->first();

        $goalOption = $goalQuestion?->options->firstWhere(
            'id',
            $answers[$goalQuestion->id] ?? null,
        );

        $goalCta = null;

        if ($requireGoal) {
            if ($goalOption === null) {
                throw new RuntimeException('A goal answer is required.');
            }

            $goalCta = $category->goalCtas()
                ->where('color_tag', $goalOption->color_tag)
                ->first();

            if ($goalCta === null) {
                throw new RuntimeException('No goal CTA matches the selected goal.');
            }
        }

        return [
            'total_score' => $totalScore,
            'blue_count' => $blueCount,
            'tier' => $rule->result_tier,
            'goal_tag' => $goalOption?->color_tag,
            'rule' => $rule,
            'goal_cta' => $goalCta,
        ];
    }

    private function scoringOptions(
        AssessmentCategory $category,
        array $answers
    ): Collection {
        $questions = $category->questions()
            ->where('is_goal_question', false)
            ->orderBy('question_number')
            ->with('options')
            ->get(['id']);

        return $questions
            ->map(fn ($question) => $question->options->firstWhere(
                'id',
                $answers[$question->id] ?? null,
            ))
            ->filter();
    }
}
