<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Article;
use App\Models\Category;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class TeacherArticleController extends Controller
{
    public function index()
    {
        $articles = Article::where('user_id', Auth::id())->orderBy('created_at', 'desc')->get();
        return Inertia::render('Dashboard/Teacher/Articles/Index', ['articles' => $articles]);
    }

    public function store(Request $request)
    {
        $request->validate(['title' => 'required|string|max:255']);
        $article = Article::create([
            'title' => $request->title,
            'user_id' => Auth::id(),
        ]);
        return redirect()->route('teacher.articles.edit', $article->id);
    }

    public function edit(Article $article)
    {
        if ($article->user_id != Auth::id()) {
            return redirect()->route('dashboard');
        }

        $categories = Category::orderBy('name', 'asc')->get();

        return Inertia::render('Dashboard/Teacher/Articles/Edit/Index', [
            'article' => $article->load('user'),
            'categories' => $categories
        ]);
    }

    public function update(Request $request, Article $article)
    {
        if ($article->user_id != Auth::id()) abort(403);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'short_description' => 'nullable|string|max:200',
            'content' => 'nullable|string',
            'category_id' => 'nullable|uuid|exists:categories,id',
        ]);

        if (!empty($validated)) {
            $article->update($validated);
        }
        
        return back()->with('success', 'Articulo actualizado');
    }

    public function publish(Article $article)
    {
        if ($article->user_id != Auth::id()) abort(403);
        
        if (!$article->title || !$article->short_description || !$article->image_url || !$article->card_image_url || !$article->category_id || !$article->content) {
            return back()->withErrors(['error' => 'Faltan campos obligatorios']);
        }
        
        $article->update([
            'is_published' => true,
            'published_at' => now(),
        ]);
        return back();
    }

    public function unpublish(Article $article)
    {
        if ($article->user_id != Auth::id()) abort(403);
        
        $article->update([
            'is_published' => false,
            'published_at' => null,
        ]);
        return back();
    }

    public function destroy(Article $article)
    {
        if ($article->user_id != Auth::id()) abort(403);
        
        if ($article->image_url) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $article->image_url));
        }
        if ($article->card_image_url) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $article->card_image_url));
        }
        
        $article->delete();
        return redirect()->route('teacher.articles.index');
    }

    public function uploadImage(Request $request, Article $article)
    {
        if ($article->user_id != Auth::id()) abort(403);
        
        $request->validate(['image' => 'required|image']);
        
        if ($article->image_url) {
             Storage::disk('public')->delete(str_replace('/storage/', '', $article->image_url));
        }
        
        $path = $request->file('image')->store('articles', 'public');
        $article->update(['image_url' => '/storage/' . $path]);
        
        return back();
    }

    public function uploadCardImage(Request $request, Article $article)
    {
        if ($article->user_id != Auth::id()) abort(403);
        
        $request->validate(['image' => 'required|image']);
        
        if ($article->card_image_url) {
             Storage::disk('public')->delete(str_replace('/storage/', '', $article->card_image_url));
        }
        
        $path = $request->file('image')->store('articles', 'public');
        $article->update(['card_image_url' => '/storage/' . $path]);
        
        return back();
    }
}
