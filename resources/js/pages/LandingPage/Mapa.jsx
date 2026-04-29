import React from 'react';
import { Head } from '@inertiajs/react';
import HomeLayout from '@/Layouts/HomeLayout';
import { motion } from "framer-motion";
import ReservaMap from './Components/ReservaMap';
import SlideLeft from './Components/SlideLeft';
import SlideRight from './Components/SlideRight';
import ContainerMap from './Components/ContainerMap';


const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 1 }
};

const MapSection = () => {
    return (
        <section className="pt-[100px]">
            <div className="p-6 py-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold">Rutas Turisticas</h1>
            </div>
            <div className="mt-8 flex justify-center px-4">
                <img
                    src="/mapa.svg"
                    alt="Logo"
                    className="w-full h-auto md:w-3/4 lg:w-1/2"
                />
            </div>
        </section>
    );
}

const InfoSection = () => {
    return (
        <section className="p-10  mx-auto bg-brand-soft">
            <div className=" p-5  py-15 text-white">
                <div className="container mx-auto px-4">
                    <motion.div {...fadeUp} >
                        <h2 className="text-6xl font-bold mb-4">Reserva de la Biosfera</h2>


                        <p className="mb-4">
                            La Reserva de la Biosfera Tehuacán-Cuicatlán, reconocida como Patrimonio Mixto de la Humanidad por la UNESCO, abarca un vasto territorio entre los estados de Puebla y Oaxaca. Este mapa interactivo te permite visualizar la magnitud de su riqueza natural, desde los densos bosques de cactáceas hasta las zonas de importancia histórica y arqueológica.
                        </p>


                        <p className="mb-4"> Navega a través de las diferentes regiones para planificar tu visita. Selecciona las rutas para descubrir los ecosistemas únicos, identificar los centros ecoturísticos y conocer la ubicación exacta de las comunidades que lideran los esfuerzos de conservación y turismo sostenible.</p>

                        <p>Ruta de la sal: Ubicación y recorridos en la zona de Zapotitlán Salinas.</p>
                        <p>Ruta del café: Puntos de interés y fincas en la región de la Sierra.</p>
                        <p>Ruta de las cactáceas: Senderos y áreas de conservación en el Valle de Tehuacán.</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default function Mapa() {
    return (
        <HomeLayout>
            <Head title="Mapa Interactivo" />
            {/* <MapSection /> */}
            <ContainerMap />

            <InfoSection />

        </HomeLayout>
    );
}
