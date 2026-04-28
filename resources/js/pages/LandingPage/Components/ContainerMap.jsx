import { useState } from "react";
import SlideLeft from "./SlideLeft";
import ReservaMap from "./ReservaMap";
import SlideRight from "./SlideRight";

const ContainerMap = () => {
    const [capasActivas, setCapasActivas] = useState({ general: false, reserva: true });

    return ( 
        <section className="pt-20 relative z-0">
            <div className="relative w-full h-[100vh] overflow-hidden z-0">
                <SlideLeft capasActivas={capasActivas} setCapasActivas={setCapasActivas} />
                <ReservaMap capasActivas={capasActivas} />
                <SlideRight />
            </div>
        </section>
     );
}
 
export default ContainerMap;