cat << 'EOF' > map-context.md
# Contexto del Proyecto
Estás trabajando en una aplicación web usando React y React Leaflet. 
El objetivo es renderizar mapas interactivos leyendo archivos GeoJSON.

## Archivos de Datos
- Ubicación: Los archivos están en la carpeta pública (`public/mapas/general.geojson`).
- Contenido: Polígonos de los municipios de ambos estados. La propiedad que contiene el nombre del municipio suele llamarse `name`.

```
"type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
--->    "name": "Caltepec",
        "d_codigo": "75896",
        "id": "405"
      },
        "geometry": {
        "type": "MultiPolygon",
        "coordinates": [[...]]
      }
    }
  ]
```

## Arquitectura de Componentes Esperada

1. **Componente Padre (Contenedor de la Vista)**
   - Debe contener un estado local (ej. `const [mapaActivo, setMapaActivo] = useState('general')`).
   - Debe envolver y pasar este estado/setter a `SlideLeft.jsx` y `ReservaMap.jsx` mediante props. ¡No uses Context API ni Redux, manténlo simple con prop drilling!

2. **SlideLeft.jsx (Barra lateral izquierda)**
   - Recibe `mapaActivo` y `setMapaActivo` como props.
   - Contiene un botón llamado "General".
   - Al hacer clic en "General", debe ejecutar `setMapaActivo('general')`.
   - El botón debe recibir una clase CSS activa (ej. `activo`) si `mapaActivo === 'general'`.
   - Debe funcionar como un sistema de capas, por lo que debe de tener un estado local para controlar las capas que se muestran.
   - por ahora solo se mostrara el mapa de reserva y el mapa general.


3. **ReservaMap.jsx (Contenedor del Mapa)**
   - Recibe `mapaActivo` como prop.
   - Contiene el `<MapContainer>` de React Leaflet y el `<TileLayer>`.
   - Renderizado condicional: Debe evaluar `{mapaActivo === 'general' && <GeneralMap />}`.
   - Debe mantener el mapa de ReservaMap en todo momento. 

4. **GeneralMap.jsx (Capa lógica del mapa general)**
   - NO usar `import` para traer los archivos geojson (causará error porque están en `/public`). Debe usar `fetch('/mapas/puebla.geojson')` y `fetch('/mapas/oaxaca.geojson')` dentro de un `useEffect` usando `Promise.all`.
   - Contiene un diccionario/objeto con las regiones, sus colores y los nombres de los municipios correspondientes.
   - Usa una función para normalizar texto (quitar acentos y pasar a minúsculas) antes de comparar los nombres del GeoJSON con el diccionario.
   - Utiliza la prop `filter` de `<GeoJSON />` para pintar SOLO los municipios que existan en el diccionario.
   - Utiliza la prop `style` de `<GeoJSON />` para pintar cada municipio con el color de su región correspondiente.
   - REGLA CRÍTICA DE LEAFLET: El return de `GeneralMap.jsx` debe ser un Fragmento de React (`<> ... </>`) envolviendo los componentes `<GeoJSON />`. No lo envuelvas en un `<div>` o romperás el contexto del mapa de Leaflet.

## Objetivo Inmediato
Conecta `SlideLeft.jsx`, el componente Padre y `ReservaMap.jsx` de tal forma que al presionar el botón "General" en el menú lateral izquierdo, aparezcan todas las regiones coloreadas en el mapa renderizando `GeneralMap.jsx`.



EOF
