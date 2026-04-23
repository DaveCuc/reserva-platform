import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const customIcon = new L.Icon({
    iconUrl: '[https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png](https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png)',
    iconRetinaUrl: '[https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png](https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png)',
    shadowUrl: '[https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png](https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png)',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

export default function MapSelector({ onLocationSelect, defaultAddress = '' }) {
    const [address, setAddress] = useState(defaultAddress);
    const [suggestions, setSuggestions] = useState([]);
    const [position, setPosition] = useState(null);

    const handleSearchChange = async (e) => {
        const value = e.target.value;
        setAddress(value);

        if (value.length > 3) {
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&addressdetails=1`
                );
                const data = await response.json();
                setSuggestions(data);
            } catch (error) {
                console.error("Error al buscar la dirección:", error);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSelectSuggestion = (suggestion) => {
        const lat = parseFloat(suggestion.lat);
        const lng = parseFloat(suggestion.lon);
        const displayName = suggestion.display_name;

        setPosition({ lat, lng });
        setAddress(displayName);
        setSuggestions([]);
        
        if (onLocationSelect) onLocationSelect({ address: displayName, lat, lng });
    };

    const LocationMarker = () => {
        useMapEvents({
            async click(e) {
                const { lat, lng } = e.latlng;
                setPosition({ lat, lng });
                setSuggestions([]);

                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
                    );
                    const data = await response.json();
                    if (data && data.display_name) {
                        setAddress(data.display_name);
                        if (onLocationSelect) onLocationSelect({ address: data.display_name, lat, lng });
                    }
                } catch (error) {
                    console.error("Error en geocodificación inversa:", error);
                }
            },
        });

        return position === null ? null : (
            <Marker position={position} icon={customIcon}></Marker>
        );
    };

    return (
        <div className="w-full max-w-2xl mx-auto relative">
            <div className="relative mb-4">
                <input
                    type="text"
                    value={address}
                    onChange={handleSearchChange}
                    placeholder="Busca una dirección o coloca el marcador en el mapa..."
                    className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                />
                
                {suggestions.length > 0 && (
                    <ul className="absolute z-[1000] top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto mt-1">
                        {suggestions.map((suggestion) => (
                            <li
                                key={suggestion.place_id}
                                onClick={() => handleSelectSuggestion(suggestion)}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 border-b border-gray-100 last:border-0"
                            >
                                {suggestion.display_name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="h-[400px] w-full rounded-md overflow-hidden border border-gray-300 z-10 relative">
                <MapContainer 
                    center={[18.4628, -97.3928]} 
                    zoom={13} 
                    className="h-full w-full"
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="[https://www.openstreetmap.org/copyright](https://www.openstreetmap.org/copyright)">OpenStreetMap</a>'
                    />
                    <LocationMarker />
                </MapContainer>
            </div>
        </div>
    );
}