# Documentación de Controladores y Lógica de Negocio

Este documento detalla la función de cada controlador en `app/Http/Controllers`, los métodos que contiene, y con qué modelos o vistas (frontend) se conecta.

---

## 1. Módulo Público y Formación (Visitante y Alumno/Productor)

### `CourseController`
Maneja la visualización de los cursos y la inscripción directa para los usuarios (Alumno/Productor).
*   **Se conecta con Modelos:** `Course`, `Chapter`, `Purchase`, `UserProgress`.
*   **Se conecta con Vistas:** `Dashboard/Search/Index` (Catálogo), `Courses/Show/Cover` (Portada), `Courses/Show/Index` (Aula virtual).
*   **Métodos principales:**
    *   `index()`: Muestra el catálogo de cursos publicados (UC11).
    *   `show()`: Muestra la portada de un curso.
    *   `chapter()`: Muestra el contenido de un capítulo específico (video y descripción) validando el acceso (UC14).
    *   `checkout()`: Inscribe directamente al usuario creando el registro en la tabla `purchases` (UC12).
    *   `progress()`: Marca un capítulo como completado/no completado para persistir el avance en `UserProgress`.

### `ExamController`
Maneja la lógica de evaluación para el Alumno/Productor.
*   **Se conecta con Modelos:** `Exam`, `ExamAttempt`, `ExamQuestion`, `Certificate`.
*   **Se conecta con Vistas:** `Courses/Exams/Show` (Instrucciones), `Courses/Exams/Take` (Resolución).
*   **Métodos principales:**
    *   `show()`: Valida si el usuario puede tomar el examen y renderiza la vista con las preguntas.
    *   `submit()`: Recibe las respuestas del usuario, las califica automáticamente verificando `is_correct` en las opciones, guarda el intento (`ExamAttempt`) y si aprueba todo el curso, habilita el certificado (UC15, UC16).

### `EventController`
Controlador para la vista pública de eventos comunitarios (UC07).
*   **Se conecta con Modelos:** `Event`.
*   **Se conecta con Vistas:** `LandingPage/Eventos/Index` (Cartelera), `LandingPage/Eventos/Show` (Detalle y enlace RSVP).
*   **Métodos principales:**
    *   `index()`: Lista los eventos próximos publicados.
    *   `show()`: Muestra la información detallada de un evento y el enlace externo de registro (RSVP).

### `CertificateController`
Generación de documentos PDF oficiales (UC17).
*   **Se conecta con Modelos:** `Certificate`.
*   **Se conecta con Vistas:** No renderiza frontend, devuelve un archivo PDF binario generado con DomPDF.
*   **Métodos principales:**
    *   `download()`: Recibe el ID del curso, valida que se haya completado el 100% de capítulos y aprobado todos los exámenes, renderiza el documento oficial con `barryvdh/laravel-dompdf` y descarga el PDF.

---

## 2. Módulo de Gestión Docente (Profesor)

Estos controladores están protegidos para que solo los usuarios con rol docente (`is_teacher = true`) puedan acceder a ellos (UC21 a UC27).

### `TeacherCourseController`
Permite al profesor gestionar la información general de sus cursos.
*   **Se conecta con Modelos:** `Course`, `Category`.
*   **Se conecta con Vistas:** `Teacher/Courses/Index`, `Teacher/Courses/Create`, `Teacher/Courses/Edit`.
*   **Métodos principales:**
    *   `index() / create() / store()`: CRUD básico para listar y crear nuevos cursos.
    *   `edit() / update()`: Formulario principal de configuración del curso (título, precio, categoría).
    *   `uploadImage()`: Sube la imagen de portada al almacenamiento (`Storage::disk('public')`).
    *   `publish() / unpublish()`: Valida que el curso tenga todos los requisitos mínimos antes de permitir que sea público.

### `TeacherChapterController`
Gestiona el temario y las lecciones de un curso específico.
*   **Se conecta con Modelos:** `Course`, `Chapter`, `MuxData`.
*   **Se conecta con Vistas:** `Teacher/Chapters/Edit`.
*   **Métodos principales:**
    *   `store()`: Crea un nuevo capítulo en blanco.
    *   `edit() / update()`: Edita el contenido del capítulo.
    *   `uploadVideo()`: Sube el video y lo conecta con la API de Mux para el procesamiento de streaming.
    *   `reorder()`: Recibe un array de IDs desde el frontend mediante drag & drop para actualizar la columna `position` de cada capítulo.

### `TeacherExamController`
Creador de exámenes interactivos.
*   **Se conecta con Modelos:** `Course`, `Exam`, `ExamQuestion`, `ExamOption`.
*   **Se conecta con Vistas:** `Teacher/Exams/Edit`.
*   **Métodos principales:**
    *   `store() / update()`: Crea o modifica la configuración base del examen.
    *   `storeQuestion() / updateQuestion() / destroyQuestion()`: API interna para agregar o quitar preguntas al examen.
    *   `storeOption() / updateOption()`: API para agregar las opciones de A, B, C, D y marcar cuál es la respuesta correcta.

### `TeacherArticleController` y `TeacherEventController`
Gestión de contenido de marketing.
*   **Se conecta con Modelos:** `Article`, `Event`.
*   **Se conecta con Vistas:** `Teacher/Articles/*` y `Teacher/Events/*`.
*   **Métodos principales:**
    *   Manejan operaciones CRUD estándar (index, create, store, edit, update, destroy).
    *   Ambos incluyen métodos para subir imágenes (`uploadCoverImage` o `uploadCardImage`) y publicar/despublicar el contenido.

---

## 3. Módulo de Directorio y Gestión del Negocio

### `DirectoryTradeController`
Maneja la vista pública del directorio, la gestión del negocio por parte del Alumno/Productor (UC18) y el panel de revisión y dictamen del Profesor (UC24, UC25).
*   **Se conecta con Modelos:** `Directorio`, `Giro`, `Region`, `Municipio`, `DirectorioCertificate`.
*   **Se conecta con Vistas:** `LandingPage/Directorio` (Buscador público), `Dashboard/Trades/Edit/Index` (Gestión modular del negocio), `Dashboard/Teacher/Solicitudes` (Bandeja de revisión).
*   **Métodos principales:**
    *   `index()`: Motor de búsqueda público con filtros (UC03).
    *   `create() / store() / update()`: Registro y actualización modular de datos comerciales, ubicación y servicios (UC18).
    *   `uploadGallery() / deleteGalleryImage()`: Sube y borra arreglos de imágenes asociadas a la columna JSON `gallery_images`.
    *   `uploadCertificate()`: Guarda los archivos formales (PDFs) en la tabla secundaria `DirectorioCertificate`.
    *   `adminReview() / approve() / reject()`: Flujo de moderación (UC24, UC25). El Profesor audita la solicitud y emite su dictamen: aprueba la publicación o la rechaza registrando obligatoriamente las observaciones en `rejection_reason` para que el Alumno/Productor pueda subsanarlas (UC20).

---

## 4. Sistema (Core)

### `ProfileController`
*   **Se conecta con Modelos:** `User`.
*   **Se conecta con Vistas:** `Profile/Edit`.
*   **Métodos principales:**
    *   `edit() / update()`: Actualiza el nombre, email o contraseña del usuario actual.
    *   `destroy()`: Borra la cuenta del usuario permanentemente.

### `Controller`
*   **Clase Base:** Es una clase abstracta de la cual heredan absolutamente todos los demás controladores. No tiene métodos propios de lógica de negocio, pero sirve para inyectar validaciones o *middleware* globales de forma predeterminada a nivel arquitectura.
