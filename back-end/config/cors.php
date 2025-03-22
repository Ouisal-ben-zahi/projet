<?php
return [
    'paths' => ['api/*'], // Apply CORS to API routes
    'allowed_methods' => ['*'], // Allow all HTTP methods
    'allowed_origins' => ['http://localhost:3000'], // Allow requests from your frontend
    'allowed_origins_patterns' => [], // Optional: Use patterns if needed
    'allowed_headers' => ['*'], // Allow all headers
    'exposed_headers' => [], // Optional: Add headers you want exposed
    'max_age' => 0, // Optional: Cache duration for preflight requests
    'supports_credentials' => false, // Set to true if cookies are used
];
