# **Documento de Alcance de Evaluación: Arquitectura Visual y Módulos de la Plataforma Web**

---

## **1. Introducción y Propósito del Documento**

El presente documento tiene como objetivo describir de manera clara, visual y comprensible el **alcance funcional, la arquitectura de navegación y los módulos interactivos** que conforman la plataforma web de turismo, conservación y capacitación de la Reserva de la Biosfera.

Este documento está diseñado para ser consultado por evaluadores, directivos, coordinadores de proyecto y usuarios en general, prescindiendo de tecnicismos complejos para enfocarse en:
* **Qué elementos visuales componen cada pantalla.**
* **Qué información y recursos se muestran al usuario.**
* **Qué acciones e interacciones puede realizar cada perfil de usuario.**

---

## **2. Patrones de Diseño, Identidad y Comportamiento Transversal**

Para garantizar una experiencia de usuario intuitiva, atractiva y consistente en toda la plataforma, se han implementado lineamientos visuales e interactivos estandarizados:

### **2.1. Identidad Visual y Experiencia de Usuario**
* **Paleta Cromática Armónica:** Inspirada en la riqueza natural de la Reserva de la Biosfera (tonos esmeralda, verdes orgánicos, acentos cálidos y fondos claros de alta legibilidad).
* **Diseño Adaptable (Responsive):** La interfaz ajusta automáticamente su disposición en computadoras de escritorio, laptops, tabletas y teléfonos móviles.
* **Componentes de Alto Impacto:** Tarjetas con micro-animaciones al pasar el cursor (hover), carruseles dinámicos de imágenes, galerías interactivas y transiciones suaves entre vistas.

### **2.2. Navegación en el Área Pública**
* **Barra de Navegación Principal (Navbar Superior):**
  * Presenta los logotipos institucionales y los accesos a las cinco rutas principales: **Inicio**, **Mapa**, **Directorio**, **Cursos** y **Acceder**.
  * Posee un comportamiento reactivo: ajusta su color y transparencia para integrarse con la imagen de fondo o contrastar sólidamente al hacer scroll.
  * Muestra el avatar y nombre del usuario cuando este ha iniciado sesión.
* **Pie de Página Integral (Footer):**
  * Ubicado en la parte inferior de todas las páginas públicas.
  * Incluye la marca del proyecto, logotipos oficiales, enlaces rápidos de navegación interna y accesos a portales institucionales de conservación y turismo.
* **Botón Flotante de Contacto / Enlace Institucional:**
  * Burbuja interactiva siempre visible en la esquina inferior para redireccionar a canales oficiales de atención o sitios de interés.

### **2.3. Sistema de Formularios y Asistentes de Creación**
* **Flujo Asistido en Dos Fases:** Al crear un elemento (un curso, un evento, un artículo o un negocio), primero se solicita el título o nombre básico mediante un diálogo claro; una vez confirmado, se abre el panel de edición detallada.
* **Banners y Alertas de Estado:** Notificaciones visuales en color ámbar/amarillo que orientan al usuario si un contenido está en borrador o si faltan requisitos para poder publicarlo.
* **Modales de Confirmación:** Ventanas emergentes de seguridad para validar acciones críticas (como eliminar un registro, rechazar una solicitud comercial o cerrar sesión).
* **Etiquetas de Estado (Badges):** Indicadores visuales en colores distintivos para identificar rápidamente la condición de un registro:
  * 🟢 **Aprobado / Publicado:** Visible para el público general.
  * 🟡 **Pendiente de Revisión:** En espera de auditoría por el equipo gestor.
  * ⚪ **Borrador:** En proceso de llenado por el autor.
  * 🔴 **Rechazado:** Con observaciones pendientes de solventar.

---

## **3. Módulos y Rutas del Área Pública (Visitante)**

El área pública está abierta a visitantes sin necesidad de autenticación previa, cubriendo los casos de uso UC01 al UC10.

