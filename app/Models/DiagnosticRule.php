<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Translatable\HasTranslations;

class DiagnosticRule extends Model
{
    use HasFactory;
    use HasTranslations;

    protected $fillable = [
        'assessment_category_id',
        'result_tier',
        'min_score',
        'max_score',
        'is_special_foundation',
        'preliminary_teaser',
        'stage_title',
        'current_diagnosis',
        'technical_analysis',
        'recommendation_cta',
    ];

    public array $translatable = [
        'preliminary_teaser',
        'stage_title',
        'current_diagnosis',
        'technical_analysis',
        'recommendation_cta',
    ];

    public function assessmentCategory(): BelongsTo
    {
        return $this->belongsTo(AssessmentCategory::class);
    }
}