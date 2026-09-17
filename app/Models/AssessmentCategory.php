<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Translatable\HasTranslations;

class AssessmentCategory extends Model
{
    use HasTranslations;

    protected $fillable = [
        'slug',
        'title',
        'description',
    ];

    public array $translatable = ['title', 'description'];

    public function questions(): HasMany
    {
        return $this->hasMany(Question::class);
    }

    public function diagnosticRules(): HasMany
    {
        return $this->hasMany(DiagnosticRule::class);
    }

    public function goalCtas(): HasMany
    {
        return $this->hasMany(GoalCta::class);
    }

    public function submissions(): HasMany
    {
        return $this->hasMany(AssessmentSubmission::class);
    }
}