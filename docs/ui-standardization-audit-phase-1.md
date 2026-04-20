# UI Standardization Audit - Phase 1

Objective: establish a line-by-line migration map before replacing styles with tokens/components.

## Scope
- Frontend only: `resources/js` + `resources/css/app.css`
- No business logic changes
- No visual redesign in this phase

## Baseline
- Existing global token base exists in [resources/css/app.css](resources/css/app.css).
- Tailwind already maps CSS variables in [tailwind.config.js](tailwind.config.js).
- Main inconsistency is hardcoded values and repeated inline classes in JSX/TSX.

## Automatic audit queries used
1. Hardcoded colors (`#hex`, `rgb`, `hsl`) in React files.
2. Long inline `className` strings (80+ chars).
3. Repeated visual patterns (`rounded-xl`, `shadow-sm`, common text sizes, CTA backgrounds).
4. Usage map of shared UI components (`PrimaryButton`, `DangerButton`, `SecondaryButton`, `CourseCard`, `IconBadge`, `banner`).

## Findings summary
- Hardcoded color hits: 135 (sampled, capped by tool output).
- Long `className` hits: 47.
- Repeated pattern hits: 197.
- Component usage hits: 93.

## Highest-priority migration clusters

### Cluster A: Brand and semantic hardcoded colors
- [resources/js/Layouts/MainLayout.jsx](resources/js/Layouts/MainLayout.jsx#L31)
- [resources/js/Layouts/HomeLayout.jsx](resources/js/Layouts/HomeLayout.jsx#L44)
- [resources/js/Components/ui/button.tsx](resources/js/Components/ui/button.tsx#L28)
- [resources/js/Components/icon-badge.tsx](resources/js/Components/icon-badge.tsx#L12)
- [resources/js/pages/Course/Components/CourseSidebar.jsx](resources/js/pages/Course/Components/CourseSidebar.jsx#L51)

### Cluster B: Teacher forms repeated visual blocks
- [resources/js/pages/Dashboard/Teacher/Courses/Edit/Components/SimpleForms.jsx](resources/js/pages/Dashboard/Teacher/Courses/Edit/Components/SimpleForms.jsx#L31)
- [resources/js/pages/Dashboard/Teacher/Courses/Edit/Components/ImageForm.jsx](resources/js/pages/Dashboard/Teacher/Courses/Edit/Components/ImageForm.jsx#L33)
- [resources/js/pages/Dashboard/Teacher/Courses/Edit/Components/AttachmentForm.jsx](resources/js/pages/Dashboard/Teacher/Courses/Edit/Components/AttachmentForm.jsx#L42)
- [resources/js/pages/Dashboard/Teacher/Courses/Chapters/Edit/Components/SimpleForms.jsx](resources/js/pages/Dashboard/Teacher/Courses/Chapters/Edit/Components/SimpleForms.jsx#L31)
- [resources/js/pages/Dashboard/Teacher/Courses/Chapters/Edit/Components/VideoForm.jsx](resources/js/pages/Dashboard/Teacher/Courses/Chapters/Edit/Components/VideoForm.jsx#L34)

### Cluster C: Cards and repeated container recipes
- [resources/js/Components/CourseCard.jsx](resources/js/Components/CourseCard.jsx#L36)
- [resources/js/Components/course-card.tsx](resources/js/Components/course-card.tsx#L28)
- [resources/js/pages/Dashboard/Components/InfoCard.jsx](resources/js/pages/Dashboard/Components/InfoCard.jsx#L17)
- [resources/js/pages/Dashboard/Search/Index.jsx](resources/js/pages/Dashboard/Search/Index.jsx#L19)
- [resources/js/pages/LandingPage/Cursos.jsx](resources/js/pages/LandingPage/Cursos.jsx#L63)

### Cluster D: Inline banners/alerts duplicated by page
- [resources/js/pages/Course/Chapter/Index.jsx](resources/js/pages/Course/Chapter/Index.jsx#L28)
- [resources/js/pages/Courses/Show/Index.jsx](resources/js/pages/Courses/Show/Index.jsx#L13)
- [resources/js/pages/Dashboard/Teacher/Courses/Edit/Index.jsx](resources/js/pages/Dashboard/Teacher/Courses/Edit/Index.jsx#L20)
- [resources/js/pages/Dashboard/Teacher/Courses/Chapters/Edit/Index.jsx](resources/js/pages/Dashboard/Teacher/Courses/Chapters/Edit/Index.jsx#L17)

### Cluster E: Legacy button wrappers still heavily used
- [resources/js/Components/PrimaryButton.jsx](resources/js/Components/PrimaryButton.jsx)
- [resources/js/Components/DangerButton.jsx](resources/js/Components/DangerButton.jsx)
- [resources/js/Components/SecondaryButton.jsx](resources/js/Components/SecondaryButton.jsx)

## Proposed migration order (line-by-line)
1. Tokenize colors first (no visual behavior change).
2. Standardize `Button` variants while keeping wrappers as compatibility layer.
3. Standardize `Card` and `Banner/Alert` variants.
4. Migrate teacher forms in small batches.
5. Migrate landing/dashboard clusters.
6. Remove remaining hardcoded values and dead variants.

## Exit criteria for Phase 1
- Audit map committed and shared.
- Token file created and reviewed.
- Next phase can start with direct replacements guided by this map.