```
                    ┌──────────────────────────────────────────────┐
                    │               PORTAL PÚBLICO                 │
                    └──────────────────────┬───────────────────────┘
         ┌──────────────────┬──────────────┴─────┬──────────────────┬──────────────────┐
         ▼                  ▼                    ▼                  ▼                  ▼
  ┌──────────────┐   ┌──────────────┐     ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
  │ 1. Inicio    │   │ 2. Mapa      │     │ 3. Directorio│   │ 4. Cursos    │   │ 5. Eventos y │
  │    (Portada) │   │ Interactivo  │     │ Comercial    │   │ (Capacitación│   │ Artículos    │
  └──────────────┘   └──────────────┘     └──────┬───────┘   └──────────────┘   └──────────────┘
                                                 │
                                                 ▼
                                          ┌──────────────┐
                                          │ Ficha de     │
                                          │ Negocio      │
                                          └──────────────┘
```

---

### **3.1. Página de Inicio (Landing Page / Portada)**
Es la carta de presentación de la plataforma, diseñada para cautivar al visitante mediante una narrativa visual envolvente.

* **Elementos visuales en pantalla:**
  * **Portada Principal (Hero Section):** Carrusel fotográfico con postales representativas de la Reserva, logotipo institucional, mensaje de bienvenida y botones de acceso directo al mapa y al directorio.
  * **Cintillo de Eventos y Novedades:** Tarjetas de eventos recientes con fecha, fotografía y título descriptivo.
  * **Muestrario de Rutas Turísticas:** Tarjetas panorámicas de rutas destacadas (senderismo, avistamiento, cultura) con botón para abrirlas en el mapa interactivo.
  * **Sección "Conócenos":** Bloque informativo sobre los objetivos ecológicos, la riqueza biocultural y el compromiso comunitario de la Reserva.
  * **Sección "Comunidad y Capacitación":** Bloque de llamado a la acción que invita tanto a capacitarse a través de los cursos como a inscribir prestadores de servicios en el directorio.

---

### **3.2. Mapa Geográfico Interactivo**
Herramienta de exploración territorial que permite visualizar la Reserva de la Biosfera en un mapa dinámico con capas de información superpuestas.

* **Lienzo Cartográfico Central:**
  * Mapa navegable con controles táctiles y de ratón (acercamiento, paneo y rotación).
  * Marcadores (pines) georreferenciados para cada negocio y atractivo, con iconos según su giro.
  * Polígonos territoriales que delimitan la Reserva y sus municipios asociados.
* **Panel Lateral Izquierdo (Controles y Filtros de Capas):**
  * **Capa Base de la Reserva:** Interruptor para mostrar u ocultar el límite oficial protegido.
  * **Regiones y Municipios:** Selector codificado por colores para encender o apagar municipios específicos.
  * **Rutas Turísticas:** Activadores que dibujan sobre el mapa los senderos y trayectos sugeridos.
  * **Puntos de Interés / Giros Comerciales:** Filtros para mostrar únicamente ciertas actividades (por ejemplo: *Hospedaje*, *Restaurantes y Gastronomía*, *Guías de Naturaleza*, *Artesanías*).
* **Interacción con los Marcadores:**
  * Al pasar el cursor, el marcador se amplía suavemente.
  * Al hacer clic sobre un marcador, se despliega un globo emergente (popup) en el mapa y simultáneamente se cargan los datos en el panel lateral derecho.
* **Panel Lateral Derecho (Ficha Rápida del Negocio):**
  * Muestra la fotografía del establecimiento, nombre comercial, giro, breve reseña, dirección física, teléfono con enlace directo a llamada y botón **"Ver ficha completa"**.
* **Bloque Inferior de Rutas:**
  * Tarjetas informativas al pie del mapa que desglosan los atractivos clave de las tres principales rutas ecoturísticas.

---

### **3.3. Directorio Comercial y Turístico**
Catálogo estructurado para encontrar prestadores de servicios locales de manera ágil.

* **Buscador y Filtros Paramétricos:**
  * Selector por **Giro Comercial / Categoría** (Hoteles, Cabañas, Alimentos, Ecoturismo, etc.).
  * Selector por **Región / Municipio**.
  * Si no se aplican filtros, el sistema muestra el padrón completo de negocios aprobados.
