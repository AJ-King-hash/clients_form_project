<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Translatable\HasTranslations;

class QuestionOption extends Model
{
    use HasTranslations;

    protected $fillable = [
        'question_id',
        'color_tag',
        'score_weight',
        'text',
    ];

    public array $translatable = ['text'];

    public function question(): BelongsTo
    {
        return $this->belongsTo(Question::class);
    }
}