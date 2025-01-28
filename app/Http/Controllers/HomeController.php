<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Response;

class HomeController extends Controller
{
    public function home(): Response {
        return inertia('Home');
    }
}
