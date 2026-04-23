# Instructions for `reserva-platform`

## Build, test, and lint commands

Use these commands from the repository root.

| Purpose | Command |
| --- | --- |
| Frontend dev server | `npm run dev` |
| Frontend production build | `npm run build` |
| Run full PHP test suite | `php artisan test` |
| Run one test file | `php artisan test tests/Feature/Auth/AuthenticationTest.php` |
| Run one test method | `php artisan test --filter=test_users_can_authenticate_using_the_login_screen` |
| PHP lint/format | `vendor/bin/pint` |

## High-level architecture

- This is a Laravel 11 + Inertia.js v2 + React app. Backend HTTP entry points are defined in `routes/web.php` and `routes/auth.php`; frontend pages are rendered through Inertia.
- Inertia bootstraps in `resources/js/app.jsx` and resolves pages by name using `./pages/**/*.jsx`. Inertia render names in PHP (for example `Inertia::render('Dashboard/Index')`) map directly to files under `resources/js/pages/`.
- Shared Inertia props are provided in `app/Http/Middleware/HandleInertiaRequests.php` (`auth.user` is globally available in React via `usePage().props.auth.user`).
- The course platform domain is centered on `Course`, `Chapter`, `Attachment`, `Purchase`, and `UserProgress` models:
  - Student flow (browse/search/chapter progress) is mostly routed from `routes/web.php` closures plus `CourseController::checkout`.
  - Teacher authoring flow is handled by `TeacherCourseController` and `TeacherChapterController` (`/teacher/...` routes).
  - Stripe checkout starts in `POST /courses/{course}/checkout` (`CourseController`) and purchase persistence is finalized by `/webhook` in `routes/web.php`.

## Key conventions in this codebase

- Most LMS/domain models use UUID primary keys via `HasUuids` (for example `Course`, `Chapter`, `Purchase`, `Attachment`, `UserProgress`, `Category`). Request validation for these IDs uses `uuid` rules.
- Authorization is enforced inline and repeatedly with ownership checks (for example `if ($course->user_id != Auth::id()) abort(403);`) and course/chapter relationship checks before mutation.
- Course owner is treated as having purchase access in student-facing course/chapter access logic (owner bypass is implemented in both route closures and controller logic).
- Uploaded assets are stored on the `public` disk and persisted as URL strings prefixed with `/storage/`; deletion code strips that prefix before deleting from storage.
- Frontend imports use the `@/` alias (configured in `jsconfig.json`), and route helpers are expected through Ziggy (`route(...)` in React components).
- Page components are `.jsx` files (not `.tsx`) because Inertia page resolution in `resources/js/app.jsx` only globs `./pages/**/*.jsx`.