* **Cuadrícula de Resultados:**
  * Tarjetas comerciales uniformes que presentan: imagen de portada, insignia de categoría, nombre comercial, síntesis de servicios, municipio, número de contacto y botón de acceso a la ficha.
* **Gestión de Estados y Búsqueda Vacía:**
  * Mensaje ilustrado de "No se encontraron coincidencias" con sugerencia de restablecer filtros.
* **Banner de Afiliación de Comercios:**
  * Sección inferior que invita a los dueños de negocios locales a darse de alta en la plataforma mediante un botón de registro guiado.

---

### **3.4. Ficha Pública de Detalle del Negocio (Perfil Comercial)**
Página dedicada a exponer a detalle la oferta, calidad y autenticidad de un prestador de servicios.

* **Cabecera Panorámica:** Gran fotografía de portada, logotipo o imagen distintiva, nombre del negocio, sello de giro comercial y ubicación municipal.
* **Bloque de Contacto y Canales Directos:**
  * Botones directos para marcar por teléfono, enviar correo electrónico, visitar el sitio web oficial y enlaces a redes sociales (Facebook, Instagram, WhatsApp).
  * Horarios habituales de atención al público.
* **Actividades y Servicios Ofrecidos:**
  * Lista visual en forma de cápsulas o etiquetas (por ejemplo: *Estacionamiento*, *Guías certificados*, *Wifi*, *Acepta tarjetas*, *Senderismo guiado*).
* **Galería Fotográfica:**
  * Cuadrícula de fotografías de alta resolución con visor interactivo para apreciar las instalaciones, paisajes y productos.
* **Distintivos y Certificaciones Oficiales:**
  * Sección que muestra sellos de calidad, sustentabilidad ambiental o acreditaciones turísticas obtenidas por el negocio, con posibilidad de consultar los documentos acreditativos.
* **Descripción Detallada y Ubicación:**
  * Redacción completa sobre la historia, experiencia y servicios del establecimiento.
  * Mapa insertado con el punto exacto de localización y botón para trazar la ruta en aplicaciones de navegación.

---

### **3.5. Portal de Cursos (Capacitación)**
Página introductoria para el público interesado en la profesionalización comunitaria y turística.

* **Presentación del Programa de Formación:** Explicación del modelo de capacitación gratuita para productores y prestadores de servicios locales.
* **Muro de Docentes y Facilitadores:** Carrusel de tarjetas con fotografías, nombres completos y cargos de los instructores e instituciones colaboradoras.
* **Llamado a la Acción (CTA):** Botón directo para ingresar al catálogo de cursos disponibles dentro del aula virtual.

---

### **3.6. Enlaces de Interés y Artículos (Divulgación y Noticias)**
Espacio de lectura para aprender sobre conservación, cultura comunitaria y normativas ecológicas.

* **Pantalla de Lectura de Artículo:**
  * Imagen de cabecera de alta calidad, título principal, autoría institucional, fecha de publicación y categoría temática.
  * Cuerpo de texto enriquecido con subtítulos, párrafos descriptivos e imágenes ilustrativas.
  * Barra lateral con recomendaciones de otros artículos recientes y enlaces relacionados.

---

### **3.7. Agenda Pública de Eventos**
Cartelera de talleres, ferias, jornadas de reforestación y actividades comunitarias.

* **Listado de Eventos:** Tarjetas ordenadas cronológicamente con fecha, hora, lugar y fotografía.
* **Ficha Individual del Evento:**
  * Fotografía de portada y título del evento.
  * Barra fija (sticky) con fecha, horario, modalidad (presencial/virtual) y botón de registro o confirmación de asistencia (RSVP).
  * Desglose de objetivos y temas a tratar durante la jornada.
  * Mapa de ubicación exacta del recinto.
  * Directorio visual de organizadores, ponentes y anfitriones (foto, nombre y rol institucional).

---

### **3.8. Acceso y Seguridad (Login y Recuperación)**
Entorno seguro y minimalista que centraliza la entrada a las áreas privadas.

