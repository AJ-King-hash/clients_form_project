<?php

use App\Http\Controllers\AssessmentController;
use Illuminate\Foundation\Http\Middleware\PreventRequestForgery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Public assessment landing page at root
Route::get('/', [AssessmentController::class, 'wizard'])->name('home');

// Language switcher
Route::post('/locale', function (Request $request) {
    $request->validate(['locale' => 'required|in:en,ar']);

    return response()->redirectTo("/")->cookie('locale', $request->locale, 525600);
})->name('locale.update');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

// Assessment wizard (public - no auth required for the form)
Route::get('/assessment', [AssessmentController::class, 'wizard'])->name('assessment.wizard');

// Scoring + submission endpoints (no auth required - public form)
Route::post('/assessment/evaluate-teaser', [AssessmentController::class, 'evaluateTeaser'])
    ->name('assessment.evaluate-teaser')
    ->withoutMiddleware([PreventRequestForgery::class]);

Route::post('/assessment/submit', [AssessmentController::class, 'submit'])
    ->name('assessment.submit')
    ->withoutMiddleware([PreventRequestForgery::class]);

require __DIR__.'/settings.php';
