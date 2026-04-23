# Contexto de la Vista Dinámica: Ficha de Negocio (Directorio Turístico)

## Objetivo General
Crear una página dinámica en React + Inertia.js que renderice los detalles de un negocio turístico guardado en la base de datos. La página recibe un objeto (ej. `negocio` o `trade`) como prop a través de Inertia desde el controlador de Laravel.

## Stack Tecnológico
- Frontend: React.js, Inertia.js, Tailwind CSS.
- Mapas: `react-leaflet` (MapContainer, TileLayer, Marker, Popup).
- Iconos: `lucide-react` (o la librería configurada en el proyecto).
- Galería: `react-image-gallery`.
-Utiliza elementos globales de layout: app.css

## Estructura de Datos Esperada (Inertia Props)
El componente principal `index.jsx` recibirá un objeto con la siguiente estructura (aproximada) desde la base de datos:
- `region_name`: string
- `municipality_name`: string
- `background_image`: string (URL)
- `comercial_name`: string
- `short_description`: string
- `long_description`: string
- `giros`: array de strings
- `contact`: objeto { address, phone, email, website }
- `personal_contact`: objeto { name, phone, email }
- `activities`: array de strings
- `gallery`: array de objetos { original, thumbnail }
- `location`: objeto { lat, lng }

## Requerimientos por Componente

### 1. Main View (`index.jsx`)
- Debe recibir la prop del negocio desde Inertia.
- Debe distribuir la información a los subcomponentes mediante props.
- Código base:
  ```jsx
  export default function Negocio({ trade }) {
      return (
          <div>
              <HeroSection trade={trade} />
              <SummarySection trade={trade} />
              <ActivitysSection activities={trade.activities} />
              <DescriptionSection trade={trade} />
          </div>
      );
  }


## 2. HeroSection.jsx
Fondo: Debe mostrar la background_image del negocio como una imagen de portada (hero image) abarcando el ancho completo.

Texto: Mostrar de forma destacada el nombre de la Región y el nombre del Municipio.

## 3. SummarySection.jsx
Cabecera: Mostrar NOMBRE COMERCIAL (h1) y DESCRIPCION CORTA (p).

Giros: Renderizar la lista de giros del negocio en forma de botones o badges.

Lista de giros posibles: Transporte Comunitario, Talleres comunitarios, Medicina tradicional y bienestar, Parques temáticos comunitarios, Actividades acuáticas comunitarias, Actividades de Aventura o Naturaleza, Hospedaje comunitario, Balneario y Parque Acuático, Gastronomía tradicional.

Regla: Asignar un icono de React correspondiente según el giro (ej. icono de autobús para transporte, icono de cama para hospedaje).

Contacto: Mostrar Dirección, Teléfono, Correo y Página Web.

Regla Estricta: Renderizado condicional. Si un dato no existe en la base de datos o es null, el label y el valor deben permanecer completamente ocultos.

Galería: Integrar el componente react-image-gallery con las imágenes provenientes de la BD.

Mapa: Integrar react-leaflet centrando el MapContainer en las coordenadas (lat, lng) del negocio y colocando un marcador en esa posición.

## 4. ActivitysSection.jsx (Actividades)
Renderizar un listado de las actividades que ofrece el negocio.

Visualización: En formato de botones o etiquetas (tags) interactivas o descriptivas.

## 5. DescriptionSection.jsx
Descripción: Título de la sección y mostrar la long_description.

Contacto Personal: Mostrar el Nombre del encargado, Número de teléfono y Correo electrónico. Al igual que en la sección de resumen, usar renderizado condicional por si falta algún dato.