* **Pantalla de Ingreso:** Campos claros para correo electrónico y contraseña, opción de "Recordar sesión" y botón de acceso.
* **Recuperación de Contraseña:** Formulario sencillo para solicitar un enlace de restablecimiento seguro vía correo electrónico en caso de olvido.

---

## **4. Entorno Privado (Dashboard) - Módulos del Alumno/Productor**

Una vez autenticado, el usuario **Alumno/Productor** accede a su panel de control personalizado, donde interactúa con las áreas funcionales de **Formación** (UC11 a UC17), **Gestión del Negocio** (UC18 a UC20), **Contenido del Usuario** (UC29) y **Perfil de Usuario** (UC28).

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Barra Superior (Topbar): Nombre de Usuario | [Cambiar a Modo Profesor] | 👤  │
├───────────────────┬─────────────────────────────────────────────────────────┤
│ MENÚ LATERAL      │ ÁREA PRINCIPAL DE CONTENIDO                             │
│                   │                                                         │
│ • Mis Cursos      │  [ Cursos en Progreso ]       [ Cursos Completados ]    │
│ • Explorar Cursos │  ┌────────────────────────┐   ┌───────────────────────┐ │
│ • Descubrir       │  │ Curso: Guías Locales   │   │ Curso: Hospitalidad   │ │
│ • Mi Negocio      │  │ Progreso: [████░░] 65% │   │ Progreso: [██████]100%│ │
│ • Mi Perfil       │  │ [ Continuar Clase ]    │   │ [ Descargar Diploma ] │ │
│                   │  └────────────────────────┘   └───────────────────────┘ │
└───────────────────┴─────────────────────────────────────────────────────────┘
```

---

### **4.1. Monitor de Aprendizaje ("Mis Cursos" - UC13)**
Panel principal donde el usuario consulta sus cursos inscritos y su progreso formativo.

* **Cursos en Progreso:**
  * Tarjetas de cursos inscritos que muestran portada, título, categoría y una **barra de progreso porcentual**.
  * Botón directo **"Continuar"** que reanuda el curso en la lección correspondiente (UC14).
* **Cursos Completados:**
  * Sección dedicada a las capacitaciones que han alcanzado el 100% de avance y exámenes aprobados.
  * Habilita el botón directo para **descargar el certificado oficial** (UC17).
* **Estado Vacío:** Si el usuario no se ha inscrito a ningún curso, se muestra una ilustración motivacional y un botón para dirigirse al catálogo de exploración (UC11).

---

### **4.2. Catálogo de Exploración e Inscripción de Cursos (UC11, UC12)**
Buscador y catálogo interno para descubrir capacitaciones e inscribirse de forma directa y gratuita.

* **Buscador por Título:** Campo de texto en tiempo real para encontrar capacitaciones por palabra clave.
* **Filtros por Categoría Temática:** Pestañas para filtrar (por ejemplo: *Ecoturismo*, *Atención al Cliente*, *Gestión Ambiental*, *Marketing Digital*).
* **Tarjetas Informativas e Inscripción:** Muestran portada, título, categoría, cantidad de capítulos y botón directo **"Inscribirme gratis"** (UC12).

---

### **4.3. Aula Virtual / Entorno de Aprendizaje Inmersivo (UC14)**
Espacio de estudio diseñado para una lectura y visualización cómoda y libre de distracciones.

* **Portada del Curso:**
  * Resumen general del programa educativo, objetivos de aprendizaje, instructor a cargo y botón **"Iniciar Lección"**.
* **Visor de Lección (Reproductor):**
  * **Barra Lateral de Temario:** Reemplaza al menú general y lista todos los capítulos y exámenes en orden secuencial.
  * **Indicadores de Progreso:** Cada unidad completada muestra una casilla de verificación verde.
  * **Contenedor Multimedia Central:**
    * Reproducción de video formativo.
    * Inserción de infografías e imágenes explicativas.
    * Texto educativo enriquecido con formato de fácil lectura.
  * **Descarga de Materiales de Apoyo:** Documentos adjuntos en PDF (manuales, guías prácticas, formatos descargables).
  * **Botón "Marcar como completado y continuar":** Permite al alumno avanzar sistemáticamente en su progreso.

---

### **4.4. Sistema de Evaluaciones y Certificación (UC15, UC16, UC17)**
Módulo que valida el aprendizaje obtenido para emitir el reconocimiento institucional.

* **Pantalla de Instrucciones del Examen:**
  * Detalla el puntaje mínimo aprobatorio (por ejemplo: *80% de aciertos*), el número de intentos permitidos y las indicaciones generales.
* **Interfaz de Resolución de Examen (UC15):**
  * Presentación clara de las preguntas con opciones de respuesta de selección múltiple.
  * Botón para enviar respuestas una vez contestado el cuestionario.
* **Pantalla de Resultados y Retroalimentación (UC16):**
  * Desglose instantáneo del puntaje alcanzado y aviso de aprobación o reprobación.
  * Contador de intentos restantes en caso de no haber superado el puntaje mínimo.
* **Descarga de Certificado (UC17):**
  * Al completar el 100% de los capítulos publicados y aprobar todas las evaluaciones del curso, el sistema genera y descarga un **certificado oficial en formato PDF** con el nombre del participante, fecha de finalización y sellos institucionales.

---

### **4.5. Gestión del Negocio Propio (UC18, UC19, UC20)**
Herramienta que faculta a los productores y prestadores de servicios locales a registrar y gestionar su establecimiento para que sea publicado en el mapa y directorio tras la revisión y dictamen favorable.

* **Tablero de Negocios del Usuario:**
  * Lista de comercios registrados por el usuario con su nombre comercial, giro, fecha de registro y **etiqueta de estado** (*Borrador*, *En Revisión*, *Aprobado*, *Rechazado*).
  * Botón principal **"Registrar Nuevo Negocio"**.
* **Gestión y Edición Modular del Negocio (UC18):**
  * El usuario completa y actualiza de manera integral los datos del establecimiento:
    1. **Datos Generales y Giro:** Nombre comercial, selección de giro principal, descripción corta, descripción extendida y selección de servicios/amenidades.
    2. **Contacto y Representante:** Nombre y cargo del responsable, teléfonos, WhatsApp, correo electrónico, sitio web y redes sociales.
    3. **Ubicación Territorial:** Región, municipio, dirección descriptiva y coordenadas geográficas fijadas en mapa interactivo.
    4. **Galería Fotográfica y Certificaciones:** Carga de fotografías del establecimiento y documentos o sellos de certificación ecológica/turística.
* **Flujo de Envío a Revisión (UC19):**
  * **Botón "Enviar a Revisión":** Envía formalmente la solicitud comercial al equipo docente para su auditoría. El estado pasa a `En Revisión`.
* **Subsanación de Observaciones (UC20):**
  * En caso de que el Profesor emita un dictamen de rechazo, el sistema despliega una alerta con las **observaciones detalladas redactadas por el evaluador**. El usuario puede editar los datos señalados, subsanar las observaciones y **reenviar la solicitud a revisión**.

---

### **4.6. Contenido del Usuario: Enlaces de Interés (UC29)**
Acceso directo desde el panel de usuario al módulo **Descubrir** (`/discover`), permitiendo consultar artículos de interés y la agenda comunitaria de eventos sin salir de su sesión.

---

### **4.7. Configuración de Perfil de Usuario (UC28)**
* Formulario para actualizar el nombre de usuario y correo electrónico.
* Módulo para cambiar y fortalecer la contraseña de acceso.
* Opción de eliminación definitiva de cuenta de usuario con diálogo de seguridad.

---

## **5. Espacio de Gestión - Módulo de Gestión Docente (Profesor)**

El actor **Profesor** dispone de herramientas especializadas para la creación pedagógica, administración de contenidos editoriales y la auditoría y dictamen de solicitudes comerciales (UC21 a UC27).

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Barra Superior en Color Verde ("Modo Profesor Activo")                      │
├───────────────────┬─────────────────────────────────────────────────────────┤
│ MENÚ GESTIÓN      │ HERRAMIENTAS DOCENTES Y ADMINISTRATIVAS                 │
│                   │                                                         │
│ • Cursos          │  [ + Nuevo Curso ]   [ + Nuevo Evento ]  [ + Artículo ] │
│ • Solicitudes     │  ┌────────────────────────────────────────────────────┐ │
│   (Moderación)    │  │ BANDEJA DE AUDITORÍA COMERCIAL                     │ │
│ • Artículos       │  │ Negocio: "Cabañas del Bosque" | Estado: Pendiente  │ │
│ • Eventos         │  │ [ Auditar y Dictaminar: Aprobar / Rechazar ]       │ │
│ • Salir de Modo   │  └────────────────────────────────────────────────────┘ │
└───────────────────┴─────────────────────────────────────────────────────────┘
```

