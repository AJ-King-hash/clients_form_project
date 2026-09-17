<?php

namespace App\Http\Controllers;

use App\Models\AssessmentCategory;
use App\Services\AssessmentDiagnosticService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AssessmentController extends Controller
{
    public function __construct(
        private AssessmentDiagnosticService $diagnosticService
    ) {}

    public function wizard(): Response
    {
        $categories = AssessmentCategory::with(['questions.options' => function ($q) {
            $q->orderBy('question_number');
        }])->get()->map(fn ($cat) => [
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
        $validated = $request->validate([
            'category_slug' => 'required|string|exists:assessment_categories,slug',
            'answers' => 'required|array|size:6',
        ]);

        $category = AssessmentCategory::where('slug', $validated['category_slug'])->first();
        $teaser = $this->diagnosticService->evaluateTeaser($category, $validated['answers']);

        return response()->json($teaser);
    }

    public function submit(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'category_slug' => 'required|string|exists:assessment_categories,slug',
            'answers' => 'required|array|size:7',
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'business_name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
        ]);

        $category = AssessmentCategory::where('slug', $validated['category_slug'])->first();
        $leadData = [
            'name' => $validated['name'],
            'phone' => $validated['phone'],
            'business_name' => $validated['business_name'],
            'email' => $validated['email'] ?? null,
        ];

        $submission = $this->diagnosticService->calculateAndEvaluate(
            $category,
            $validated['answers'],
            $leadData
        );

        return response()->json([
            'uuid' => $submission->uuid,
            'report' => $submission->full_report_json,
        ]);
    }
}
