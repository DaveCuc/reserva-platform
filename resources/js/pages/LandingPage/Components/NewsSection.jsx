import React from 'react';
import { Link } from '@inertiajs/react';
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";

export default function NewsSection() {
    const newsData = [
        {
            id: 1,
            category: "Turismo Sostenible",
            title: "TALLER: TURISMO COMUNITARIO SOSTENIBLE",
            excerpt: "El turismo responsable es la base para el progreso local y la conservación de nuestro patrimonio.",
            imageUrl: "/storage/landing-page/NEW1.jpg",
            slug: "#",
        },
        {
            id: 2,
            category: "Turismo Comunitario",
            title: "Distintivo para Prestadores de Servicios de Turismo Comunitario",
            excerpt: "Enaltece tu identidad, protege tu patrimonio y lidera el cambio hacia un turismo sostenible en tu comunidad",
            imageUrl: "/storage/landing-page/NEW2.jpg",
            slug: "#",
        },
        {
            id: 3,
            category: "Turismo Comunitario",
            title: "1ra Feria de Turismo Comunitario 2026",
            excerpt: "Descubre la riqueza cultural y natural de nuestras comunidades en la 1ra Feria de Turismo Comunitario 2026",
            imageUrl: "/storage/landing-page/NEW3.jpg",
            slug: "#",
        },
    ];

    return ( 
        <section className="p-4 md:p-6">
            <div className="bg-[#739419] p-3 md:p-4 rounded-3xl py-8 md:py-10 shadow-xl">
                <div className="container mx-auto px-2 md:px-4">
                    <div className="text-center mb-12 ">
                        <h2 className="text-4xl font-bold text-white">Últimas Noticias</h2>
                        <p className="text-white mt-2">Mantente al día con las últimas novedades de la reserva.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {newsData.map((news) => (
                            <Card key={news.id} className="flex flex-col overflow-hidden rounded-3xl shadow-md hover:shadow-xl transition-shadow duration-300">
                                <CardHeader className="p-4 pb-0">
                                    <div className="relative w-full h-64 overflow-hidden rounded-3xl bg-white/10 flex items-center justify-center">
                                        <img
                                            src={news.imageUrl}
                                            alt={news.title}
                                            className="object-contain w-full h-full p-4"
                                        />
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6 flex-grow">
                                    <Badge variant="outline" className="mb-2">{news.category}</Badge>
                                    <CardTitle className="text-xl font-semibold mb-2 text-black leading-tight">{news.title}</CardTitle>
                                    <p className="text-black text-sm">{news.excerpt}</p>
                                </CardContent>
                                <CardFooter className="p-6 pt-0">
                                    <Button asChild variant="landing_page_secondary" className=" text-white">
                                        <Link href={news.slug}>Leer más</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
     );
}
