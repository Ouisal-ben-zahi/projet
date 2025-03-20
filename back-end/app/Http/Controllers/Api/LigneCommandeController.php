<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\LigneCommande;
use App\Models\Produite;
use Exception;
use Illuminate\Support\Facades\Log;

class LigneCommandeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $ligneCommandes = LigneCommande::all();
            $produites = Produite::all()->map(function ($produit) {
                return [
                    'id' => $produit->id,
                    'nom' => $produit->nom,
                    'prix' => $produit->prix,
                    'image' => url('/api/images/' . $produit->image),
                    'description' => $produit->description,
                    'quantité' => $produit->quantité,
                ];
            });
            
            return response()->json([
                'ligneCommandes' => $ligneCommandes,
                'produites' => $produites
            ]);
        } catch (Exception $e) {
            Log::error('Error fetching cart:', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Failed to fetch cart data'], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'id_produite' => 'required|exists:produites,id',
                'quantité' => 'required|integer|min:1'
            ]);

            $ligneCommande = LigneCommande::create($validated);
            return response()->json($ligneCommande, 201);
        } catch (Exception $e) {
            Log::error('Error creating cart item:', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Failed to add item to cart'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $ligneCommande = LigneCommande::findOrFail($id);
            $validated = $request->validate([
                'quantité' => 'required|integer|min:1'
            ]);

            $ligneCommande->update($validated);
            return response()->json($ligneCommande);
        } catch (Exception $e) {
            Log::error('Error updating cart item:', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Failed to update cart item'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $ligneCommande = LigneCommande::findOrFail($id);
            $ligneCommande->delete();
            return response()->json(null, 204);
        } catch (Exception $e) {
            Log::error('Error deleting cart item:', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Failed to remove item from cart'], 500);
        }
    }
}