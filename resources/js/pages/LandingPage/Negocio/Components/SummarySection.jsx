import React, { useRef } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { 
    Bus, Wrench, Leaf, Trees, Waves, Mountain, BedDouble, Droplets, Utensils, Info,
    MapPin, Phone, Mail, Globe 
} from "lucide-react";

// Fix Leaflet marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const getGiroIcon = (giroName) => {
    const name = giroName.toLowerCase();
    if (name.includes("transporte")) return <Bus className="w-4 h-4 mr-2" />;
    if (name.includes("talleres")) return <Wrench className="w-4 h-4 mr-2" />;
    if (name.includes("medicina")) return <Leaf className="w-4 h-4 mr-2" />;
    if (name.includes("parques temáticos")) return <Trees className="w-4 h-4 mr-2" />;
    if (name.includes("acuáticas")) return <Waves className="w-4 h-4 mr-2" />;
    if (name.includes("aventura") || name.includes("naturaleza")) return <Mountain className="w-4 h-4 mr-2" />;
    if (name.includes("hospedaje")) return <BedDouble className="w-4 h-4 mr-2" />;
    if (name.includes("balneario")) return <Droplets className="w-4 h-4 mr-2" />;
    if (name.includes("gastronomía")) return <Utensils className="w-4 h-4 mr-2" />;
    return <Info className="w-4 h-4 mr-2" />;
};

const SummarySection = ({ trade }) => {
    if (!trade) return null;

    const mapLocation = trade.map_location ? trade.map_location.split(',').map(Number) : null;
    
    // Transform gallery images
    const galleryItems = (trade.gallery_images || []).map(imgUrl => ({
        original: imgUrl,
        thumbnail: imgUrl,
    }));

    // If no gallery images, use a placeholder or image_url
    if (galleryItems.length === 0 && trade.image_url) {
        galleryItems.push({
            original: trade.image_url,
            thumbnail: trade.image_url
        });
    }

    return (
        <div className="space-y-10">
            {/* Cabecera */}
            <div className="space-y-4 text-center md:text-left">
                <h1 className="text-4xl font-bold text-brand-text">{trade.comercial_name}</h1>
                {trade.descripcion_corta && (
                    <p className="text-lg text-brand-ink max-w-3xl">{trade.descripcion_corta}</p>
                )}
            </div>

            {/* Giros */}
            {trade.giros && trade.giros.length > 0 && (
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    {trade.giros.map((giro, idx) => (
                        <div key={idx} className="flex items-center px-4 py-2 border rounded-full bg-brand-pale text-brand-text font-medium text-sm shadow-sm">
                            {getGiroIcon(giro.name)}
                            {giro.name}
                        </div>
                    ))}
                </div>
            )}

            {/* Contacto */}
            <div className="flex flex-wrap gap-6 justify-center md:justify-start bg-white p-4 rounded-xl border shadow-sm">
                {trade.address && (
                    <div className="flex items-center text-sm text-brand-ink">
                        <MapPin className="w-5 h-5 mr-2 text-brand-text" />
                        {trade.address}
                    </div>
                )}
                {trade.phone && (
                    <div className="flex items-center text-sm text-brand-ink">
                        <Phone className="w-5 h-5 mr-2 text-brand-text" />
                        {trade.phone}
                    </div>
                )}
                {trade.email && (
                    <div className="flex items-center text-sm text-brand-ink">
                        <Mail className="w-5 h-5 mr-2 text-brand-text" />
                        {trade.email}
                    </div>
                )}
                {trade.website && (
                    <div className="flex items-center text-sm text-brand-ink">
                        <Globe className="w-5 h-5 mr-2 text-brand-text" />
                        <a href={trade.website} target="_blank" rel="noreferrer" className="hover:underline">{trade.website}</a>
                    </div>
                )}
            </div>

            {/* Contenido Visual (Galería y Mapa) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Galería */}
                {galleryItems.length > 0 && (
                    <div className="rounded-xl overflow-hidden shadow-sm border bg-white p-2">
                        <ImageGallery 
                            items={galleryItems} 
                            showPlayButton={false} 
                            showFullscreenButton={true}
                            showThumbnails={galleryItems.length > 1}
                        />
                    </div>
                )}

                {/* Mapa */}
                {mapLocation && mapLocation.length === 2 && !isNaN(mapLocation[0]) && (
                    <div className="rounded-xl overflow-hidden shadow-sm border h-[400px] lg:h-auto min-h-[400px] z-0 relative">
                        <MapContainer
                            center={mapLocation}
                            zoom={15}
                            scrollWheelZoom={false}
                            style={{ height: "100%", width: "100%", minHeight: "400px", zIndex: 0 }}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={mapLocation} />
                        </MapContainer>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SummarySection;