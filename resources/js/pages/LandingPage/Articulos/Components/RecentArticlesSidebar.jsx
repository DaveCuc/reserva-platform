import React from "react";
import { Link } from "@inertiajs/react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardTitle } from "@/Components/ui/card";
import { ArrowUpRight } from "lucide-react";

export const RecentArticlesSidebar = ({ articles }) => {
    return (
        <div className="lg:w-1/3">
            <h2 className="text-2xl font-bold mb-6 text-brand-text">Artículos Recientes</h2>
            <div className="flex flex-col gap-6">
                {articles.length === 0 ? (
                    <p className="text-muted-foreground text-sm">No hay más artículos disponibles.</p>
                ) : (
                    articles.map((recent) => (
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
    );
};
