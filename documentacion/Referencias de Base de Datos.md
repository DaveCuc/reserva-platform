# Documentación de la Base de Datos y Migraciones

Este documento contiene la explicación del esquema de la base de datos, dividido por apartados lógicos, y detalla el historial de migraciones (cómo y por qué evolucionó la base de datos).

## 1. Módulo de Autenticación y Sistema Core
Estas tablas son generadas por defecto por Laravel y manejan la seguridad y el rendimiento del sistema.

*   **users**: Tabla principal. Almacena nombre, email, contraseña, y el flag `is_teacher` (añadido después para distinguir a los instructores). También maneja campos para la autenticación de dos factores (2FA).
*   **password_reset_tokens**: Guarda temporalmente los códigos cuando un usuario olvida su contraseña.
*   **sessions**: Guarda las sesiones activas de los usuarios (cuando se configura la base de datos como driver de sesión).
*   **cache / cache_locks**: Tablas internas de Laravel para guardar información en caché y acelerar la plataforma.
*   **jobs / job_batches / failed_jobs**: Sistema de colas (queues) para ejecutar tareas pesadas en segundo plano (ej. envío de correos masivos o procesamiento de videos).

## 2. Módulo de Cursos (LMS)
Este apartado maneja toda la lógica de los cursos que se imparten en la plataforma.

*   **categories**: Categorías generales para clasificar los cursos (ej. "Marketing", "Turismo").
*   **courses**: La tabla central. Guarda el título, descripción, precio, si es gratuito o de pago, el estado de publicación y la categoría asociada.
*   **chapters**: Los capítulos o lecciones que componen un curso. Incluye orden, video y si es de visualización gratuita (como un preview).
*   **attachments**: Archivos descargables adjuntos a un curso (PDFs, guías, etc.).
*   **mux_data**: Guarda los identificadores de integración con "Mux" (el proveedor de streaming de video) asociados a cada capítulo.

## 3. Módulo de Formación y Progreso
Maneja la relación entre el Alumno/Productor y los cursos.

*   **purchases**: Registra cuando un Alumno/Productor se inscribe oficialmente a un curso (acceso directo gratuito).
*   **user_progress**: Guarda una fila por cada capítulo que un usuario completa, permitiendo calcular el porcentaje de avance general.
*   **certificates**: Registra los certificados oficiales en PDF emitidos a un Alumno/Productor tras completar el 100% de capítulos y aprobar todos los exámenes.

## 4. Módulo de Exámenes
Permite al Profesor evaluar al Alumno/Productor.

*   **exams**: Exámenes asignados a un curso, con título, descripción y puntaje mínimo para aprobar.
*   **exam_questions**: Las preguntas formuladas dentro de un examen.
*   **exam_options**: Múltiples opciones de respuesta para cada pregunta, marcando cuál es la correcta (`is_correct`).
*   **exam_attempts**: Registra cada vez que un Alumno/Productor realiza un examen, guardando sus respuestas y la calificación obtenida.

## 5. Módulo del Directorio Turístico
Funciona como una "sección amarilla" o directorio de negocios locales.

*   **directorios**: La tabla principal. Empezó de manera muy sencilla, pero a través de varias migraciones se volvió el módulo más robusto. Guarda nombre comercial, razón social, ubicación (municipio/región), información de contacto personal y de la empresa, descripción, enlaces web, redes sociales, actividades y estatus de aprobación.
*   **trade_taxonomies / directorio_trade_taxonomy**: Tablas para categorizar el negocio de forma estricta (ej. giro, subtipo).
*   **directorio_certificates**: Almacena las certificaciones formales o distintivos (ej. Distintivo H, Punto Limpio) subidos por los comercios.

## 6. Módulo de Eventos y Blog
*   **events**: Guarda los webinars, eventos presenciales o masterclasses, junto con su fecha, ubicación, organizadores y enlaces de registro.
*   **articles**: Publicaciones de blog (noticias o artículos) escritos por los usuarios/profesores.

---

## Historial de Migraciones (Orden Cronológico)

A continuación se explica qué sucedió en cada bloque de migraciones y por qué existen varios archivos:

### Inicialización de Laravel
*   `0001_01_01_000000_create_users_table.php` a `0001_01_01_000002_create_jobs_table.php`: **¿Qué sucedió?** Se instaló el framework Laravel. Se crearon las tablas estructurales para que el sistema pudiera existir (usuarios, caché, colas).

### Creación del Core LMS (20 de Marzo de 2026)
*   `2026_03_20_151450_create_attachments_table.php` hasta `2026_03_20_151452_create_stripe_customers_table.php`: **¿Qué sucedió?** Se construyó la primera versión de la aplicación. Se crearon todas las tablas fundacionales de los cursos (courses, chapters), el registro de progreso y compras, y la tabla básica del directorio de empresas.

### Evolución del Sistema (Marzo - Junio 2026)
*En lugar de alterar las migraciones del 20 de marzo, se crearon nuevas migraciones para añadir columnas o modificar tablas, lo cual permite un control de versiones correcto y evita pérdida de datos en producción.*

*   `2026_03_23_182252_add_is_teacher_to_users_table.php`: **¿Qué sucedió?** Se añadió la bandera booleana (`is_teacher`) a la tabla de usuarios para habilitar el espacio de gestión del **Profesor**.
*   `2026_04_20_200000_...` al `2026_04_27_234017_...`: **¿Qué sucedió?** Actualización enfocada en el **Directorio Comercial**. Se añadieron columnas a `directorios` para recolectar datos (is_published, status de aprobación, galerías, cargo del titular, taxonomías).
*   `2026_05_01_012937_create_articles_table.php` al `2026_05_02_020331_...`: **¿Qué sucedió?** Se introdujeron las funciones de contenido: Artículos de Blog y Eventos Comunitarios.
*   `2026_05_06_173913_create_exams_table.php` al `2026_05_06_173915_create_exam_attempts_table.php`: **¿Qué sucedió?** Se desarrolló el **Sistema de Evaluaciones**. Se crearon las tablas de exámenes, preguntas, opciones, intentos de los usuarios (Alumno/Productor) y la emisión de certificados tras aprobar.
*   `2026_05_19_164324_add_two_factor_columns...`: **¿Qué sucedió?** Se fortaleció la seguridad añadiendo Autenticación de Dos Factores (2FA) y Passkeys para los usuarios.
*   `2026_06_04_185059_drop_stripe_and_cashier_tables_and_columns.php`: **¿Qué sucedió?** Migración que eliminó las tablas y columnas de Stripe/Cashier, estableciendo la gratuidad e inscripción directa en la plataforma.
*   `2026_06_04_191801_add_rejection_reason_to_directorios_table.php`: **¿Qué sucedió?** Se añadió soporte para que el Profesor pueda registrar observaciones obligatorias al rechazar una solicitud comercial (`rejection_reason`) para que el Alumno/Productor pueda subsanarlas.
*   `2026_06_04_204643_create_directorio_certificates_table.php`: **¿Qué sucedió?** Última función del directorio, permitiendo que las empresas suban archivos PDF probando sus certificaciones turísticas formales.
