<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Translatable\HasTranslations;

class GoalCta extends Model
{
    use HasTranslations;

    protected $fillable = [
        'assessment_category_id',
        'color_tag',
        'cta_text',
    ];

    public array $translatable = ['cta_text'];

    public function assessmentCategory(): BelongsTo
    {
        return $this->belongsTo(AssessmentCategory::class);
    }
}