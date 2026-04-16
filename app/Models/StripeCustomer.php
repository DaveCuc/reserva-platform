<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class StripeCustomer extends Model
{
    use HasUuids;

    protected $fillable = [
        'user_id',
        'stripe_customer_id'
    ];
}
