<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserProgress extends Model
{
    use HasUuids;

    protected $table = 'user_progress';

    protected $fillable = [
        'user_id',
        'chapter_id',
        'is_completed'
    ];

    protected $casts = [
        'is_completed' => 'boolean',
    ];

    public function chapter(): BelongsTo
    {
        return $this->belongsTo(Chapter::class);
    }
}