---

### **5.1. Gestión y Creación de Cursos y Exámenes (UC21, UC22, UC23)**
Entorno completo para diseñar la experiencia pedagógica de la plataforma.

* **Indicador Visual del Modo Profesor:** La barra superior adopta un color verde distintivo que señala que se está operando en la gestión docente.
* **Listado General de Cursos (UC21):**
  * Tabla con todos los cursos creados, indicando su título, categoría, cantidad de capítulos, estado (*Borrador* o *Publicado*) y botón para editar o eliminar.
* **Constructor y Editor de Contenido de Cursos (UC23):**
  * **Ficha Informativa:** Título del curso, descripción pedagógica, selección de categoría e imagen de portada representativa.
  * **Gestor de Temario Interactivo:** Permite organizar el orden de las lecciones y exámenes arrastrando y soltando los elementos en la posición deseada.
  * **Editor de Capítulos Individuales:**
    * Definición de título y descripción de la lección.
    * Subida y asignación de video explicativo, imágenes o contenido en texto.
    * Casilla para definir si el capítulo es de acceso gratuito/vista previa.
    * Interruptor para publicar o despublicar la unidad individualmente.
  * **Gestor de Documentación Adjunta:** Subida y eliminación de guías en PDF vinculadas al curso.
* **Constructor de Exámenes (UC22):**
  * Configuración de título de la evaluación, porcentaje mínimo de aprobación y límite de intentos.
  * Creador de preguntas: Formulario para añadir enunciados y opciones de respuesta, marcando visualmente cuál es la opción correcta.
