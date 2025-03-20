<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\produite;
use Illuminate\Support\Facades\Storage;
use Exception;
use Illuminate\Support\Facades\Log;

class ProduitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            Log::info('Fetching products', ['request' => $request->all()]);
            
            $query = produite::query();
            
            if ($request->has('categorie')) {
                $categoryId = $request->get('categorie');
                if ($categoryId) {
                    $query->where('id_categorie', $categoryId);
                }
            }

            $products = $query->get();
            
            $products = $products->map(function ($product) {
                // Use a default image if none is set
                $imageName = $product->image ?: 'default.jpg';
                
                // Build the full URL using the API endpoint
                $imageUrl = url('/api/images/' . $imageName);
                
                return [
                    'id' => $product->id,
                    'nom' => $product->nom,
                    'description' => $product->description,
                    'prix' => $product->prix,
                    'image' => $imageUrl,
                    'quantité' => $product->quantité,
                    'id_categorie' => $product->id_categorie
                ];
            });

            return response()->json($products);
        } catch (Exception $e) {
            Log::error('Error in ProduitController@index', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'description' => 'required',
            'prix' => 'required|numeric',
            'quantité' => 'required|integer',
            'id_categorie' => 'required|exists:categories,id'
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = time() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('public/images', $filename);

            $product = produite::create([
                'nom' => $request->nom,
                'image' => $filename,
                'description' => $request->description,
                'prix' => $request->prix,
                'quantité' => $request->quantité,
                'id_categorie' => $request->id_categorie
            ]);

            return response()->json($product, 201);
        }

        return response()->json(['error' => 'No image uploaded'], 400);
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function getProductImage($filename)
    {
        try {
            // Normalize the filename to prevent directory traversal
            $filename = str_replace(['\\', '/', '..'], '', $filename);
            $path = storage_path('app/public/images/' . $filename);
            
            Log::info('Attempting to serve image:', ['path' => $path]);
            
            if (!file_exists($path)) {
                Log::warning('Image not found:', ['path' => $path]);
                return response()->json(['error' => 'Image not found'], 404);
            }
            
            // Set appropriate headers for image response
            return response()->file($path, [
                'Content-Type' => mime_content_type($path),
                'Access-Control-Allow-Origin' => 'http://localhost:3000',
                'Cache-Control' => 'public, max-age=31536000',
            ]);
        } catch (Exception $e) {
            Log::error('Error serving image:', [
                'filename' => $filename,
                'error' => $e->getMessage()
            ]);
            return response()->json(['error' => 'Error serving image'], 500);
        }
    }
}
