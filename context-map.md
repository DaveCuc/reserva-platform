# Contexto de Desarrollo: Implementación de Mapa Geocodificador
# Stack: Laravel 11, Inertia.js (v2), React, Vite, Leaflet

## Objetivo
Implementar un componente de mapa interactivo (`MapSelector.jsx`) que permita a los usuarios buscar una dirección mediante texto o haciendo clic en el mapa, integrándose directamente con el estado de un formulario de Inertia.js.

## Reglas de Negocio Estrictas
El comportamiento del mapa debe cumplir el siguiente flujo exacto:
1. Buscar dirección con un input de texto utilizando la API de geocoding de OpenStreetMap (Nominatim).
2. Mostrar una lista desplegable de opciones que coincidan (disparar búsqueda solo después de 3 caracteres para no saturar la API).
3. **Flujo A (Dirección encontrada):** Seleccionar la dirección de la lista, actualizar el input con el texto formateado y colocar el marcador en el mapa.
4. **Flujo B (Dirección no encontrada):** Permitir al usuario hacer clic manualmente en el mapa para colocar un marcador.
5. **Reverse Geocoding:** Al colocar el marcador manualmente, consultar la API para generar la dirección a partir de las coordenadas y mostrarla automáticamente en el campo de texto.

## Convenciones del Proyecto
- Los imports del frontend usan el alias `@/`.
- El enrutamiento en React se maneja a través de Ziggy usando `route()`.
- Los componentes de página se ubican en `resources/js/pages/**/*.jsx`.
- El manejo de formularios debe usar el hook `useForm` de `@inertiajs/react`.

---

## Archivo 1: Componente Reutilizable
**Ruta destino:** `resources/js/Components/MapSelector.jsx`
**Descripción:** Componente aislado que maneja Leaflet, la API de OSM y emite los resultados al padre mediante el prop `onLocationSelect`.

## Archivo 2: Integración en Página Inertia
**Ruta de ejemplo:** `resources/js/pages/trade/Edit/Create.jsx`
**Descripción:** Demuestra cómo inyectar el componente en un formulario estándar gestionado por el hook useForm de Inertia.

## Actualizar la Base de Datos (Migraciones)
asegurarte de que la tabla correspondiente sea compatible para almacenar estos datos.