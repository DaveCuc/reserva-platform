<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DirectoryTradeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// --- DOMINIO 1: PÁGINAS PÚBLICAS (HOME/LANDING) ---

Route::get('/', function () {
    return Inertia::render('LandingPage/Inicio', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/mapa', function () {
    return Inertia::render('LandingPage/Mapa');
})->name('mapa');

Route::get('/directorio', function () {
    return Inertia::render('LandingPage/Directorio');
})->name('directorio');

Route::get('/cursos', function () {
    return Inertia::render('LandingPage/Cursos');
})->name('cursos.index');

Route::get('/negocio', function () {
    return Inertia::render('LandingPage/Negocio/index');
})->name('negocio');

// --- API ENDPOINT DE MIGRACIÓN PARA DIRECTORIO ---
Route::get('/api/directorio', function (\Illuminate\Http\Request $request) {
    $query = \App\Models\Directorio::query()
        ->with('giros')
        ->where('status', 'approved');

    if ($request->filled('giro')) {
        $query->where(function ($giroQuery) use ($request) {
            $giroQuery->where('giro', $request->giro)
                ->orWhereHas('giros', function ($relatedQuery) use ($request) {
                    $relatedQuery->where('name', $request->giro);
                });
        });
    }

    if ($request->filled('region')) {
        $query->where('region', $request->region);
    }

    return response()->json($query->take(50)->get());
});

// --- DOMINIO PROTEGIDO (USUARIOS LOGUEADOS) ---

Route::get('/dashboard', function () {
    $user = Auth::user();
    
    // Obtener los cursos comprados por el usuario
    $purchasedCourseIds = \App\Models\Purchase::where('user_id', $user->id)
        ->pluck('course_id');
        
    $courses = \App\Models\Course::whereIn('id', $purchasedCourseIds)
        ->with(['category', 'chapters' => function($q) {
            $q->where('is_published', true)->orderBy('position', 'asc');
        }])
        ->get();
        
    $completedCourses = [];
    $coursesInProgress = [];
    
    foreach ($courses as $course) {
        $publishedChapterIds = $course->chapters->pluck('id');
        
        $validCompletedChapters = \App\Models\UserProgress::where('user_id', $user->id)
            ->whereIn('chapter_id', $publishedChapterIds)
            ->where('is_completed', true)
            ->count();
            
        $progressPercentage = count($publishedChapterIds) > 0 
            ? ($validCompletedChapters / count($publishedChapterIds)) * 100 
            : 0;
            
        $courseData = [
            'id' => $course->id,
            'title' => $course->title,
            'imageUrl' => $course->image_url,
            'price' => $course->price,
            'progress' => $progressPercentage,
            'category' => $course->category,
            'chapters' => $course->chapters
        ];
        
        if ($progressPercentage === 100) {
            $completedCourses[] = $courseData;
        } else {
            $coursesInProgress[] = $courseData;
        }
    }

    return Inertia::render('Dashboard/Index', [
        'completedCourses' => $completedCourses,
        'coursesInProgress' => $coursesInProgress
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/trade', [DirectoryTradeController::class, 'index'])->name('trade');

    Route::get('/directory/trades', [DirectoryTradeController::class, 'index'])->name('directory.trades.index');
    Route::get('/directory/trades/create', [DirectoryTradeController::class, 'create'])->name('directory.trades.create');
    Route::post('/directory/trades', [DirectoryTradeController::class, 'store'])->name('directory.trades.store');
    Route::get('/directory/trades/{trade}/edit', [DirectoryTradeController::class, 'edit'])->name('directory.trades.edit');
    Route::patch('/directory/trades/{trade}', [DirectoryTradeController::class, 'update'])->name('directory.trades.update');
    Route::patch('/directory/trades/{trade}/submit', [DirectoryTradeController::class, 'submitForReview'])->name('directory.trades.submit');
    Route::patch('/directory/trades/{trade}/revert-draft', [DirectoryTradeController::class, 'revertToDraft'])->name('directory.trades.revert-draft');
    Route::delete('/directory/trades/{trade}', [DirectoryTradeController::class, 'destroy'])->name('directory.trades.destroy');
    Route::patch('/directory/trades/{trade}/publish', [DirectoryTradeController::class, 'publish'])->name('directory.trades.publish');
    Route::patch('/directory/trades/{trade}/unpublish', [DirectoryTradeController::class, 'unpublish'])->name('directory.trades.unpublish');
    Route::post('/directory/trades/{trade}/image', [DirectoryTradeController::class, 'uploadImage'])->name('directory.trades.image');
    Route::post('/directory/trades/{trade}/gallery-image', [DirectoryTradeController::class, 'uploadGalleryImage'])->name('directory.trades.gallery.image');
    Route::delete('/directory/trades/{trade}/gallery-image', [DirectoryTradeController::class, 'deleteGalleryImage'])->name('directory.trades.gallery.image.delete');

    Route::get('/teacher/solicitudes', [DirectoryTradeController::class, 'requestsIndex'])->name('teacher.requests.index');
    Route::get('/teacher/solicitudes/{trade}', [DirectoryTradeController::class, 'requestShow'])->name('teacher.requests.show');
    Route::patch('/teacher/solicitudes/{trade}/approve', [DirectoryTradeController::class, 'approve'])->name('teacher.requests.approve');
    Route::patch('/teacher/solicitudes/{trade}/reject', [DirectoryTradeController::class, 'reject'])->name('teacher.requests.reject');

    Route::get('/search', function (\Illuminate\Http\Request $request) {
        $categories = \App\Models\Category::orderBy('name')->get();
        
        $courses = \App\Models\Course::with(['category', 'chapters'])
            ->where('is_published', true)
            ->when($request->title, function($query, $title) {
                $query->where('title', 'like', "%{$title}%");
            })
            ->when($request->categoryId, function($query, $categoryId) {
                $query->where('category_id', $categoryId);
            })
            ->get()
            ->map(function($course) {
                return [
                    'id' => $course->id,
                    'title' => $course->title,
                    'imageUrl' => $course->image_url,
                    'price' => $course->price,
                    'progress' => null,
                    'category' => $course->category,
                    'chapters' => $course->chapters,
                ];
            });

        return Inertia::render('Dashboard/Search/Index', [
            'categories' => $categories,
            'courses' => $courses,
            'filters' => $request->only(['title', 'categoryId'])
        ]);
    })->name('search');

    Route::get('/courses/{course}', function (\App\Models\Course $course) {
        $firstChapter = $course->chapters()->where('is_published', true)->orderBy('position', 'asc')->first();
        if (!$firstChapter) return redirect('/');
        return redirect()->route('courses.chapters.show', ['course' => $course->id, 'chapter' => $firstChapter->id]);
    })->name('courses.show');

    Route::post('/courses/{course}/checkout', [\App\Http\Controllers\CourseController::class, 'checkout'])->name('courses.checkout');

    Route::get('/courses/{course}/chapters/{chapter}', function (\App\Models\Course $course, \App\Models\Chapter $chapter) {
        if ($chapter->course_id !== $course->id) {
            abort(404);
        }

        if (!$chapter->is_published) {
            return redirect()->route('dashboard');
        }

        $userId = Auth::id();
        
        $course->load(['chapters' => function($q) use ($userId) {
            $q->where('is_published', true)->orderBy('position', 'asc')->with(['userProgress' => function($query) use ($userId) {
                $query->where('user_id', $userId);
            }]);
        }]);

        $purchase = \App\Models\Purchase::where('user_id', $userId)->where('course_id', $course->id)->first();
        if ((string) $course->user_id === (string) $userId) {
            $purchase = true;
        }

        $nextChapter = null;
        $attachments = [];
        if ($purchase || $chapter->is_free) {
            $nextChapter = $course->chapters()
                ->where('is_published', true)
                ->where('position', '>', $chapter->position)
                ->orderBy('position', 'asc')
                ->first();
            $attachments = $course->attachments()->orderBy('created_at', 'desc')->get();
        }

        $userProgress = $chapter->userProgress()->where('user_id', $userId)->first();

        $publishedChapters = $course->chapters()->where('is_published', true)->pluck('id');
        $completedChapters = \App\Models\UserProgress::where('user_id', $userId)->whereIn('chapter_id', $publishedChapters)->where('is_completed', true)->count();
        $progressCount = count($publishedChapters) > 0 ? ($completedChapters / count($publishedChapters)) * 100 : 0;

        return Inertia::render('Courses/Show/Index', [
            'course' => $course,
            'chapter' => $chapter,
            'attachments' => $attachments,
            'nextChapter' => $nextChapter,
            'userProgress' => $userProgress,
            'purchase' => $purchase,
            'isLocked' => !$chapter->is_free && !$purchase,
            'progressCount' => $progressCount
        ]);
    })->name('courses.chapters.show');

    Route::put('/courses/{course}/chapters/{chapter}/progress', function (\Illuminate\Http\Request $request, \App\Models\Course $course, \App\Models\Chapter $chapter) {
        if ($chapter->course_id !== $course->id) {
            abort(404);
        }

        if (!$chapter->is_published) {
            abort(403);
        }

        $userId = Auth::id();

        $purchase = \App\Models\Purchase::where('user_id', $userId)
            ->where('course_id', $course->id)
            ->exists();

        if ((string) $course->user_id === (string) $userId) {
            $purchase = true;
        }

        if (!$chapter->is_free && !$purchase) {
            abort(403);
        }

        \App\Models\UserProgress::updateOrCreate(
            ['user_id' => $userId, 'chapter_id' => $chapter->id],
            ['is_completed' => $request->boolean('isCompleted')]
        );
        return back();
    });

    Route::get('/teacher/courses', function () {
        $courses = \App\Models\Course::where('user_id', Auth::id())->orderBy('created_at', 'desc')->get();
        return Inertia::render('Dashboard/Teacher/Courses/Index', ['courses' => $courses]);
    })->name('teacher.courses');

    Route::get('/teacher/create', function () {
        return Inertia::render('Dashboard/Teacher/Create/Index');
    })->name('teacher.courses.create');

    Route::post('/teacher/courses', function (\Illuminate\Http\Request $request) {
        $request->validate(['title' => 'required|string|max:255']);
        $course = \App\Models\Course::create([
            'title' => $request->title,
            'user_id' => Auth::id(),
        ]);
        return redirect()->route('teacher.courses.edit', $course->id);
    });

    Route::get('/teacher/courses/{course}', [\App\Http\Controllers\TeacherCourseController::class, 'edit'])->name('teacher.courses.edit');
    Route::patch('/teacher/courses/{course}', [\App\Http\Controllers\TeacherCourseController::class, 'update'])->name('teacher.courses.update');
    Route::delete('/teacher/courses/{course}', [\App\Http\Controllers\TeacherCourseController::class, 'destroy'])->name('teacher.courses.destroy');
    Route::patch('/teacher/courses/{course}/publish', [\App\Http\Controllers\TeacherCourseController::class, 'publish'])->name('teacher.courses.publish');
    Route::patch('/teacher/courses/{course}/unpublish', [\App\Http\Controllers\TeacherCourseController::class, 'unpublish'])->name('teacher.courses.unpublish');
    
    // Multimedia y capítulos directos:
    Route::post('/teacher/courses/{course}/image', [\App\Http\Controllers\TeacherCourseController::class, 'uploadImage']);
    Route::post('/teacher/courses/{course}/attachments', [\App\Http\Controllers\TeacherCourseController::class, 'uploadAttachment']);
    Route::delete('/teacher/courses/{course}/attachments/{attachment}', [\App\Http\Controllers\TeacherCourseController::class, 'deleteAttachment']);
    Route::post('/teacher/courses/{course}/chapters', [\App\Http\Controllers\TeacherCourseController::class, 'createChapter']);
    Route::put('/teacher/courses/{course}/chapters/reorder', [\App\Http\Controllers\TeacherCourseController::class, 'reorderChapters']);

    // Capítulos individuales (Sub-Editor)
    Route::get('/teacher/courses/{course}/chapters/{chapter}', [\App\Http\Controllers\TeacherChapterController::class, 'edit'])->name('teacher.courses.chapters.edit');
    Route::patch('/teacher/courses/{course}/chapters/{chapter}', [\App\Http\Controllers\TeacherChapterController::class, 'update']);
    Route::delete('/teacher/courses/{course}/chapters/{chapter}', [\App\Http\Controllers\TeacherChapterController::class, 'destroy']);
    Route::patch('/teacher/courses/{course}/chapters/{chapter}/publish', [\App\Http\Controllers\TeacherChapterController::class, 'publish']);
    Route::patch('/teacher/courses/{course}/chapters/{chapter}/unpublish', [\App\Http\Controllers\TeacherChapterController::class, 'unpublish']);
    Route::post('/teacher/courses/{course}/chapters/{chapter}/video', [\App\Http\Controllers\TeacherChapterController::class, 'uploadVideo']);

    Route::get('/teacher/analytics', function () {
        $userId = Auth::id();

        $purchases = \App\Models\Purchase::whereHas('course', function($query) use ($userId) {
            $query->where('user_id', $userId);
        })->with('course')->get();

        $groupedEarnings = [];
        foreach ($purchases as $purchase) {
            $courseTitle = $purchase->course->title;
            if (!isset($groupedEarnings[$courseTitle])) {
                $groupedEarnings[$courseTitle] = 0;
            }
            $groupedEarnings[$courseTitle] += $purchase->course->price ?? 0;
        }

        $data = [];
        $totalRevenue = 0;
        foreach ($groupedEarnings as $title => $total) {
            $data[] = ['name' => $title, 'total' => $total];
            $totalRevenue += $total;
        }
        $totalSales = count($purchases);

        return Inertia::render('Dashboard/Teacher/Analytics/Index', [
            'data' => $data,
            'totalRevenue' => $totalRevenue,
            'totalSales' => $totalSales,
        ]);
    })->name('teacher.analytics');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});




require __DIR__.'/auth.php';



// Endpoint abierto exento de CSRF (cross-site request forgery) para recibir pagos de Stripe
Route::post('/webhook', function(\Illuminate\Http\Request $request) {
    \Stripe\Stripe::setApiKey(env('STRIPE_API_KEY'));
    $endpoint_secret = env('STRIPE_WEBHOOK_SECRET');
    
    $payload = $request->getContent();
    $sig_header = $request->header('Stripe-Signature');
    $event = null;
    
    try {
        if ($endpoint_secret) {
            $event = \Stripe\Webhook::constructEvent($payload, $sig_header, $endpoint_secret);
        } else {
            // Fallback para testing si no hay endpoint_secret definido localmente.
            $event = \Stripe\Event::constructFrom(json_decode($payload, true));
        }
    } catch(\UnexpectedValueException $e) {   
        return response()->json(['error' => 'Invalid payload'], 400);
    } catch(\Stripe\Exception\SignatureVerificationException $e) {  
        return response()->json(['error' => 'Invalid signature'], 400);
    }
    
    // Accionar con base al tipo de evento
    if ($event->type == 'checkout.session.completed') {
        $session = $event->data->object;
        
        $courseId = $session->metadata->courseId ?? null;
        $userId = $session->metadata->userId ?? null;
        
        if ($courseId && $userId) {
            $course = \App\Models\Course::find($courseId);
            $user = \App\Models\User::find($userId);

            if ($course && $user && (string) $course->user_id !== (string) $user->id) {
                \App\Models\Purchase::firstOrCreate([
                    'course_id' => $courseId,
                    'user_id' => $userId,
                ]);
            }
        }
    }

    
    
    return response('Webhook Handled By Laravel', 200);
});

// borrar al finalizar migración


Route::get('/migrar-tablas', function () {
    Artisan::call('migrate', ['--force' => true]);
    return "¡Tablas creadas con éxito!";
});