import React from 'react';
import { Link } from '@inertiajs/react';
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardTitle } from "@/Components/ui/card";
import { ArrowUpRight } from 'lucide-react';

export default function NewsSection() {
    const newsData = [
        {
            id: 1,
            category: "Turismo Sostenible",
            title: "Taller: Turismo comunitario sostenible",
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
        <section className="bg-brand p-4 md:p-6">
            <div className=" p-3 md:p-4 rounded-3xl py-8 md:py-10 ">
                <div className="container mx-auto px-2 md:px-4">
                    <div className="text-center mb-12 ">
                        <h2 className="text-6xl font-bold text-white">Eventos Recientes</h2>
                        <p className="text-brand-light text-2xl mt-2 text-white">Mantente al día con las últimas novedades de la reserva.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {newsData.map((news) => (
                            <Card key={news.id} className="group relative min-h-[500px] overflow-hidden rounded-[28px] border-0 bg-black shadow-[0_12px_35px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.24)]">
                                <img
                                    src={news.imageUrl}
                                    alt={news.title}
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/75 to-black/8" />

                                <div className="relative z-10 flex h-full flex-col justify-end p-5 md:p-6">
                                    <Badge variant="outline" className="mb-3 w-fit rounded-full border-white/35 bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
                                        {news.category}
                                    </Badge>

                                    <CardTitle className="mb-3 text-2xl font-bold leading-tight text-white line-clamp-3">
                                        {news.title}
                                    </CardTitle>

                                    <p className="mb-5 text-sm leading-6 text-white/90 line-clamp-3">
                                        {news.excerpt}
                                    </p>

                                    <Button asChild variant="landing_page_secondary" className="w-fit rounded-full px-5 py-2 text-sm font-semibold">
                                        <Link href={news.slug} className="inline-flex items-center gap-2">
                                            Read Post
                                            <ArrowUpRight className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
