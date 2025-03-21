<?php

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/bootstrap/app.php';

use Illuminate\Support\Facades\DB;
use App\Models\Produite;
use App\Models\Categorie;

// Assurez-vous d'avoir des catégories disponibles
$categories = Categorie::all();
if ($categories->count() < 3) {
    // Créer des catégories si nécessaire
    $categoryTypes = ['Plantes d\'intérieur', 'Plantes d\'extérieur', 'Fleurs coupées', 'Outils de jardinage', 'Pots et jardinières'];
    
    foreach ($categoryTypes as $type) {
        Categorie::create(['type' => $type]);
    }
    
    $categories = Categorie::all();
}

// Liste de produits à ajouter
$products = [
    // Plantes d'intérieur
    [
        'nom' => 'Monstera Deliciosa',
        'description' => 'Plante d\'intérieur populaire avec des feuilles découpées caractéristiques',
        'prix' => 120,
        'image' => 'monstera.jpg',
        'quantité' => 25,
        'id_categorie' => 1
    ],
    [
        'nom' => 'Ficus Lyrata',
        'description' => 'Également connue sous le nom de figuier à feuilles de violon, cette plante est parfaite pour les espaces lumineux',
        'prix' => 150,
        'image' => 'ficus.jpg',
        'quantité' => 15,
        'id_categorie' => 1
    ],
    [
        'nom' => 'Pothos Doré',
        'description' => 'Plante grimpante facile à entretenir avec des feuilles vertes et dorées',
        'prix' => 70,
        'image' => 'pothos.jpg',
        'quantité' => 30,
        'id_categorie' => 1
    ],
    
    // Plantes d'extérieur
    [
        'nom' => 'Lavande',
        'description' => 'Plante aromatique qui apporte couleur et parfum à votre jardin',
        'prix' => 45,
        'image' => 'lavande.jpg',
        'quantité' => 40,
        'id_categorie' => 2
    ],
    [
        'nom' => 'Rosier Grimpant',
        'description' => 'Rosier à fleurs doubles qui orne magnifiquement les treillages et pergolas',
        'prix' => 85,
        'image' => 'rosier.jpg',
        'quantité' => 20,
        'id_categorie' => 2
    ],
    [
        'nom' => 'Olivier',
        'description' => 'Arbre méditerranéen symbolisant la paix et la longévité',
        'prix' => 180,
        'image' => 'olivier.jpg',
        'quantité' => 12,
        'id_categorie' => 2
    ],
    
    // Fleurs coupées
    [
        'nom' => 'Bouquet de Roses',
        'description' => 'Bouquet élégant de roses fraîches en plusieurs coloris',
        'prix' => 95,
        'image' => 'roses.jpg',
        'quantité' => 50,
        'id_categorie' => 3
    ],
    [
        'nom' => 'Tulipes Assorties',
        'description' => 'Bouquet coloré de tulipes de saison',
        'prix' => 65,
        'image' => 'tulipes.jpg',
        'quantité' => 30,
        'id_categorie' => 3
    ],
    [
        'nom' => 'Lys Orientaux',
        'description' => 'Bouquet parfumé de lys orientaux blancs et roses',
        'prix' => 110,
        'image' => 'lys.jpg',
        'quantité' => 20,
        'id_categorie' => 3
    ],
    
    // Outils de jardinage
    [
        'nom' => 'Set d\'Outils de Jardinage',
        'description' => 'Ensemble complet d\'outils essentiels pour le jardinage quotidien',
        'prix' => 130,
        'image' => 'outils.jpg',
        'quantité' => 15,
        'id_categorie' => 4
    ],
    [
        'nom' => 'Sécateur Professionnel',
        'description' => 'Sécateur de qualité pour la taille précise de vos plantes',
        'prix' => 85,
        'image' => 'secateur.jpg',
        'quantité' => 25,
        'id_categorie' => 4
    ],
    
    // Pots et jardinières
    [
        'nom' => 'Pot en Céramique',
        'description' => 'Pot élégant en céramique pour plantes d\'intérieur',
        'prix' => 75,
        'image' => 'pot_ceramique.jpg',
        'quantité' => 20,
        'id_categorie' => 5
    ],
    [
        'nom' => 'Jardinière Suspendue',
        'description' => 'Jardinière décorative à suspendre pour plantes grimpantes',
        'prix' => 95,
        'image' => 'jardiniere.jpg',
        'quantité' => 15,
        'id_categorie' => 5
    ],
];

// Ajout des produits à la base de données
foreach ($products as $productData) {
    // Vérifiez si le produit existe déjà pour éviter les doublons
    $exists = Produite::where('nom', $productData['nom'])->exists();
    if (!$exists) {
        Produite::create($productData);
        echo "Produit ajouté: " . $productData['nom'] . "\n";
    } else {
        echo "Produit déjà existant: " . $productData['nom'] . "\n";
    }
}

echo "Base de données peuplée avec succès!\n"; 