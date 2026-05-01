<!-- Creacion de nuevas funcionalidades para la creacion de articulos o noticias o seccion de eventos.
contara con los siguientes modulos:

    - Administrar articulos 
    - Crear y editar articulos.
    - Buscar de articulos por categoria, titulo, fecha y autor.
    - Ver Articulo. Pagina dinamica.

Reglas:
    - El prosesor es el unico que puede crear, editar, eliminar y publicar articulos.
    - Todos los usuarios peuden tener acceso a los articulos publicados sin estar autenticados.
    - El apartado de "buscar articulos" solo podra ser visto por usuarios autenticados.


Agregar nuevas rutas en el slide de dashboard:
Login profesor
Articulos (/teacher/articles): Administrar (Crear y editar).
Login alumnos y profesor.
Descubrir (/discover): Buscar y ver articulos.


Instrucciones para la creacion de los modulos:

1. Modulo Administrar Articulos.
en la ruta teacher/articles
existira un dashboard para gestionar articulos.
- tabla con todos los articulos.
- boton para crear articulo.
- Copia el modulo de teacher/courses y adapatalo para los articulos. 

2. Modulo Crear y editar articulos.
- se debe acceder por medio del boton editar o crear nuevo articulo.
- para el modulo de creacion de articulos se tomara como referencia el modulo de configuracion del curso.
- Copia la interfaz del modulo de configuracion del curso adaptandolo a las siguientes  necesidades.

- Elementos del formulario: (Todos los campos obligatorios para publicar)
1 Imagen de portada del articulo (upload)
2 Titulo del articulo (input)
3 Descripcion corta del articulo con un maximo de 200 caracteres. (textarea)
4 Nombre del autor (input readonly con el usuario actual) 
5 Categoria (Lista desplegable con las categorias existentes)
6 Contenido del articulo( EditorContent tiptap/react)  
7 Fecha de publicacion del articulo extraida desde la publicacion automatica del sistema.

- Contara con los estados Borrador y publicado.

3 Modulo Descubrir. (Su ruta es /discover)
- se ubicara en el slide de dashboard para alumnos y profesores.
- copia la misma interfaz de search pero adaptala para mostrar los articulos publicados.
- los articulos deben de ser mostrados en forma de lista como buscador de google.
    - Nombre del articulo, fecha de publicacion, autor, categoria, descripcion corta.

4. Ver Articulo. Pagina dinamica. (Su ruta es /articulo/)
- se puede acceder directamente en el buscador estando autenticiado o desde afuera, por eso no ocupara una ruta para autenticados, sera libre.


Los elementos se mostraran de la siguiente manera: 

2 contenedores
1 Tendra el articulo.
2 tendra tarjetas para mostrar otros articulos disponibles, te guiaras por fecha de publicacion mostrando los mas recientes.

1 contenedor
-portada y titulo.
-nombre del autor, fecha de publicacion, categoria.
-contenido del articulo.

2 contenedor.
-tarjetas con otros articulos disponibles.
-imagen,Nombre del articulo, fecha de publicacion, autor, categoria, descripcion corta. (te inspiraras de la tarjeta de eventos recientes del landing page).

-->

### Creation of new functionalities for creating articles, news items, or an events section.

**It will include the following modules:**
- 1. Manage articles
- 2. Create and edit articles
- 3. Search for articles by category, title, date, and author
- 4. View article. Dynamic pages.

**Rules:**
- Only the teacher can create, edit, delete, and publish articles.
- All users can access published articles without being authenticated.
- The "search articles" (discover) section will only be visible to authenticated users.

### Tasks:
- Create modules
- Add and connect new paths

**Instructions for creating the modules:**

**1. Manage Articles Module**

- Add the path teacher/articles

- Add a dashboard to manage articles (table with all articles)

- Add a button to create an article. - Copy the "Gestión de Cursos" module (teacher/courses) and adapt it for articles (./resources/js/Pages/Dashboard/Teacher/Courses/index.jsx).

**2. Article Creation and Editing Module.**

- Access via the "Edit" or "Create New Article" button.

- Copy the interface from the "Configuración del curso" module, adapting it to the following requirements.

- Form elements: (All fields required for publishing)
1. Article cover image (upload)
2. Article title (entry)
3. Short article description (maximum 200 characters) (text area)
4. Author name (read-only input with the current user)
5. Category (drop-down list with existing categories)
6. Article content (EditorContent, Tiptap/React)
7. Article publication date extracted from the system's automatic publishing.

- It will have Draft and Published statuses.

**3. Discover Module. (The path is /discover)**
- It will be located on the slide of the dashboard for students and teachers.

- It copies the same search interface but adapts it to display published articles.

- The articles should be displayed in a list format, like a Google search.

- Article name, publication date, author, category, short description.

**4. View article. Dynamic page. (Its path is /articulos/)**
- It can be accessed directly from the search engine while logged in or from outside, so it will not require a specific path for logged-in users; it will be freely accessible.

-The elements will be displayed as follows:

-2 containers
1. will contain the article.
2. will contain cards to display other available articles, guided by publication date, showing the most recent.

1. Article container 
- Cover and title.
- Author's name, publication date, category.
- Article content.

2. News container 
- Cards with other available articles.
-Image, Article title, publication date, author, category, short description. (You will be inspired by the recent events card on the landing page).

### Folders and files to use for reference:

**1. Manage Articles.**
./resources/js/Pages/Dashboard/Teacher/Courses/
./resources/js/Pages/Dashboard/Teacher/Courses/Components/

./resources/js/Pages/Dashboard/Teacher/index.jsx
./resources/js/Pages/Dashboard/Teacher/Courses/index.jsx
./resources/js/Pages/Dashboard/Teacher/Courses/Components/Columns.jsx,DataTable.jsx

**2. Article Creation and Editing Module.**
./resources/js/Pages/Dashboard/Teacher/Courses/
./resources/js/Pages/Dashboard/Teacher/Courses/Components/
./resources/js/Pages/Dashboard/Teacher/Courses/Edit/

./resources/js/Pages/Dashboard/Teacher/Courses/Edit/index.jsx

**3. Discover Module.**
./resources/js/Pages/Dashboard/Search/
./resources/js/Pages/Dashboard/Search/index.jsx

**4. View article.**
./resources/js/pages/LandingPage/Components/NewsSection.jsx

### Files to Edit
./resources/js/Layouts/MainLayout.jsx
./resources/js/Pages/Dashboard/Teacher/Articles/index.jsx
./resources/js/Pages/LandingPage/Articulos/index.jsx









