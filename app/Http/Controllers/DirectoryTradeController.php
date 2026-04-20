<?php

namespace App\Http\Controllers;

use App\Models\Directorio;
use App\Models\Giro;
use App\Models\Municipio;
use App\Models\Region;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class DirectoryTradeController extends Controller
{
    public function index()
    {
        $trades = Directorio::query()
            ->with(['giros', 'region', 'municipio'])
            ->where('user_id', Auth::id())
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('Dashboard/Trades/Index', [
            'trades' => $trades,
        ]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/Trades/Create/Index');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'comercial_name' => ['required', 'string', 'max:80'],
        ]);

        $trade = Directorio::create([
            'user_id' => Auth::id(),
            'comercial_name' => $validated['comercial_name'],
        ]);

        return redirect()->route('directory.trades.edit', $trade->id);
    }

    public function edit(Directorio $trade)
    {
        $this->ensureOwner($trade);
        $trade->load(['giros', 'region', 'municipio']);

        $giros = Giro::orderBy('name')->get();
        $regions = Region::with(['municipios' => function ($query) {
            $query->orderBy('name');
        }])->orderBy('name')->get();

        return Inertia::render('Dashboard/Trades/Edit/Index', [
            'trade' => $trade,
            'giros' => $giros,
            'regions' => $regions,
        ]);
    }

    public function update(Request $request, Directorio $trade)
    {
        $this->ensureOwner($trade);

        $validated = $request->validate([
            'comercial_name' => ['nullable', 'string', 'max:80'],
            'descripcion' => ['nullable', 'string'],
            'giro_ids' => ['nullable', 'array'],
            'giro_ids.*' => ['uuid', Rule::exists('giros', 'id')],
            'digital' => ['nullable', 'url', 'max:255'],
            'name' => ['nullable', 'string', 'max:120'],
            'phone' => ['nullable', 'string', 'max:30'],
            'email' => ['nullable', 'email', 'max:191', 'unique:directorios,email,' . $trade->id],
            'region_id' => ['nullable', 'uuid', Rule::exists('regions', 'id')],
            'municipio_id' => ['nullable', 'uuid'],
            'address' => ['nullable', 'string', 'max:255'],
            'map_location' => ['nullable', 'string', 'max:255'],
        ]);

        if (!empty($validated['municipio_id']) && !empty($validated['region_id'])) {
            $municipioBelongsToRegion = Municipio::where('id', $validated['municipio_id'])
                ->where('region_id', $validated['region_id'])
                ->exists();

            if (!$municipioBelongsToRegion) {
                return back()->withErrors([
                    'municipio_id' => 'El municipio no pertenece a la región seleccionada.',
                ]);
            }
        }

        if (array_key_exists('giro_ids', $validated)) {
            $giroIds = $validated['giro_ids'] ?? [];
            unset($validated['giro_ids']);

            $trade->giros()->sync($giroIds);

            $primaryGiro = null;
            if (!empty($giroIds)) {
                $primaryGiro = Giro::find($giroIds[0]);
            }

            $validated['giro'] = $primaryGiro?->name;
        }

        if (!empty($validated['region_id'])) {
            $validated['region'] = Region::find($validated['region_id'])?->name;
        }

        $trade->update($validated);

        return back();
    }

    public function uploadImage(Request $request, Directorio $trade)
    {
        $this->ensureOwner($trade);

        $request->validate([
            'image' => ['required', 'image', 'max:4096'],
        ]);

        if ($trade->image_url) {
            $this->deleteFromPublicDisk($trade->image_url);
        }

        $path = $request->file('image')->store('directorios', 'public');

        $trade->update([
            'image_url' => '/storage/' . $path,
        ]);

        return back();
    }

    public function publish(Directorio $trade)
    {
        $this->ensureOwner($trade);

        $requiredFields = [
            $trade->comercial_name,
            $trade->descripcion,
            $trade->giro,
            $trade->name,
            $trade->phone,
            $trade->address,
            $trade->image_url,
            $trade->region_id,
            $trade->municipio_id,
        ];

        $isComplete = collect($requiredFields)->every(fn ($value) => !empty($value)) && $trade->giros()->exists();

        if (!$isComplete) {
            return back()->withErrors([
                'error' => 'Faltan campos obligatorios para publicar el registro.',
            ]);
        }

        $trade->update([
            'is_published' => true,
        ]);

        return back();
    }

    public function unpublish(Directorio $trade)
    {
        $this->ensureOwner($trade);

        $trade->update([
            'is_published' => false,
        ]);

        return back();
    }

    private function ensureOwner(Directorio $trade): void
    {
        if ((int) $trade->user_id !== (int) Auth::id()) {
            abort(403);
        }
    }

    private function deleteFromPublicDisk(string $url): void
    {
        $relative = str_replace('/storage/', '', $url);

        if (Storage::disk('public')->exists($relative)) {
            Storage::disk('public')->delete($relative);
        }
    }
}
