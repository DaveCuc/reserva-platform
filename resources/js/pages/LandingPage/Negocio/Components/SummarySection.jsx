import { useRef } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];

function MyGallery() {
  const galleryRef = useRef(null);

  return (
    <ImageGallery
      ref={galleryRef}
      items={images}
      onSlide={(index) => console.log("Slid to", index)}
    />
  );
}


const SummarySection = () => {
  return (
    <div>
      <div>
        {/*Extraer el nombre y descripcion de la ficha de negocio */}
        <h1>Nombre del Negocio</h1>
        <p>Descripcion corta</p>
      </div>
      <div>
        {/*Extraer el giro de la ficha de negocio */}
        <h2>Giros</h2>
        <button> Giro</button>
      </div>
      <div>
        {/*Extraer los datos de contacto de la ficha de negocio */}
        <h2>Datos de contacto</h2>
        <p>Direccion</p>
        <p>Numero de telefono</p>
        <p>Pagina web</p>
        <p>Email</p>
      </div>
      <div>
        {/*Extraer las fotografias de la ficha de negocio */}
        <h2>Fotografias</h2>
        Fotografias
        <MyGallery />

      </div>
      {/* 
            <div>
                <h2>Calificacion</h2>
                calificacion
            </div>
            */}
      <div>
        <h2>Mapa</h2>
        mapa
        <MapContainer
          center={[18.4627, -97.3941] }
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "400px", width: "100%" }} // 1. Tienes que darle un tamaño al mapa
        >
          {/* 2. Necesitas el TileLayer para que se pinten las calles */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>            </div>
    </div>
  );
}
export default SummarySection;