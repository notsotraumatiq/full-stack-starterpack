<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Sanctum\HasApiTokens; // Import the HasApiTokens trait

class Contact extends Model
{
    use HasApiTokens; // Use the trait in your model

    protected $primaryKey = 'id';

    protected $fillable = ['first_name', 'last_name', 'email', 'phone'];

    public function histories(): HasMany
    {
        return $this->hasMany(ContactHistory::class);
    }
}
