<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Chapter extends Model
{
    use HasUuids;

    protected $fillable = [
        'title',
        'description',
        'video_url',
        'position',
        'is_published',
        'is_free',
        'course_id'
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'is_free' => 'boolean',
        'position' => 'integer',
    ];

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function muxData(): HasOne
    {
        return $this->hasOne(MuxData::class);
    }

    public function userProgress(): HasMany
    {
        return $this->hasMany(UserProgress::class);
    }
}
