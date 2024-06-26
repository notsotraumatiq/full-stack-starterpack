<?php

namespace App\Models;


use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
class ContactHistory extends Model
{
    use HasApiTokens;
    protected $fillable = ['contact_id', 'first_name', 'last_name', 'email', 'phone', 'changed_at'];


    public $timestamps = false;

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }
}
