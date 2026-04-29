<!--
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



### Actualziaciones SlideRight.jsx

## SlideRight.jsx
Este slide proporciona informacion relevante de los puntos disponibles en el mapa y en el SlideLeft.jsx.

# Funciones:
1. Se mantendra oculto hasta que se precione un boton en el SlideLeft que ya aparece por defecto o hasta que el usuario decida abrirlo.

2. Cuando se precione el boton debera mostrar informacion relevante de los puntos seleccionados extraidos de archivos .json que esten ubicados en la carpeta "public/Mapas/Informacion".

3. Los elementos mostrados en la informacion contendran un componente especifico llamado checkbox marcando todo el contenido disponible y visible para que el usario manualmente los seleccione y desaparezcan del mapa.

4. Estara caracterizado por niveles para evitar confunciones, estos niveles tienen la posibilidad de ocultarse en forma de retraccion para dejar espacio y se muestre mas contendio.

5. Puede extraer informacion de archivos json y base de datos (aun no tengo informacion relevante para cargar de la base de datos pero mantenlo disponible y preparado para futuras actualizaciones).


## Boton General de SlideLeft:
Para el boton General, y para extraer el contendio para el SlideRight se encuentra disponible en el archivo "public/Mapas/Informacion/reserva.json".

# Funcionamiento esperado con el SlideRight.jsx:

## Estructura del SlideRight.jsx:

El slide derecho estara dividido de la siguiente forma:

-> Regiones (Se puede minimizar para que quepa mas contenido).
  -> Lista de Regiones (Se puede minimizar para que quepa mas contenido).
    Accion: Clic a una region.
      -> Informacion relevante de la region seleccionada.
-> Municipios (Se puede minimizar para que quepa mas contenido).
      -> Lista de Municipios (Se puede minimizar para que quepa mas contenido).
        Accion: Clic a un municipio.
          -> Informacion relevante del municipio.

          

## Funcionamiento del SlideRight.jsx:

1. Al precionar el boton general, saldra inmediatamente el slide derecho con toda la informacion disponible del json.

2. En ese slide derecho aparecera una lista de las regiones de la reserva, cada una con un checkbox (el checkbox se encontrara activo por defecto y funcionara como un filtro para mostrar o no mostrar las regiones en el mapa filtrandolo por nombre de region). 

3. cada elemento de la lista de regiones tendra la funcion de un boton para hacer zoom a la region en el mapa y mostrar una lista de municipios pertenecientes a esa region. Esta lista a su vez tendra su propio checkbox para mostrar o no mostrar los municipios en el mapa filtrandolo por nombre de municipio.

4. Si se le hace clic a un elemento de la lista de municipios, de igual forma te hara zoom al municipio en el mapa y te mostrara la informacion relevante del municipio.


Por ahora solo haras el boton de general, mas adelante te proporcionare mas informacion para que puedas hacer los demas botones.


### SlideRight.jsx Updates

- **Slide Right.jsx**
This slide provides relevant information about the points available on the map and in SlideLeft.jsx.

