## Mejorar componentes del mapa

Usaras el archivo SlideLeft.jsx para obtener los botones de capas.

Cada boton tiene una funcion especifica para mostrar, no modificaras sus funciones.

Agregaras las funciones para hacer zoom a los puntos de interes que se encuentren en el area visible del mapa.


# Botones:
- Reserva de la Biosfera: Realziara un zoom de 9 (default) y regresara a las coordenadas ya establecidas por defecto al darle clic.
- General: Zoom 9, Coordenadas Default.
- Rutas Turisticas: Onix, dinosaurios, mezcal: Zoom: 13, en sus coordenadas marcadas.
- Localidades: Zoom 9, Coordenadas Default.

# Elementos del mapa

-problemas detectados en el mapa:
1. El boton de hacer y dimsiuir zoom se oculta por detras del slide.
Solucion propuesta: los slides y el container map estaran dentro de un div que cuando se active o desactive el div afecte moviendo hacia la izqueirda el mapa, practicamente un elemento flex y quitar el estilo flotante del los slides. 


