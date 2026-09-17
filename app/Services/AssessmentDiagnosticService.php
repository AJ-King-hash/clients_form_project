<?php

namespace App\Services;

use App\Models\AssessmentCategory;
use App\Models\AssessmentSubmission;
use App\Models\DiagnosticRule;
use App\Models\GoalCta;
use App\Models\QuestionOption;
use Illuminate\Support\Str;

class AssessmentDiagnosticService
{
    public function calculateAndEvaluate(
        AssessmentCategory $category,
        array $answers,
        array $leadData
    ): AssessmentSubmission {
        // 1. Fetch options for Q1-Q6
        $q1ToQ6Answers = array_slice($answers, 0, 6, true);
        $options = QuestionOption::whereIn('id', array_values($q1ToQ6Answers))->get();

        $totalScore = $options->sum('score_weight');
        $blueCount = $options->where('color_tag', 'blue')->count();

        // 2. Determine Triggered Tier
        if ($blueCount >= 3) {
            $triggeredTier = 4;
            $rule = DiagnosticRule::where('assessment_category_id', $category->id)
                ->where('is_special_foundation', true)
                ->first();
        } else {
            $rule = DiagnosticRule::where('assessment_category_id', $category->id)
                ->where('is_special_foundation', false)
                ->where('min_score', '<=', $totalScore)
                ->where('max_score', '>=', $totalScore)
                ->first();

            $triggeredTier = $rule ? $rule->result_tier : 1;
        }

        // 3. Process Question 7 Goal CTA
        $q7OptionId = end($answers);
        $q7Option = QuestionOption::find($q7OptionId);
        $goalTag = $q7Option ? $q7Option->color_tag : 'red';

        $goalCta = GoalCta::where('assessment_category_id', $category->id)
            ->where('color_tag', $goalTag)
            ->first();

        // 4. Build JSON Snapshot
        $reportSnapshot = [
            'category_title' => $category->title,
            'stage_title' => $rule->stage_title ?? '',
            'current_diagnosis' => $rule->current_diagnosis ?? '',
            'technical_analysis' => $rule->technical_analysis ?? '',
            'recommendation_cta' => $rule->recommendation_cta ?? '',
            'goal_cta_text' => $goalCta->cta_text ?? '',
            'score' => $totalScore,
            'blue_count' => $blueCount,
            'tier' => $triggeredTier,
        ];

        // 5. Store AssessmentSubmission
        return AssessmentSubmission::create([
            'uuid' => (string) Str::uuid(),
            'assessment_category_id' => $category->id,
            'lead_name' => $leadData['name'],
            'lead_phone' => $leadData['phone'],
            'lead_business_name' => $leadData['business_name'],
            'lead_email' => $leadData['email'] ?? null,
            'total_score' => $totalScore,
            'blue_answers_count' => $blueCount,
            'triggered_tier' => $triggeredTier,
            'selected_goal_tag' => $goalTag,
            'preliminary_teaser' => $rule->preliminary_teaser ?? '',
            'full_report_json' => $reportSnapshot,
        ]);
    }

    public function evaluateTeaser(
        AssessmentCategory $category,
        array $answers
    ): array {
        $q1ToQ6Answers = array_slice($answers, 0, 6, true);
        $options = QuestionOption::whereIn('id', array_values($q1ToQ6Answers))->get();

        $totalScore = $options->sum('score_weight');
        $blueCount = $options->where('color_tag', 'blue')->count();

        if ($blueCount >= 3) {
            $rule = DiagnosticRule::where('assessment_category_id', $category->id)
                ->where('is_special_foundation', true)
                ->first();
        } else {
            $rule = DiagnosticRule::where('assessment_category_id', $category->id)
                ->where('is_special_foundation', false)
                ->where('min_score', '<=', $totalScore)
                ->where('max_score', '>=', $totalScore)
                ->first();
        }

        return [
            'preliminary_teaser' => $rule->preliminary_teaser ?? '',
            'stage_title' => $rule->stage_title ?? '',
            'score' => $totalScore,
            'blue_count' => $blueCount,
        ];
    }
}
