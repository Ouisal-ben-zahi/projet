<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Categorie;  
use App\Models\Produite;   
use App\Models\LigneCommande;
use App\Models\Commande;
use App\Models\Paiement;
use App\Models\LigneAchat;
use App\Models\Achat;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Clear existing data - use Schema::disableForeignKeyConstraints to avoid foreign key errors
        Schema::disableForeignKeyConstraints();

        // Fix the table name to match your migration (ligne_commandes not ligneCommandes)
        DB::table('ligne_commandes')->truncate();
        DB::table('commandes')->truncate();
        DB::table('produites')->truncate();
        DB::table('categories')->truncate();
        DB::table('users')->truncate();

        Schema::enableForeignKeyConstraints();

        // Create sample users
        DB::table('users')->insert([
            [
                'nom' => 'Admin',
                'prenom' => 'User',
                'adress' => '123 Admin Street',
                'email' => 'admin@example.com',
                'password' => Hash::make('password'),
                'telephone' => '123456789',
                'role' => 'admin', // Use 'admin' enum value instead of is_admin boolean
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Regular',
                'prenom' => 'User',
                'adress' => '456 User Avenue',
                'email' => 'user@example.com',
                'password' => Hash::make('password'),
                'telephone' => '987654321',
                'role' => 'client', // Use 'client' enum value instead of is_admin boolean
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        // Create categories
        $categories = [
            ['type' => 'Plantes d\'intérieur', 'created_at' => now(), 'updated_at' => now()],
            ['type' => 'Plantes d\'extérieur', 'created_at' => now(), 'updated_at' => now()],
            ['type' => 'Fleurs coupées', 'created_at' => now(), 'updated_at' => now()],
            ['type' => 'Outils de jardinage', 'created_at' => now(), 'updated_at' => now()],
            ['type' => 'Pots et jardinières', 'created_at' => now(), 'updated_at' => now()],
        ];
        
        DB::table('categories')->insert($categories);

        // The images are already correctly named in your code
        $availableImages = [
            'plant1.jpg',
            'plant2.jpg',
            'plant3.jpg'
        ];

        // Products array (will be filled in the loop below)
        $products = [];

        // Create many products from your seed-products.php file
        $index = 0;
        $productTemplates = [
            // Catégorie 1 : Plantes d'intérieur
            [
                'nom' => 'Ficus Lyrata',
                'description' => 'Également connu sous le nom de figuier à feuilles de violon, ce ficus est apprécié pour ses grandes feuilles en forme de violon.',
            'prix' => 150.00,
                'quantité' => 15,
                'id_categorie' => 1,
            ],
            [
                'nom' => 'Monstera Deliciosa',
                'description' => 'Plante d\'intérieur populaire avec des feuilles découpées caractéristiques',
                'prix' => 120.00,
                'quantité' => 25,
                'id_categorie' => 1,
            ],
            [
                'nom' => 'Pothos Doré',
                'description' => 'Plante grimpante facile à entretenir avec des feuilles vertes et dorées',
                'prix' => 70.00,
                'quantité' => 30,
                'id_categorie' => 1,
            ],
            // Catégorie 2 : Plantes d'extérieur
            [
            'nom' => 'Lavande',
                'description' => 'Plante aromatique qui apporte couleur et parfum à votre jardin',
                'prix' => 45.00,
                'quantité' => 40,
                'id_categorie' => 2,
            ],
            [
                'nom' => 'Rosier Grimpant',
                'description' => 'Rosier à fleurs doubles qui orne magnifiquement les treillages et pergolas',
                'prix' => 85.00,
                'quantité' => 20,
                'id_categorie' => 2,
            ],
            [
                'nom' => 'Olivier',
                'description' => 'Arbre méditerranéen symbolisant la paix et la longévité',
                'prix' => 180.00,
                'quantité' => 12,
                'id_categorie' => 2,
            ],
            // Catégorie 3 : Fleurs coupées
            [
                'nom' => 'Bouquet de Roses',
                'description' => 'Bouquet élégant de roses fraîches en plusieurs coloris',
                'prix' => 95.00,
                'quantité' => 50,
                'id_categorie' => 3,
            ],
            [
                'nom' => 'Tulipes Assorties',
                'description' => 'Bouquet coloré de tulipes de saison',
                'prix' => 65.00,
                'quantité' => 30,
                'id_categorie' => 3,
            ],
            [
                'nom' => 'Lys Orientaux',
                'description' => 'Bouquet parfumé de lys orientaux blancs et roses',
                'prix' => 110.00,
                'quantité' => 20,
                'id_categorie' => 3,
            ],
            // Catégorie 4 : Outils de jardinage
            [
                'nom' => 'Set d\'Outils de Jardinage',
                'description' => 'Ensemble complet d\'outils essentiels pour le jardinage quotidien',
                'prix' => 130.00,
                'quantité' => 15,
                'id_categorie' => 4,
            ],
            [
                'nom' => 'Sécateur Professionnel',
                'description' => 'Sécateur de qualité pour la taille précise de vos plantes',
                'prix' => 85.00,
                'quantité' => 25,
                'id_categorie' => 4,
            ],
            // Add more products if needed
        ];

        // Generate product entries with rotating images
        foreach ($productTemplates as $product) {
            $products[] = [
                'nom' => $product['nom'],
                'image' => $availableImages[$index % count($availableImages)],
                'description' => $product['description'],
                'prix' => $product['prix'],
            'date' => now(),
                'quantité' => $product['quantité'],
                'id_categorie' => $product['id_categorie'],
                'created_at' => now(),
                'updated_at' => now(),
            ];
            $index++;
        }

        DB::table('produites')->insert($products);

        // Ajouter quelques commandes et lignes de commandes pour simuler une activité
        $commande = Commande::create([
            'id_utilisateur' => 2, // Client Jane Smith
            'total' => 150.00, // Le montant total de la commande
            'status' => 'en_cours', // Utilisez une des valeurs définies dans votre enum
            'date_commande' => now(),
        ]);
        
        // Ajouter des produits à cette commande
        LigneCommande::create([
            'id_commande' => $commande->id,
            'id_produite' => 1, // Ficus Lyrata
            'quantité' => 1,
            'id_utilisateur' => 2,
        ]);
        
          LigneCommande::create([
            'id_commande' => $commande->id,
            'id_produite' => 7, // Rosier Grimpant
            'quantité' => 2,
            'id_utilisateur' => 2,
        ]);
        
        // Une autre commande pour un autre client
        $commande2 = Commande::create([
            'id_utilisateur' => 2, // Change from 3 to 2 (use existing user)
            'total' => 175.00, // Le montant total de la commande
            'status' => 'livré', // Utilisez une des valeurs définies dans votre enum
            'date_commande' => now()->subDays(2),
        ]);

        LigneCommande::create([
            'id_commande' => $commande2->id,
            'id_produite' => 3, // Pothos Doré
            'quantité' => 1,
            'id_utilisateur' => 2,
        ]);

        LigneCommande::create([
            'id_commande' => $commande2->id,
            'id_produite' => 2, // Make sure this ID exists (use 1-15 based on your products)
            'quantité' => 1,
            'id_utilisateur' => 2,
        ]);
        
        LigneCommande::create([
            'id_commande' => $commande2->id, 
            'id_produite' => 5, // Make sure this ID exists (use 1-15 based on your products)
            'quantité' => 2,
            'id_utilisateur' => 2,
        ]);
        
        // Ajouter un paiement pour la commande livrée
        Paiement::create([
            'montant' => 175.00, // Prix du Pothos (85) + Orchidées (90)
            'id_commande' => $commande2->id,
            'status' => 'payé' // Utiliser la colonne status existante
        ]);
        
        echo "Base de données peuplée avec succès!\n";
    }
}