* **Publicación del Curso (UC21):** Valida que el curso cuente con los elementos mínimos para habilitar su publicación en la plataforma.

---

### **5.2. Revisión de Solicitudes y Dictamen de Negocios (UC24, UC25)**
Centro de revisión donde el Profesor audita y dictamina las solicitudes de los productores que aspiran a integrarse al mapa y directorio.

* **Bandeja de Entrada de Solicitudes (UC24):**
  * Tabla con filtros rápidos por estado (*Pendiente*, *Aprobado*, *Rechazado*).
  * Columnas con nombre comercial, nombre del solicitante, fecha de recepción y municipio.
* **Expediente Digital de Auditoría (UC24):**
  * Desglose completo de la información enviada por el prestador de servicios:
    * Nombre comercial, giros y servicios declarados.
    * Datos de contacto y representante.
    * Ubicación geográfica exacta sobre el mapa interactivo.
    * Galería de fotografías cargadas.
    * Visualizador de certificados y sellos ambientales adjuntos.
* **Emisión de Dictamen (UC25 - <<include>> desde UC24):**
  * **Aprobar:** Autoriza de inmediato el comercio, publicándolo automáticamente en el Mapa y Directorio público.
  * **Rechazar:** Abre de forma obligatoria una **ventana modal para registrar las observaciones y motivos de rechazo** (por ejemplo: *"Favor de adjuntar una foto más nítida de la fachada y corregir el número telefónico"*). Esta retroalimentación llega al panel del Alumno/Productor para que pueda subsanarla (UC20).

---

### **5.3. Gestión de Artículos (UC26)**
Sistema de publicación de noticias, guías y contenido editorial de la Reserva.

