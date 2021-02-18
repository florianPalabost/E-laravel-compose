<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'description',
        'price',
        'category_id',
        'stock'
    ];

    public function category() {
        return $this->belongsTo(Category::class, 'category_id');
    }
}
