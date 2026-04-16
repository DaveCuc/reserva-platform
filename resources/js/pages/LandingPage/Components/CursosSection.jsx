import React from 'react';
import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";

export default function CursosSection() {
    return (
        <section className="py-20 mb-20 bg-slate-50">
            <div className="container mx-auto px-4 text-center max-w-7xl">
                <h1 className="text-4xl font-bold text-gray-800">Únete a nuestra comunidad</h1>
                <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
                    Forma parte de la red de prestadores de servicios de la Reserva de la Biosfera Tehuacán-Cuicatlán. Accede a herramientas de profesionalización y aumenta la visibilidad de tu proyecto ecoturístico para fortalecer el desarrollo sostenible de la región.
                </p>
            </div>

            <div className="container mx-auto px-4 mt-16 max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Explora Nuestros Cursos</h2>
                    <p className="text-gray-600 mb-8 flex-grow">
                        Capacítate con módulos enfocados en gestión turística, atención al visitante y prácticas de sostenibilidad. Contenido diseñado para mejorar la calidad de tus servicios y fortalecer tus competencias como anfitrión local.
                    </p>
                    <Link href="/cursos">
                        <Button variant="landing_page_secondary" className=" text-white rounded-md px-8 py-6 text-lg">
                            Conocer Cursos
                        </Button>
                    </Link>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Date a Conocer</h2>
                    <p className="text-gray-600 mb-8 flex-grow">
                        Registra tu iniciativa, alojamiento o recorrido en nuestro directorio digital. Conecta de manera directa con turistas que buscan alternativas de consumo local, experiencias auténticas y responsables dentro de la reserva.
                    </p>
                    <Link href="/directorio">
                        <Button variant="landing_page_secondary" className=" text-white rounded-md px-8 py-6 text-lg">
                            Ver Directorio
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
     );
}