* **Listado de Artículos:** Tabla con títulos, autor, categoría temática, fecha y estado de publicación.
* **Editor de Artículos:**
  * Campo de título y resumen ejecutivo (extracto para tarjetas).
  * Asignación de autor institucional y categoría.
  * Carga de imagen miniatura e imagen de cabecera panorámica.
  * Editor de cuerpo del artículo para redactar el contenido completo.
  * Botón para alternar entre *Borrador* y *Publicado*.

---

### **5.4. Gestión de Eventos (UC27)**
Módulo para programar y difundir las actividades públicas y comunitarias de la Reserva.

* **Listado de Eventos:** Visualización de la cartelera con fechas programadas y estatus de publicación.
* **Editor de Eventos:**
  * Definición de título descriptivo, resumen y descripción completa.
  * Parámetros logísticos: fecha y hora de inicio, fecha y hora de término, modalidad y dirección con coordenadas en mapa.
  * Enlace externo de registro o boletos (RSVP).
  * Carga de imágenes promocionales (imagen de tarjeta y portada panorámica).
  * Constructor dinámico de ponentes y organizadores (fotografía, nombre completo y rol/cargo institucional).
  * Botón para publicar el evento en la cartelera pública.

---

## **6. Matriz Resumen de Roles y Capacidades en la Plataforma**

A continuación se presenta el resumen de interacción de cada actor oficial con los grupos funcionales y casos de uso del sistema:

| Grupo Funcional / Caso de Uso | Visitante | Alumno/Productor | Profesor |
| :--- | :---: | :---: | :---: |
| **Área Pública (UC01 - UC10)** | Acceso libre | Acceso libre | Acceso libre |
| • Explorar inicio, mapa, directorio y fichas (UC01-UC04) | Sí | Sí | Sí |
| • Consultar cursos, artículos y eventos (UC05-UC07) | Sí | Sí | Sí |
| • Iniciar sesión, registrarse, recuperar clave (UC08-UC10) | Sí | Autenticado | Autenticado |
| **Formación (UC11 - UC17)** | Requiere iniciar sesión | Acceso y progreso completo | Acceso y progreso completo |
| • Explorar e inscribirse a cursos (UC11, UC12) | No | Sí | Sí |
| • Consultar mis cursos y estudiar en aula (UC13, UC14) | No | Sí | Sí |
| • Resolver examen y consultar resultados (UC15, UC16) | No | Sí | Sí |
| • Descargar certificado oficial en PDF (UC17) | No | Sí (si aprueba) | Sí (si aprueba) |
| **Gestión del Negocio (UC18 - UC20)** | No | Acceso completo | Acceso completo |
| • Registrar y gestionar mi negocio (UC18) | No | Sí | Sí |
| • Enviar solicitud a revisión (UC19) | No | Sí | Sí |
| • Subsanar observaciones tras rechazo (UC20) | No | Sí | Sí |
| **Contenido del Usuario (UC29)** | No | Sí | Sí |
| • Consultar enlaces de interés (/discover) | No | Sí | Sí |
| **Perfil de Usuario (UC28)** | No | Sí | Sí |
| • Configurar perfil personal y seguridad | No | Sí | Sí |
| **Gestión Docente (UC21 - UC27)** | No disponible | No disponible | Control total |
| • Gestionar cursos, exámenes y contenidos (UC21-UC23) | No | No | Sí |
| • Revisar solicitudes de negocio y dictaminar (UC24, UC25) | No | No | Sí |
| • Gestionar artículos y eventos (UC26, UC27) | No | No | Sí |

---

## **7. Conclusión del Alcance**

La plataforma integra en un único ecosistema digital tres pilares fundamentales:
1. **Promoción y Visibilidad Territorial:** Mediante un mapa interactivo avanzado, un directorio comercial categorizado y fichas comerciales con sello oficial.
2. **Capacitación y Profesionalización Comunitaria:** A través de un aula virtual intuitiva con reproducción de contenidos, exámenes interactivos y certificación automática.
3. **Gobernanza y Moderación de Calidad:** Con un flujo transparente de auditoría donde el Profesor evalúa cada solicitud comercial y orienta al Alumno/Productor mediante retroalimentación constructiva.