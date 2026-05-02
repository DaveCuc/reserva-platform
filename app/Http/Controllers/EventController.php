<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Event;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::where('is_published', true)
            ->orderBy('created_at', 'desc')
            ->get();
            
        return Inertia::render('LandingPage/Eventos/Index', [
            'events' => $events
        ]);
    }

    public function show(Event $evento)
    {
        if (!$evento->is_published) {
            abort(404);
        }

        return Inertia::render('LandingPage/Eventos/Show', [
            'event' => $evento->load('user')
        ]);
    }
}
