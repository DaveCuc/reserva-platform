<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Region extends Model
{
    use HasUuids;

    protected $fillable = ['name'];

    public function municipios(): HasMany
    {
        return $this->hasMany(Municipio::class);
    }

    public function directorios(): HasMany
    {
        return $this->hasMany(Directorio::class);
    }
}
