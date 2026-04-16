<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Purchase extends Model
{
    use HasUuids;

    protected $fillable = [
        'user_id',
        'course_id'
    ];

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }
}
