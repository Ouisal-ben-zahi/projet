<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LigneCommande extends Model
{
    use HasFactory;

    protected $fillable = [
        'quantité',
        'id_produite',
<<<<<<< HEAD
=======
        'id_commande',
        'id_utilisateur',
>>>>>>> dev
    ];

    // Relation avec le produit
    public function produit()
    {
        return $this->belongsTo(Produit::class, 'id_produite');
    }
}
