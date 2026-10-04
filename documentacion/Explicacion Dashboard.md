# Documentación Detallada: Dashboard (Panel de Usuario)

La carpeta `resources/js/Pages/Dashboard` contiene todas las interfaces privadas a las que accede un usuario **después de iniciar sesión**. Es decir, todo el contenido de esta carpeta está protegido por autenticación y utiliza el marco `MainLayout` (que incluye el menú lateral o sidebar).

Se organiza según las funciones del **Alumno/Productor** (Formación, Gestión del Negocio, Contenido y Perfil) y del **Profesor** (Gestión Docente). A continuación se explica cada sección:

---

## 1. Raíz (`Dashboard/`)

### `Index.jsx`
*   **Funcionamiento:** Es la pantalla inicial de bienvenida cuando un usuario se autentica. Representa el monitor de aprendizaje del **Alumno/Productor** (UC13 Consultar mis cursos).
*   **Lógica:** Recibe desde el backend las propiedades `completedCourses` y `coursesInProgress`. 
*   **Conexiones:** Utiliza el subcomponente `InfoCard.jsx` (ubicado en `Dashboard/Components/`) para mostrar contadores rápidos (ej. "3 Cursos en Progreso"), y se conecta con `CoursesList` (importado desde la carpeta `Search/`) para desplegar la grilla con los cursos que el usuario está cursando actualmente para continuar aprendiendo (UC14).

### `Components/InfoCard.jsx`
*   **Funcionamiento:** Componente visual reutilizable que dibuja una tarjeta con un icono (`lucide-react`), un título y un número grande para métricas rápidas de avance formativo.

---

## 2. Carpeta `Dashboard/Discover/`
El centro de contenido del usuario para enlaces de interés (UC29).

*   **`Index.jsx`:** Es la pantalla de **Descubrir** (`/discover`), donde los usuarios autenticados consultan artículos de divulgación, noticias y la cartelera comunitaria de eventos sin salir de su sesión.
*   **`Components/`:** Contiene subcomponentes visuales específicos para renderizar las tarjetas de eventos (`EventCard.jsx`, `EventBanner.jsx`) y artículos (`ArticleCard.jsx`).
*   **Conexiones:** Ruta `/discover` en `routes/web.php` que suministra las colecciones de `$articles`, `$events` y `$categories`.

---

## 3. Carpeta `Dashboard/Search/`
El catálogo y motor de búsqueda de formación del LMS (UC11 Explorar cursos).

*   **`Index.jsx`:** Pantalla dedicada a explorar y buscar cursos por palabras clave o categorías temáticas (`/search`).
*   **`Components/`:** Contiene la lógica visual de los resultados de cursos.
    *   **Importante:** Aquí reside el componente `CoursesList.jsx`, el cual es reutilizable y es importado también por `Dashboard/Index.jsx` para dibujar las grillas de cursos de forma uniforme.
*   **Conexiones:** Responde a la ruta `/search` despachada por `CourseController@index`. Permite abrir la portada del curso e inscribirse directamente de forma gratuita (UC12).

---

## 4. Carpeta `Dashboard/Teacher/` (Espacio del Profesor)
Área exclusiva para usuarios con rol docente (`is_teacher = true`). Corresponde al grupo de **Gestión Docente** (UC21 a UC27):

*   **`Courses/`:** Pantallas para administrar cursos pedagógicos (UC21). Permite listar los cursos creados y acceder a la edición de temarios interactivos (drag & drop), lecciones multimedia y carga de documentos PDF adjuntos (UC23).
*   **`Events/` & `Articles/`:** Pantallas para que el Profesor redacte y publique artículos editoriales (UC26) y programe eventos institucionales con información de ponentes (UC27).
*   **`Create/`:** Diálogos modales de creación rápida para dar de alta títulos iniciales antes de pasar a la edición detallada.
*   **`Solicitudes/`:** Bandeja donde el Profesor audita los expedientes de los negocios postulados (UC24) y emite su dictamen formal (UC25): **Aprobar** (publicando en mapa y directorio) o **Rechazar** (registrando observaciones detalladas obligatorias para que el productor las subsane).
*   **Conexiones:** Se comunica estrechamente con los controladores `TeacherCourseController`, `TeacherChapterController`, `TeacherArticleController`, `TeacherEventController` y `TeacherSolicitudController`.

---

## 5. Carpeta `Dashboard/Trades/` (Gestión del Negocio)
Panel para los usuarios **Alumno/Productor** que registran y gestionan su establecimiento comercial o de servicios turísticos (UC18 a UC20).

*   **`Index.jsx`:** Panel principal de establecimientos propios. Muestra la lista de negocios del usuario con sus estados (*Borrador*, *En Revisión*, *Aprobado*, *Rechazado*).
*   **`Create/`:** Diálogo inicial para asignar el nombre comercial básico y abrir la ficha de edición.
*   **`Edit/`:** Pantalla integral y modular de gestión del negocio (UC18). Permite capturar y actualizar datos generales, giro, contacto, redes, georreferenciación en mapa, galería fotográfica y certificados de calidad/ambientales. Desde aquí se realiza el envío formal de la solicitud a revisión (UC19) y, en caso de recibir observaciones de rechazo, se subsanan y reenvían (UC20).
*   **`Components/`:** Componentes de apoyo visual como selectores en cascada (Región -> Municipios), previsualizadores de fotografías y mapas geográficos con pines interactivos.
*   **Conexiones:** Se conecta permanentemente con `DirectoryTradeController`, interactuando con los modelos `Directorio`, `DirectorioCertificate`, categorías y municipios.
