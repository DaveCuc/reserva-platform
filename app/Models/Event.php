<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Event extends Model
{
    use HasUuids;

    protected $fillable = [
        'user_id',
        'title',
        'short_description',
        'description',
        'location',
        'event_date',
        'event_time',
        'rsvp_link',
        'image_url',
        'cover_image_url',
        'is_published',
        'published_at',
        'topics',
        'hosts',
        'collaborators',
        'organizers',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'published_at' => 'datetime',
        'event_date' => 'date',
        'topics' => 'array',
        'hosts' => 'array',
        'collaborators' => 'array',
        'organizers' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
