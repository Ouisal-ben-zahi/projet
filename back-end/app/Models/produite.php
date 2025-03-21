<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class produite extends Model
{
    use HasFactory;

<<<<<<< HEAD
=======
    protected $table = 'produites';

>>>>>>> dev
    protected $fillable = [
        'nom',
        'image',
        'description',
        'prix',
        'date',
        'quantité',
        'id_categorie',
    ];

<<<<<<< HEAD
=======
    protected $casts = [
        'prix' => 'float',
        'quantité' => 'integer',
        'date' => 'date'
    ];

>>>>>>> dev
    // Relation avec la catégorie
    public function categorie()
    {
        return $this->belongsTo(Category::class, 'id_categorie');
    }
}
