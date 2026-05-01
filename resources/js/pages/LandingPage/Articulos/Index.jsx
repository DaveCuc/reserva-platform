import React from "react";
import { Head, Link } from "@inertiajs/react";
import HomeLayout from "@/Layouts/HomeLayout";
import { Preview } from "@/Components/Preview";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardTitle } from "@/Components/ui/card";
import { ArrowUpRight, BookOpen } from "lucide-react";

export default function ArticleView({ article, recentArticles }) {
    return (
        <HomeLayout>
            <Head title={article.title} />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row gap-10">
                
                {/* Contenedor 1: Artículo */}
                <div className="lg:w-2/3 space-y-8">
                    {/* Portada */}
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-sm">
                        {article.image_url ? (
                            <img 
                                src={article.image_url} 
                                alt={article.title} 
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <div className="w-full h-full bg-brand-pale flex items-center justify-center">
                                <BookOpen className="h-16 w-16 text-brand-ink" />
                            </div>
                        )}
                    </div>
                    
                    {/* Encabezado */}
                    <div>
                        <div className="flex items-center gap-x-2 mb-4">
                            <Badge variant="outline" className="bg-brand-pale text-brand-ink">
                                {article.category?.name || "General"}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                                {article.published_at ? format(new Date(article.published_at), "dd MMM yyyy", { locale: es }) : "Publicado recientemente"}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-brand-text">
                            {article.title}
                        </h1>
                        <div className="flex items-center gap-x-3 text-sm text-brand-ink">
                            <div className="h-10 w-10 rounded-full bg-brand-soft flex items-center justify-center text-white font-bold">
                                {article.user?.name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="font-semibold text-brand-text">Por {article.user?.name}</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Contenido */}
                    <div className="prose prose-brand max-w-none pb-10 border-b border-brand-soft">
                        <Preview value={article.content} />
                    </div>
                </div>

                {/* Contenedor 2: Otros Artículos (NewsSection style) */}
                <div className="lg:w-1/3">
                    <h2 className="text-2xl font-bold mb-6 text-brand-text">Artículos Recientes</h2>
                    <div className="flex flex-col gap-6">
                        {recentArticles.length === 0 ? (
                            <p className="text-muted-foreground text-sm">No hay más artículos disponibles.</p>
                        ) : (
                            recentArticles.map((recent) => (
                                <Card key={recent.id} className="group relative min-h-[300px] overflow-hidden rounded-[20px] border-0 bg-black shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                    {(recent.card_image_url || recent.image_url) ? (
                                        <img
                                            src={recent.card_image_url || recent.image_url}
                                            alt={recent.title}
                                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 h-full w-full bg-brand-soft" />
                                    )}

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                                    <div className="relative z-10 flex h-full flex-col justify-end p-5">
                                        <Badge variant="outline" className="mb-2 w-fit rounded-full border-white/35 bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
                                            {recent.category?.name || "General"}
                                        </Badge>

                                        <CardTitle className="mb-2 text-xl font-bold leading-tight text-white line-clamp-2">
                                            {recent.title}
                                        </CardTitle>
                                        
                                        <p className="text-xs text-white/80 mb-2">
                                            Por {recent.user?.name} &middot; {recent.published_at ? format(new Date(recent.published_at), "dd MMM yyyy", { locale: es }) : "Reciente"}
                                        </p>

                                        <p className="mb-4 text-xs leading-5 text-white/90 line-clamp-2">
                                            {recent.short_description}
                                        </p>

                                        <Button asChild variant="landing_page_secondary" className="w-fit rounded-full px-4 py-1.5 text-xs font-semibold">
                                            <Link href={`/articulos/${recent.id}`} className="inline-flex items-center gap-1.5">
                                                Leer
                                                <ArrowUpRight className="h-3 w-3" />
                                            </Link>
                                        </Button>
                                    </div>
                                </Card>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </HomeLayout>
    );
}