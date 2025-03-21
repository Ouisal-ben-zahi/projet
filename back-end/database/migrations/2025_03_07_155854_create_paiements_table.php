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
        Schema::create('paiements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_commande')->constrained('commandes')->onDelete('cascade')->onupdate('cascade');
            $table->float('montant');
            $table->enum('status', ['non_payé', 'payé'])->default('non_payé');
<<<<<<< HEAD
            $table->timestamps();
                });
=======
            // Ajout des colonnes qui sont dans le modèle mais pas dans les migrations
            $table->date('date')->nullable();
            $table->string('methode')->nullable();
            $table->timestamps();
        });
>>>>>>> dev
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paiements');
    }
};
