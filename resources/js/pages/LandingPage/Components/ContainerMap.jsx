import { useState, useRef } from "react";
import SlideLeft from "./SlideLeft";
import ReservaMap from "./ReservaMap";
import SlideRight from "./SlideRight";

const ContainerMap = () => {
    const [capasActivas, setCapasActivas] = useState({ general: false, reserva: true, ruta1: false, ruta2: false, ruta3: false, puntos: false });
    const mapRef = useRef(null);

    return (
        <section className="relative z-0">
            <div className="flex w-full h-[100vh] overflow-hidden z-0">
                <SlideLeft capasActivas={capasActivas} setCapasActivas={setCapasActivas} mapRef={mapRef} />
                <div className="flex-1 relative h-full z-0">
                    <ReservaMap capasActivas={capasActivas} mapRef={mapRef} />
                </div>
                <SlideRight mapRef={mapRef} />
            </div>
        </section>
    );
}

export default ContainerMap;