### Funcion Eventos.

**contara con los siguietnes modulos:**

- modulo de crear, editar y eliminar eventos.
- paginas dinamicas para mostrar y ver los eventos.
- se vinculara directamente en descubrir para mostrar los eventos con una categoria mas.

## Intrucciones
-Adaptar un nuevo modulo llamado eventos.
 Editaras los archivos, son una copia de articulos.
- Resources/js/pages/Dashboard/Teacher/Events
- Resources/js/pages/LandingPage/Eventos

El nuevo modulo constara de los siguientes cambios, te basaras en la siguiente pagina web:

https://gdg.community.dev/events/details/google-gdg-cloud-mexico-city-presents-build-with-ai-week-gira-universitaria-sur-de-tamaulipas-2026/


### Modulo de editar eventos
### Estructura de carpetas
-resources\js\pages\Dashboard\Teacher\Events

**Seccion Card**
- imagen para el card.

**Seccion Portada**
- Imagen de portada.
- titulo del evento
- ubicacion del evento
- descripcion breve.

**Seccion Banner**
- banner con la fecha, hora, lugar. con un boton rsvp que dira registrarme no requiere estar iniciado sesion soltara un formulario para registrar tus datos.

**Formulario**
- solo colocaras un input para capturar links (ejemplo para usar el formulario de google) .

**Seccion Acerca del evento:**
- Descripción completa del evento.
**Seccion temas a tratar:**
- lista de temas principales.
- agregar temas en forma de botones

**Seccion con cuando y donde**
-input tipo fecha
-input tipo hora.
-input tipo texto para lugar.

**Seccion de anfritiones**
-- agregar lista de anfitriones (Se podra eliminar y agregar).
-- nombre del anfrition
-- titulo profesional o puesto.
-- agregar una foto del anfrition.

- **Seccion de colaboradores**
-- agregar lista de colaboradores (Se podra eliminar y agregar).
-- nombre del colaborador
-- titulo profesional o puesto.
-- agregar una foto del colaborador.
- **Seccion de organizadores**
-- agregar lista de organizadores (Se podra eliminar y agregar).
-- nombre del organizador
-- titulo profesional o puesto.
-- agregar una foto del organizador.

## Paginas dinamicas.
como observaste en la pagina web de referencia, tendra su propia pagina dinamica para cada evento. Usaras el estandar que ya tienes establecido para las paginas dinamicas.

- contara con las siguientes secciones:
- Seccion de portada.
- seccion banner.
- seccion acerca del evento.
- seccion temas a tratar.
- seccion cuando y donde.
- seccion de anfritiones
- seccion de colaboradores
- seccion de organizadores

### Estructura de carpetas
-resources\js\pages\LandingPage\Eventos


**coneccion con landing page**
Editaras el siguiente archivo para mostrar los eventos:
-resources\js\pages\LandingPage\Components\NewsSection.jsx
-solo mostrara los 3 eventos mas recientes.

