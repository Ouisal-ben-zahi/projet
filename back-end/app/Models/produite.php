<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class produite extends Model
{
    use HasFactory;

    protected $table = 'produites';

    protected $fillable = [
        'nom',
        'image',
        'description',
        'prix',
        'date',
        'quantité',
        'id_categorie',
    ];

    protected $casts = [
        'prix' => 'float',
        'quantité' => 'integer',
        'date' => 'date'
    ];

    // Relation avec la catégorie
    public function categorie()
    {
        return $this->belongsTo(Category::class, 'id_categorie');
    }
}
