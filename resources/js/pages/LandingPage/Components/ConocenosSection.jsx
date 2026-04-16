import React from 'react';

export default function ConocenosSection() {
    return ( 
        <section className="p-10 max-w-7xl mx-auto">
            <div className="bg-[#739419] p-5 rounded-3xl py-15 shadow-xl">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <img 
                                src="http://www.ittehuacan.edu.mx/posgrado/wp-content/uploads/2024/03/LOGOS.png"
                                alt="Sobre nosotros"
                                className="w-full max-w-[600px] h-auto rounded-lg shadow-lg object-cover bg-white"
                            />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-4">Conócenos</h2>
                            <p className="text-white mb-4">
                                <h1 className="text-2xl font-bold">Instituto Tecnológico de Tehuacán (ITT)</h1>
                                <br />
                                Institución pública de educación superior perteneciente al Tecnológico Nacional de México. Su misión es formar profesionistas de excelencia y agentes de cambio con trascendencia social, mediante educación de calidad, investigación e innovación tecnológica para impulsar el desarrollo sustentable de la región y del país.
                            </p>
                            <p className="text-white mb-4">
                                <h1 className="text-2xl font-bold">Departamento de Estudios de Posgrado e Investigación (DEPI)</h1>
                                <br />
                                Área estratégica del ITT enfocada en la formación de especialistas e investigadores a nivel posgrado. Impulsa el desarrollo de proyectos científicos, tecnológicos y de innovación orientados a brindar soluciones prácticas y sostenibles a las problemáticas de los sectores productivo, social y ambiental de la región.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
     );
}
