<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AssessmentSubmission extends Model
{
    protected $fillable = [
        'uuid',
        'assessment_category_id',
        'lead_name',
        'lead_phone',
        'lead_business_name',
        'lead_email',
        'total_score',
        'blue_answers_count',
        'triggered_tier',
        'selected_goal_tag',
        'preliminary_teaser',
        'full_report_json',
    ];

    protected $casts = [
        'full_report_json' => 'array',
    ];

    public function assessmentCategory(): BelongsTo
    {
        return $this->belongsTo(AssessmentCategory::class);
    }
}
