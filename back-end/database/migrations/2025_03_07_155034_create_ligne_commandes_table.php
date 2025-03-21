<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
<<<<<<< HEAD
=======
        // Désactiver temporairement les contraintes de clé étrangère
        Schema::disableForeignKeyConstraints();
        
>>>>>>> dev
        Schema::create('ligne_commandes', function (Blueprint $table) {
            $table->id();
            $table->integer('quantité');
            $table->foreignId('id_produite')->constrained('produites')->onDelete('cascade')->onupdate('cascade');
<<<<<<< HEAD
            $table->timestamps();
        });
=======
            $table->foreignId('id_commande')->constrained('commandes')->onDelete('cascade')->onupdate('cascade');
            $table->foreignId('id_utilisateur')->constrained('users')->onDelete('cascade')->onupdate('cascade');
            $table->timestamps();
        });
        
        // Réactiver les contraintes de clé étrangère
        Schema::enableForeignKeyConstraints();
>>>>>>> dev
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ligne_commandes');
    }
};
