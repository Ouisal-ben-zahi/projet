<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function show($filename)
    {
        $path = storage_path('app/public/images/' . $filename);
        
        if (!file_exists($path)) {
            // Return a fallback image if the requested one doesn't exist
            $fallbackImages = [
                'plant1.jpg',
                'plant2.jpg',
                'plant3.jpg'
            ];
            
            // Use one of the available images as fallback
            $fallbackPath = storage_path('app/public/images/' . $fallbackImages[0]);
            
            if (!file_exists($fallbackPath)) {
                return response()->json(['error' => 'Image not found'], 404);
            }
            
            $path = $fallbackPath;
        }
        
        $file = file_get_contents($path);
        $type = mime_content_type($path);
        
        return response($file, 200)->header('Content-Type', $type);
    }
} 