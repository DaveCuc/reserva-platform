<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Directorio extends Model
{
    use HasUuids;

    protected $fillable = [
        'comercial_name',
        'giro',
        'region',
        'name',
        'descripcion',
        'address',
        'phone',
        'email'
    ];
}
