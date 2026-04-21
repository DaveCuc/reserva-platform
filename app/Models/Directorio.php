<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Directorio extends Model
{
    use HasUuids;

    protected $fillable = [
        'user_id',
        'comercial_name',
        'giro',
        'region',
        'region_id',
        'municipio_id',
        'name',
        'descripcion',
        'website',
        'digital',
        'image_url',
        'is_published',
        'status',
        'address',
        'map_location',
        'phone',
        'email',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'status' => 'string',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function giros(): BelongsToMany
    {
        return $this->belongsToMany(Giro::class, 'directorio_giro');
    }

    public function region(): BelongsTo
    {
        return $this->belongsTo(Region::class);
    }

    public function municipio(): BelongsTo
    {
        return $this->belongsTo(Municipio::class);
    }
}
