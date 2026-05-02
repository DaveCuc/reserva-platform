import React from 'react';
import { Link } from '@inertiajs/react';
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardTitle } from "@/Components/ui/card";
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NewsSection({ recentEvents = [] }) {
    const fadeUp = {
        initial: { opacity: 0, y: 100 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 1 }
    };

    return (
        <section className="bg-brand p-4 md:p-6">
            <div className=" p-3 md:p-4 rounded-3xl py-8 md:py-10 ">
                <div className="container mx-auto px-2 md:px-4">
                    <motion.div {...fadeUp}>
                        <div className="text-center mb-12 ">
                            <h2 className="text-6xl font-bold text-white">Eventos Recientes</h2>
                            <p className="text-brand-light text-2xl mt-2 text-white">Mantente al día con las últimas novedades.</p>
                        </div>
                    </motion.div>
                    
                    {recentEvents.length === 0 ? (
                        <div className="text-center text-white/80 py-10">
                            No hay eventos recientes publicados.
                        </div>
                    ) : (
                        <motion.div {...fadeUp}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                {recentEvents.map((event) => (
                                    <Card key={event.id} className="group relative min-h-[500px] overflow-hidden rounded-[28px] border-0 bg-black shadow-[0_12px_35px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.24)]">
                                        <img
                                            src={event.image_url || '/storage/landing-page/placeholder.jpg'}
                                            alt={event.title}
                                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/75 to-black/8" />

                                        <div className="relative z-10 flex h-full flex-col justify-end p-5 md:p-6">
                                            <Badge variant="outline" className="mb-3 w-fit rounded-full border-white/35 bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
                                                {event.event_date ? new Date(event.event_date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Próximamente'}
                                            </Badge>

                                            <CardTitle className="mb-3 text-2xl font-bold leading-tight text-white line-clamp-3">
                                                {event.title}
                                            </CardTitle>

                                            <p className="mb-5 text-sm leading-6 text-white/90 line-clamp-3">
                                                {event.short_description || "Descubre más detalles sobre este evento."}
                                            </p>

                                            <Button asChild variant="landing_page_secondary" className="w-fit rounded-full px-5 py-2 text-sm font-semibold">
                                                <Link href={`/eventos/${event.id}`} className="inline-flex items-center gap-2">
                                                    Ver Detalles
                                                    <ArrowUpRight className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
}
