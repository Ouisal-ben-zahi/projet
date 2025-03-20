<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_utilisateur',
        'total',
        'status',
        'date_commande',
        'date_livraison',
    ];

    // Relation avec l'utilisateur
    public function utilisateur()
    {
        return $this->belongsTo(User::class, 'id_utilisateur');
    }

    // Relation avec les lignes de commande (une commande a plusieurs lignes)
    public function ligneCommandes()
    {
        return $this->hasMany(LigneCommande::class, 'id_commande');
    }
}
