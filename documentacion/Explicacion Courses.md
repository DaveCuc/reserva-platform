# Documentación Detallada: Módulo de Formación (Cursos)

La carpeta `resources/js/Pages/Courses` contiene la interfaz donde se desarrolla el aprendizaje del **Alumno/Productor**. Es el aula virtual inmersiva y el sistema de evaluación interactiva, correspondiendo al grupo funcional de **Formación** (casos de uso UC11 a UC17).

Se divide en dos grandes subcarpetas lógicas: `Show` (aula virtual y seguimiento de lecciones) y `Exams` (evaluaciones).

---

## 1. Carpeta `Courses/Show/` (El Aula Virtual)
Esta subcarpeta maneja toda la visualización del contenido de un curso, desde la portada informativa hasta el reproductor de lecciones y descarga de certificados.

### Archivos Principales
*   **`Cover.jsx`:** Es la portada de un curso específico. Cuando el usuario selecciona un curso desde el catálogo (`/search`), accede a esta vista. Muestra la portada, título, descripción y el botón directo de **"Inscribirme gratis"** (UC12), el cual ejecuta la inscripción inmediata en el backend.
*   **`Index.jsx`:** Es el núcleo del aula virtual (UC14). Una vez inscrito el alumno, esta pantalla dibuja el contenido del capítulo seleccionado (título, descripción enriquecida, documentos PDF descargables y video explicativo). Se conecta al backend para registrar y persistir el avance conforme se concluye cada unidad formativa.

### Carpeta `Components/` (Estructura del aula)
*   **`CourseLayout.jsx`:** Marco estructural que oculta los menús globales de la plataforma para crear un entorno inmersivo libre de distracciones. Recibe la lista de capítulos para inyectarlos en la navegación lateral.
*   **`CourseNavbar.jsx`:** Barra superior simplificada dentro del curso, con el título de la capacitación y botón de retorno al Dashboard.
*   **`CourseSidebar.jsx`:** Barra lateral interactiva del temario. Lista todos los capítulos y exámenes del curso en secuencia, indicando con iconos de verificación las unidades ya concluidas y candados en aquellas restringidas.
*   **`VideoPlayer.jsx`:** Reproductor de video integrado para el material audiovisual del curso.
*   **`CourseButtons.jsx`:** Botones de acción pedagógica ("Marcar como completado", "Siguiente Lección" o "Lección Anterior"). Envían peticiones al backend para actualizar la persistencia de avance en `UserProgress`.
*   **`Certificate.jsx`:** Componente de acreditación oficial (UC17). Cuando el usuario ha completado el 100% de los capítulos publicados y ha aprobado satisfactoriamente todos los exámenes del curso, se habilita el botón de descarga del **Certificado oficial en formato PDF** generado por el sistema.

---

## 2. Carpeta `Courses/Exams/` (Sistema de Evaluaciones)
Esta subcarpeta es la responsable de la resolución y dictamen de pruebas para validar el aprendizaje adquirido.

### Archivos Principales
*   **`Show.jsx`:** Sala de instrucciones de la evaluación. Informa las pautas del examen, la calificación mínima requerida (ej. 80%) y el límite de intentos configurados por el Profesor.
*   **`Take.jsx`:** Interfaz interactiva de resolución de examen (UC15).
    *   **Funcionamiento:** Renderiza las preguntas (`ExamQuestions`) y las opciones de respuesta múltiple. El Alumno/Productor selecciona sus respuestas y presiona "Enviar".
    *   **Resultados y Retroalimentación (UC16):** Al enviar, el controlador backend evalúa las respuestas contra la base de datos, calcula la nota en tiempo real y muestra de inmediato el puntaje obtenido, confirmando si el examen fue aprobado o si debe reintentarse.
