<?php

namespace App\Http\Controllers;

use App\Models\AssessmentCategory;
use App\Models\QuestionOption;
use App\Services\AssessmentDiagnosticService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class AssessmentController extends Controller
{
    public function __construct(
        private AssessmentDiagnosticService $diagnosticService
    ) {}

    public function wizard(): Response
    {
        $categories = AssessmentCategory::with([
            'questions.options' => fn ($query) => $query->orderBy('question_number'),
        ])->get()->map(fn ($cat) => [
            'id' => $cat->id,
            'slug' => $cat->slug,
            'title' => $cat->title,
            'description' => $cat->description,
            'questions' => $cat->questions->map(fn ($q) => [
                'id' => $q->id,
                'question_number' => $q->question_number,
                'text' => $q->text,
                'is_goal_question' => $q->is_goal_question,
                'options' => $q->options->map(fn ($opt) => [
                    'id' => $opt->id,
                    'color_tag' => $opt->color_tag,
                    'score_weight' => $opt->score_weight,
                    'text' => $opt->text,
                ]),
            ]),
        ]);

        $locale = app()->getLocale();
        $translations = __('assessment', [], $locale);

        return Inertia::render('assessment', [
            'categories' => $categories,
            'whatsappNumber' => config('assessment.whatsapp_number'),
            'locale' => $locale,
            'translations' => $translations,
        ]);
    }

    public function evaluateTeaser(Request $request): JsonResponse
    {
        [$category, $answers] = $this->validatedAssessmentAnswers($request, 6);
        $teaser = $this->diagnosticService->evaluateTeaser($category, $answers);

        return response()->json($teaser);
    }

    public function submit(Request $request): JsonResponse
    {
        [$category, $answers] = $this->validatedAssessmentAnswers($request, 7);
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:255'],
            'business_name' => ['required', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
        ]);
        $leadData = [
            'name' => trim($validated['name']),
            'phone' => trim($validated['phone']),
            'business_name' => trim($validated['business_name']),
            'email' => $validated['email'] ? trim($validated['email']) : null,
        ];

        $submission = $this->diagnosticService->calculateAndEvaluate(
            $category,
            $answers,
            $leadData,
        );

        return response()->json([
            'uuid' => $submission->uuid,
            'report' => $submission->full_report_json,
        ]);
    }

    /**
     * @return array{0: AssessmentCategory, 1: array<int, int>}
     */
    private function validatedAssessmentAnswers(Request $request, int $answerCount): array
    {
        $validated = $request->validate([
            'category_slug' => ['required', 'string', 'exists:assessment_categories,slug'],
        ]);

        $category = AssessmentCategory::where('slug', $validated['category_slug'])->firstOrFail();
        $optionIds = QuestionOption::query()
            ->whereHas(
                'question',
                fn ($query) => $query->where('assessment_category_id', $category->id),
            )
            ->pluck('id')
            ->all();

        $validated = $request->validate([
            'answers' => ['required', 'array', "size:{$answerCount}", 'distinct'],
            'answers.*' => ['required', 'integer', Rule::in($optionIds)],
        ]);

        return [$category, $validated['answers']];
    }
}
