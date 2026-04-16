import React from "react";
import { Head } from '@inertiajs/react';
import HomeLayout from '@/Layouts/HomeLayout';
import { motion } from "framer-motion";
import { Button } from "@/Components/ui/button";

const fadeUp = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 1 }
};

const RegistroSection = () => {
    return ( 
        <section className="py-20">
            <div className="container mx-auto text-center px-4">
                <h1 className="text-3xl md:text-4xl font-bold mb-6">¿Quieres aparecer?</h1>
                <motion.div {...fadeUp}>
                    <Button variant="default" size="lg" className="bg-slate-900 text-white rounded-md">Regístrate Aquí</Button>
                </motion.div>
            </div>
        </section>
     );
}

const CursoSection = () => {
    return ( 
        <section className="pt-[100px] p-10 max-w-7xl mx-auto">
            <div className="bg-[#739419] p-5 rounded-3xl py-15 shadow-xl">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <h2 className="text-3xl font-bold text-white mb-4">Cursos</h2>
                            <p className="text-white font-semibold mb-6">Certificados</p>
                            <p className="text-white mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                            <p className="text-white mb-4">
                                Lorem ipsum , dolor sit amet, consectetur adipiscing elit. Vestíbulo ornare, sapien nec cursus tristique, libero urna facilisis quam, quis viverra justo tellus id eros. Vivamus vehicula nec arcu ac efficitur. Aenean a malesuada justo, nec cursus sapien.
                            </p>
                        </div>
                        <div className="order-1 md:order-2">
                            <img 
                                src="http://www.ittehuacan.edu.mx/posgrado/wp-content/uploads/2024/03/LOGOS.png"
                                alt="Sobre nosotros"
                                className="w-full h-auto rounded-lg shadow-lg object-cover bg-white"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
     );
}

const TeacherSection = () => {
    return ( 
        <section className="py-12 ">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-12">Conoce a Nuestros Profesores</h2>
                <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
                        <img 
                            src="https://i.pravatar.cc/150?img=68" 
                            alt="Foto del Profesor 1" 
                            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-gray-200"
                        />
                        <h3 className="text-2xl font-bold mb-2">Profesor 1</h3>
                        <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna ali</p>
                    </div>
                    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
                        <img 
                            src="https://i.pravatar.cc/150?img=60" 
                            alt="Foto del Profesor 2" 
                            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-gray-200"
                        />
                        <h3 className="text-2xl font-bold mb-2">Profesor 2</h3>
                        <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna ali</p>
                    </div>
                </div>
            </div>
        </section>
     );
}

export default function Cursos() {
    return ( 
        <HomeLayout>
            <Head title="Cursos" />
            <motion.div {...fadeUp} >
                <CursoSection />
            </motion.div>
            <motion.div {...fadeUp} >
                <TeacherSection />
            </motion.div>
            <motion.div {...fadeUp} >
                <RegistroSection />
            </motion.div>
        </HomeLayout>
     );
}
