<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\API\AuthController;

Route::get('/', function () {
    return view('welcome');
});
