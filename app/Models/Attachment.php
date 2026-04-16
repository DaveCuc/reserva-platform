<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Attachment extends Model
{
    use HasUuids;

    protected $fillable = [
        'name',
        'url',
        'course_id'
    ];

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }
}
