import React from "react";
import { Head } from '@inertiajs/react';
import HomeLayout from '@/Layouts/HomeLayout';
import { motion } from "framer-motion";
import { Button } from "@/Components/ui/button";

const fadeUp = {
    initial: { opacity: 0, y: 100 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 1 }
};
const fadeRight = {
    initial: { opacity: 0, x: -100 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true },
    transition: { duration: 1 }
};
const fadeLeft = {
    initial: { opacity: 0, x: 100 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true },
    transition: { duration: 1 }
};
const RegistroSection = () => {
    return (
        <section className="bg-brand-ring py-20">
            <div className="container mx-auto text-center px-4">
                <motion.div {...fadeUp} >
                    <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white">¿Te gustaria formar parte?</h1>
                </motion.div>
                <motion.div {...fadeUp}>
                    <Button
                        variant="default"
                        size="lg"
                        className="bg-brand-text text-white rounded-md"
                        onClick={() => window.location.assign("/search")}
                    >
                        Buscar cursos
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}

const CursoSection = () => {
    return (
        <section className="bg-brand-earth pt-[100px] p-10 ">
            <div className=" p-5  py-15 ">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <motion.div {...fadeUp} >
                                <h2 className="text-6xl font-bold text-white mb-4">Cursos</h2>
                            </motion.div>
                            <motion.div {...fadeUp} >
                                <p className="text-white font-semibold mb-6 text-4xl">Capacitación Certificada</p>
                            </motion.div>
                            <motion.div {...fadeUp} >
                                <p className="text-white mb-4">
                                    Nuestro programa de formación está diseñado para empoderar a los prestadores de servicios turísticos locales. A través de módulos especializados en gestión, prácticas de sostenibilidad y atención al visitante, brindamos las herramientas necesarias para elevar la calidad de las experiencias dentro de la Reserva.
                                </p>
                            </motion.div>
                            <motion.div {...fadeUp} >
                                <p className="text-white mb-4">
                                    Todos los cursos cuentan con el respaldo académico y la certificación del Instituto Tecnológico de Tehuacán (ITT) y el Departamento de Estudios de Posgrado e Investigación (DEPI). Esta alianza garantiza un estándar de excelencia y avala la profesionalización técnica de las comunidades.
                                </p>
                            </motion.div>
                        </div>
                        <div className="order-1 md:order-2">
                            <motion.div {...fadeLeft} >
                                <img
                                    src="http://www.ittehuacan.edu.mx/posgrado/wp-content/uploads/2024/03/LOGOS.png"
                                    alt="Sobre nosotros"
                                    className="w-full h-auto rounded-lg shadow-lg object-cover bg-white"
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const TeacherSection = () => {
    return (
        <section className="bg-brand-soft py-12 ">
            <div className="container mx-auto px-4 text-center">

                <motion.div {...fadeUp} >
                    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">Conoce a Nuestros Profesores</h2>
                </motion.div>
                <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                    <motion.div {...fadeRight} >
                        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
                            <img
                                src="https://i.pravatar.cc/150?img=68"
                                alt="Foto del Profesor 1"
                                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-brand-soft"
                            />
                            <h3 className="text-2xl font-bold mb-2">Profesor 1</h3>
                            <p className="text-brand-ink">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna ali</p>
                        </div>
                    </motion.div>
                    <motion.div {...fadeLeft} >
                        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
                            <img
                                src="https://i.pravatar.cc/150?img=60"
                                alt="Foto del Profesor 2"
                                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-brand-soft"
                            />
                            <h3 className="text-2xl font-bold mb-2">Profesor 2</h3>
                            <p className="text-brand-ink">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna ali</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default function Cursos() {
    return (
        <HomeLayout>
            <Head title="Cursos" />
            <CursoSection />
            <TeacherSection />
            <RegistroSection />
        </HomeLayout>
    );
}
