import React, { useState, useEffect } from 'react';
import { GeoJSON } from 'react-leaflet';

// 1. Definimos las regiones, sus colores y sus municipios
const REGIONES = {
    "REGIÓN SEPTENTRIONAL": {
        color: "#3498db", // Azul
        municipios: [
            "Tecamachalco", "Palmar de Bravo", "Yehualtepec", "Tlacotepec de Benito Juárez",
            "Tepanco de López", "Santiago Miahuatlán", "Cañada Morelos", "Chapulco"
        ]
    },
    "REGIÓN DEL VALLE ZAPOTITLÁN-TEHUACÁN": {
        color: "#e67e22", // Naranja
        municipios: [
            "Tehuacán", "Zapotitlán", "San Gabriel Chilac", "San José Miahuatlán",
            "Juan N. Méndez", "Atexcal", "Caltepec"
        ]
    },
    "REGIÓN SIERRA NEGRA": {
        color: "#2ecc71", // Verde esmeralda
        municipios: [
            "Ajalpan", "Coyomeapan", "Coxcatlán", "Zinacatepec"
        ]
    },
    "REGIÓN CHAZUMBA": {
        color: "#9b59b6", // Morado
        municipios: [
            "San Pedro Tequixtepec", "Santiago Chazumba", "Totoltepec de Guerrero"
        ]
    },
    "DISTRITO 3": {
        color: "#f1c40f", // Amarillo
        municipios: [
            "Concepción Buena Vista", "San Juan Bautista Coixtlahuaca",
            "San Miguel Tequixtepec", "Tepelmeme Villa De Morelos"
        ]
    },
    "DISTRITO 4": {
        color: "#e74c3c", // Rojo
        municipios: [
            "Teotitlán de Flores Magón", "San Juan de los Cues", "San Martín Toxpalan",
            "San Antonio Nanahuatipam", "Santa María Tecomavaca", "Santa María Ixcatlan",
            "Mazatlan Villa de Flores"
        ]
    },
    "DISTRITO 5": {
        color: "#1abc9c", // Turquesa
        municipios: [
            "San Juan Tepeuxila", "San Pedro Jaltepetongo", "Santiago Nacaltepec",
            "Santa Maria Papalo", "Santos Reyes Papalo", "Concepción Papalo",
            "San Juan Bautista Cuicatlán", "Santa María Texcatitlan", "Valerio Trujano",
            "San Pedro Jocotipac"
        ]
    },
    "DISTRITO 10": {
        color: "#34495e", // Azul oscuro/Gris
        municipios: [
            "San Pedro Cántaros Coxcaltepec", "Santiago Huauclilla", "Santiago Apoala",
            "Santa Maria Apazco", "Asunción Nochixtlan", "San Miguel Huautla"
        ]
    },
    "DISTRITO 11": {
        color: "#d35400", // Calabaza
        municipios: [
            "Santa Catarina Zapoquila", "San Juan Bautista Atatlahuaca"
        ]
    }
};

// 2. Función auxiliar para normalizar texto (quita acentos y mayúsculas para evitar errores de tipeo al comparar)
const normalizarTexto = (texto) => {
    if (!texto) return "";
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
};

// 3. Crear un mapa de búsqueda rápida { "tehuacan": { region: "...", color: "..." } }
const mapaMunicipios = {};
Object.entries(REGIONES).forEach(([nombreRegion, datos]) => {
    datos.municipios.forEach(municipio => {
        mapaMunicipios[normalizarTexto(municipio)] = {
            region: nombreRegion,
            color: datos.color,
            nombreOriginal: municipio
        };
    });
});

const GeneralMap = ({ hiddenMunicipios = [] }) => {
    const [mapas, setMapas] = useState({ general: null });

    // Cargar los archivos GeoJSON al montar el componente
    useEffect(() => {
        Promise.all([
            fetch('/Mapas/general.geojson').then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
        ])
            .then(([dataGeneral]) => {
                setMapas({ general: dataGeneral });
            })
            .catch(error => console.error("Error cargando mapas:", error));
    }, []);

    // Función para obtener la información de un municipio si está en nuestra lista
    const getMunicipioInfo = (feature) => {
        // INEGI normalmente usa NOMGEO, pero cubrimos 'name' por si acaso
        const nombreFeature = feature.properties?.NOMGEO || feature.properties?.name;
        const nombreNormalizado = normalizarTexto(nombreFeature);
        return mapaMunicipios[nombreNormalizado];
    };

    // Filtro: Solo dibuja el polígono si el municipio está en nuestra lista de REGIONES
    const filtrarMunicipios = (feature) => {
        const info = getMunicipioInfo(feature);
        if (!info) return false;

        // Si el municipio está oculto, no lo renderizamos
        const nombreNormalizado = normalizarTexto(info.nombreOriginal);
        if (hiddenMunicipios.includes(nombreNormalizado)) {
            return false;
        }

        return true;
    };

    // Estilo: Asigna el color correspondiente a la región
    const estiloRegiones = (feature) => {
        const info = getMunicipioInfo(feature);
        return {
            color: 'white',       // Borde blanco para separar municipios
            weight: 1,
            fillColor: info.color,
            fillOpacity: 0.7     // Ligeramente transparente
        };
    };

    // Popups: Muestra el nombre y la región al hacer clic
    const onEachFeature = (feature, layer) => {
        const info = getMunicipioInfo(feature);
        if (info) {
            layer.bindPopup(
                `<div style="text-align: center;">
                    <b>${info.nombreOriginal}</b><br/>
                    <span style="color: ${info.color}; font-weight: bold; font-size: 0.9em;">
                        ${info.region}
                    </span>
                </div>`
            );
        }
    };

    // Retornamos un Fragmento (<>) con ambos GeoJSON. 
    // NOTA: Este componente DEBE ir dentro de un <MapContainer> en tu ReservaMap
    return (
        <>
            {mapas.general && (
                <GeoJSON
                    data={mapas.general}
                    filter={filtrarMunicipios}
                    style={estiloRegiones}
                    onEachFeature={onEachFeature}
                />
            )}
        </>
    );
}

export default GeneralMap;