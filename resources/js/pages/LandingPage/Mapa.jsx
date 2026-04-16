import React from 'react';
import { Head } from '@inertiajs/react';
import HomeLayout from '@/Layouts/HomeLayout';
import { motion } from "framer-motion";

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
        <section className="p-10 max-w-7xl mx-auto">
            <div className="bg-[#739419] p-5 rounded-3xl py-15 text-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold mb-4">RESERVA DE LA BIOSFERA</h2>
                    <p className="mb-4">
                        Lorem ipsum , dolor sit amet, consectetur adipiscing elit. Vestíbulo ornare, sapien nec cursus tristique, libero urna facilisis quam, quis viverra justo tellus id eros. Vivamus vehicula nec arcu ac efficitur. Aenean a malesuada justo, nec cursus sapien. Proin nec porta erat. Suspendisse potenti. Curabitur pulvinar aliquet sapien, a interdum libero congue et. Quisque ut ligula arcu. Cras a consequat diam, a scelerisque lorem. Integer ac lectus non orci aliquet imperdiet.
                    </p>
                    <p className="mb-4">
                        Lorem ipsum , dolor sit amet, consectetur adipiscing elit. Vestíbulo ornare, sapien nec cursus tristique, libero urna facilisis quam, quis viverra justo tellus id eros.
                    </p>
                    <p>Ruta 1</p>
                    <p>Ruta 2</p>
                    <p>Ruta 3</p>
                </div>
            </div>
        </section>
    );
}

export default function Mapa() {
    return (
        <HomeLayout>
            <Head title="Mapa Interactivo" />
            <MapSection />
            <motion.div {...fadeUp}>
                <InfoSection />
            </motion.div>
        </HomeLayout>
    );
}