# Functions:
1. It will remain hidden until a button in SlideLeft is pressed or until the user decides to open it.
2. When the button is pressed, it should display relevant information about the selected points extracted from .json files located in the "public/Mapas/Informacion" folder.
3. The elements displayed in the information will contain a specific component called checkbox marking all the available and visible content so that the user can manually select them and they disappear from the map.
4. It will be characterized by levels to avoid confusion, these levels have the possibility of being hidden in a retractable way to leave space and more content is displayed.
5. It can extract information from .json files and databases (I don't have relevant information to load from the database yet, but keep it available and prepared for future updates).

### General Button Updates
**General Button**
For the general button, and to extract the content for the SlideRight, the file "public/Mapas/Informacion/reserva.json" is available.

### Functioning expected with SlideRight.jsx:

**Structure of SlideRight.jsx:**

The right slide will be divided as follows:

-> Regions (Can be minimized to fit more content).
  -> List of Regions (Can be minimized to fit more content).
    Action: Click on a region.
      -> Relevant information of the selected region.
-> Municipalities (Can be minimized to fit more content).
      -> List of Municipalities (Can be minimized to fit more content).
        Action: Click on a municipality.
          -> Relevant information of the municipality.

          
#### Functioning of SlideRight.jsx:

1. When the general button is pressed, the right slide will immediately appear with all the information available from the json.

2. In that right slide, a list of the regions of the reserve will appear, each with a checkbox (the checkbox will be active by default and will function as a filter to show or not show the regions on the map filtering by region name). 

3. each element of the list of regions will have the function of a button to zoom to the region on the map and display a list of municipalities belonging to that region. This list will also have its own checkbox to show or not show the municipalities on the map filtering by municipality name.

4. If you click on an element of the list of municipalities, it will also zoom to the municipality on the map and display the relevant information of the municipality.

**For now, you will only make the general button, later I will provide you with more information so you can make the other buttons.**



## Mejoras y actualizaciones

- Corrige para los botones funcionen de igual forma como un checkbox.
- Correccion de para aquellos botones que unicamente extraigan informacion json, los que no tienen que no muestren nada en el slide derecho.
- Cuando este seleccionado el boton de la reserva de la biosfera muestre la informacion del archivo reserva.json.
- Cuando este seleccionado el boton de general, muestre la informacion del archivo general.json.


Corrige la vista de regiones y municipios.
----
#### Regiones (Aqui ya aparecera la lista de regiones, con checkbox activo por defecto para cada region)
- Lista de regiones
- Informacion relevante de cada region.
-----
#### Municipios: (el titulo estara ahi con una descripcion selecciona una region y en ese momento mostrara los municipios de esa region)
- Lista de municipios
- Informacion relevante de cada municipio.

Utilzia el elemento de GeneralMap.jsx como base para poder modificar individualmente cada region y munipicio en el mapa y este se pueda ocultar y mostrar.



## Improvements and Updates

- Fixed an issue where buttons now function as checkboxes.

- Fixed an issue where buttons that only extract JSON data no longer display anything in the right-hand slider.

- When the Biosphere Reserve button is selected, display the information from the reserve.json file.

- When the General button is selected, display the information from the general.json file.

- Fix the view of regions and municipalities.

#### Regions (The list of regions will appear here, with a checkbox selected by default for each region)
- List of regions
- Relevant information for each region.

#### Municipalities: (The title will be here with a description; select a region and the municipalities within that region will be displayed)
- List of municipalities
- Relevant information for each municipality.

Use the GeneralMap.jsx element as a base to allow you to individually modify each region and municipality on the map, and to hide and show them.




## Improvements and Updates

- Mejora para que los botones de la izquierda funcionen como un checkbox activo y funcional desde que se cargue la pagina. (Por ejemplo si ya esta seleccionado el boton "Reserva de la Biosfera" por defecto, por logica ya deberia aparecer el slide derecho con la informacion relevante de reserva.json.)

- Mejora el slide derecho, agregando una funcion de retraerse por Listas (Botones del slide izquierdo), si seleccionas varios elementos del slide izquierdo deben mostrarse en el slide derecho. El funcionamiento actual es que cuando seleccionas un boton del lateral izquierdo se quita el ultimo elemento seleccionado del lateral derecho remplazandolo con la informacion del boton seleccionado.

- **Corrige este funcionamiento con las siguientes instrucciones:**

## Instructions

La mejora es la siguiente: el slide derecho mostrara los contenidos por titulo del boton del slide izquierdo.

- Titulo boton (posibilidad de retraerse y expandirse, si no es seleccionado no se muestra nada en el slide derecho).
    -> Contenido del boton seleccionado (Contenido actual, no modificar contendio).

-Si los botones de la izqueirda estan en estado activo (seleccionados), se deben mostrar en forma de lista de botones en el slide derecho.
-Cuando se seleccione un boton del slide izquierdo, el resto de botones activos se van a retraer para mostrar el utlimo seleccionado (esto solo aplica si la accion viene del slide izquierdo).

- El usuario puede moverse en el slide derecho puede retraer todos los elementos o expandir todos los elementos de la lista para mostrar o ocultar el contenido.



## Improvements and Updates

- Improved the left-hand buttons so they function as active and functional checkboxes from the moment the page loads. (For example, if the "Reserva de la Biosfera" button is already selected by default, the right-hand slide should logically appear with the relevant information from reserva.json.)

- Improved the right-hand slide by adding a function to collapse by Lists (buttons from the left-hand slide). If you select multiple items from the left-hand slide, they should be displayed on the right-hand slide. Currently, when you select a button from the left-hand side, the last selected item on the right-hand side is removed and replaced with the information from the selected button.

- **Correct this behavior with the following instructions:**

## Instructions

The improvement is as follows: the right-hand slide will display the content based on the title of the button from the left-hand slide.

- Button title (can be collapsed and expanded; if not selected, nothing is displayed on the right-hand slide).

-> Content of the selected button (Current content, do not modify content).

-If the buttons on the left are active (selected), they should be displayed as a list of buttons on the right slide.

-When a button on the left slide is selected, the other active buttons will retract to show the last one selected (this only applies if the action comes from the left slide).

-The user can move along the right slide and either retract or expand all the items in the list to show or hide the content.

-->
## Improvements and Updates

- Adjust the right slide so that it displays the button list in the same order as it appears on the left.

- Update the municipality coordinates with the following information.

{
  "REGION_SEPTENTRIONAL": [
    { "nombre": "Tecamachalco", "lat": 18.8833, "lng": -97.7333 },
    { "nombre": "Palmar de Bravo", "lat": 18.8333, "lng": -97.6167 },
    { "nombre": "Yehualtepec", "lat": 18.7833, "lng": -97.65 },
    { "nombre": "Tlacotepec de Benito Juárez", "lat": 18.65, "lng": -97.65 },
    { "nombre": "Tepanco de López", "lat": 18.5833, "lng": -97.5667 },
    { "nombre": "Santiago Miahuatlán", "lat": 18.55, "lng": -97.4333 },
    { "nombre": "Cañada Morelos", "lat": 18.7333, "lng": -97.4167 },
    { "nombre": "Chapulco", "lat": 18.6167, "lng": -97.4167 }
  ],
  "REGION_DEL_VALLE_ZAPOTITLAN_TEHUACAN": [
    { "nombre": "Tehuacán", "lat": 18.4667, "lng": -97.3927 },
    { "nombre": "Zapotitlán", "lat": 18.3333, "lng": -97.4667 },
    { "nombre": "San Gabriel Chilac", "lat": 18.3167, "lng": -97.35 },
    { "nombre": "San José Miahuatlán", "lat": 18.2833, "lng": -97.2833 },
    { "nombre": "Juan N. Méndez", "lat": 18.5333, "lng": -97.7667 },
    { "nombre": "Atexcal", "lat": 18.35, "lng": -97.6167 },
    { "nombre": "Caltepec", "lat": 18.1833, "lng": -97.4833 }
  ],
  "REGION_SIERRA_NEGRA": [
    { "nombre": "Ajalpan", "lat": 18.3833, "lng": -97.2167 },
    { "nombre": "Coyomeapan", "lat": 18.2667, "lng": -97.0167 },
    { "nombre": "Coxcatlán", "lat": 18.2667, "lng": -97.15 },
    { "nombre": "Zinacatepec", "lat": 18.3333, "lng": -97.2 }
  ],
  "REGION_CHAZUMBA": [
    { "nombre": "San Pedro Tequixtepec", "lat": 18.0667, "lng": -97.7167 },
    { "nombre": "Santiago Chazumba", "lat": 18.1833, "lng": -97.6833 },
    { "nombre": "Totoltepec de Guerrero", "lat": 18.4667, "lng": -97.8167 }
  ],
  "DISTRITO_3": [
    { "nombre": "Concepción Buena Vista", "lat": 17.9167, "lng": -97.5167 },
    { "nombre": "San Juan Bautista Coixtlahuaca", "lat": 17.7167, "lng": -97.3333 },
    { "nombre": "San Miguel Tequixtepec", "lat": 17.8, "lng": -97.35 },
    { "nombre": "Tepelmeme Villa De Morelos", "lat": 17.9167, "lng": -97.3833 }
  ],
  "DISTRITO_4": [
    { "nombre": "Teotitlán de Flores Magón", "lat": 18.1333, "lng": -97.0667 },
    { "nombre": "San Juan de los Cues", "lat": 18.05, "lng": -97.05 },
    { "nombre": "San Martín Toxpalan", "lat": 18.1, "lng": -97.05 },
    { "nombre": "San Antonio Nanahuatipam", "lat": 18.1333, "lng": -97.1167 },
    { "nombre": "Santa María Tecomavaca", "lat": 17.9667, "lng": -97.0167 },
    { "nombre": "Santa María Ixcatlan", "lat": 17.85, "lng": -97.1667 },
    { "nombre": "Mazatlan Villa de Flores", "lat": 18.0167, "lng": -96.9167 }
  ],
  "DISTRITO_5": [
    { "nombre": "San Juan Tepeuxila", "lat": 17.7333, "lng": -96.7833 },
    { "nombre": "San Pedro Jaltepetongo", "lat": 17.7167, "lng": -97.0167 },
    { "nombre": "Santiago Nacaltepec", "lat": 17.5, "lng": -96.9333 },
    { "nombre": "Santa Maria Papalo", "lat": 17.8333, "lng": -96.7833 },
    { "nombre": "Santos Reyes Papalo", "lat": 17.8333, "lng": -96.85 },
    { "nombre": "Concepción Papalo", "lat": 17.85, "lng": -96.8833 },
    { "nombre": "San Juan Bautista Cuicatlán", "lat": 17.8, "lng": -96.9667 },
    { "nombre": "Santa María Texcatitlan", "lat": 17.7333, "lng": -97.0333 },
    { "nombre": "Valerio Trujano", "lat": 17.7667, "lng": -97.0 },
    { "nombre": "San Pedro Jocotipac", "lat": 17.7667, "lng": -97.0833 }
  ],
  "DISTRITO_10": [
    { "nombre": "San Pedro Cántaros Coxcaltepec", "lat": 17.5167, "lng": -97.1333 },
    { "nombre": "Santiago Huauclilla", "lat": 17.4333, "lng": -97.05 },
    { "nombre": "Santiago Apoala", "lat": 17.65, "lng": -97.1333 },
    { "nombre": "Santa Maria Apazco", "lat": 17.5667, "lng": -97.1 },
    { "nombre": "Asunción Nochixtlan", "lat": 17.4667, "lng": -97.2167 },
    { "nombre": "San Miguel Huautla", "lat": 17.7333, "lng": -97.1333 }
  ],
  "DISTRITO_11": [
    { "nombre": "Santa Catarina Zapoquila", "lat": 18.0167, "lng": -97.5333 },
    { "nombre": "San Juan Bautista Atatlahuaca", "lat": 17.5167, "lng": -96.8167 }
  ]
}
