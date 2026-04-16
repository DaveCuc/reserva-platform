import React, { useEffect, useMemo, useState } from "react";
import { Head, router, usePage } from '@inertiajs/react';
import HomeLayout from '@/Layouts/HomeLayout';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/Components/ui/carousel";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/Components/ui/select";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";

const fadeUp = {
  initial: { opacity: 0, y: 80 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 1 }
};

const imageModules = import.meta.glob('/public/Directorios/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
        eager: true,
        import: 'default',
});

const carouselImages = Object.values(imageModules).sort((a, b) => String(a).localeCompare(String(b)));

const getSearchParamsFromUrl = (url) => {
    const query = url.includes("?") ? url.split("?")[1] : "";
    return new URLSearchParams(query);
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

const ResultadoSection = () => {
    const { url } = usePage();
    // Next uses useSearchParams, in Inertia we use props or URL directly, but for now we maintain API calls
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const params = useMemo(() => getSearchParamsFromUrl(url), [url]);

    useEffect(() => {
        const fetchDirectorio = async () => {
            try {
                setIsLoading(true);
                const queryString = params.toString();
                
                // Mantiene el llamado a API que migraremos a un Laravel Controller en la siguiente fase
                const response = await fetch(queryString ? `/api/directorio?${queryString}` : "/api/directorio");
                if (!response.ok) throw new Error("No se pudo cargar el directorio");
                
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error("Error loading directorio:", error);
                setItems([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDirectorio();
    }, [params]);

    return ( 
        <section className="p-10">
            <div className="bg-[#739419] p-5 rounded-3xl py-15 shadow-xl">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 ">
                        <h2 className="text-4xl font-bold text-white">Resultados de búsqueda</h2>
                    </div>
                    {isLoading ? (
                        <p className="text-white text-center font-medium">Buscando resultados...</p>
                    ) : items.length === 0 ? (
                        <p className="text-white text-center font-medium">No se encontraron resultados con esos filtros.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {items.map((item) => (
                                <Card key={item.id || item.email} className="flex flex-col overflow-hidden rounded-3xl shadow-md border-0 bg-white hover:shadow-xl transition-shadow duration-300">
                                    <CardHeader className="p-4 pb-0">
                                        <Badge variant="outline" className="mb-3 w-fit">{item.giro}</Badge>
                                        <CardTitle className="text-xl font-semibold mb-1 text-black leading-tight">
                                            {item.comercial_name || item.name}
                                        </CardTitle>
                                    </CardHeader>

                                    <CardContent className="p-4 pt-3 grow space-y-2">
                                        <p className="text-black text-sm line-clamp-3">
                                            {item.descripcion || "Sin descripción"}
                                        </p>
                                        <p className="text-black text-sm">
                                            <span className="font-semibold">Dirección:</span> {item.address || "No disponible"}
                                        </p>
                                        <p className="text-black text-sm">
                                            <span className="font-semibold">Teléfono:</span> {item.phone || "No disponible"}
                                        </p>
                                        <p className="text-black text-sm break-all">
                                            <span className="font-semibold">Email:</span> {item.email}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
     );
}

const BuscadorSection = () => {
    const { url } = usePage();
    const params = useMemo(() => getSearchParamsFromUrl(url), [url]);
    const [selectedGiro, setSelectedGiro] = useState(params.get("giro") || "all");
    const [selectedRegion, setSelectedRegion] = useState(params.get("region") || "all");

    useEffect(() => {
        setSelectedGiro(params.get("giro") || "all");
        setSelectedRegion(params.get("region") || "all");
    }, [params]);

    const onSubmit = (event) => {
        event.preventDefault();
        const searchParams = new URLSearchParams();
        if (selectedGiro && selectedGiro !== "all") searchParams.set("giro", selectedGiro);
        if (selectedRegion && selectedRegion !== "all") searchParams.set("region", selectedRegion);
        
        const queryString = searchParams.toString();
        // Recarga via Inertia
        router.visit(queryString ? `/directorio?${queryString}` : "/directorio", {
            preserveScroll: true
        });
    };

    return (
        <div className="h-screen relative text-white flex justify-center">
            <Carousel plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]} className="absolute inset-0 w-full h-full" opts={{ loop: true }}>
                <CarouselContent>
                    {(carouselImages.length ? carouselImages : Array.from({ length: 5 }, (_, index) => `https://picsum.photos/1920/1080?random=${index + 1}`)).map((imageSrc, index) => (
                        <CarouselItem key={`${imageSrc}-${index}`}>
                            <div className="relative w-full h-screen">
                                <img
                                    src={imageSrc}
                                    alt={`Foto de galería ${index + 1}`}
                                    className="object-cover w-full h-full absolute inset-0"
                                    onError={(e) => { e.target.src = 'https://picsum.photos/1920/1080?random='+index; }}
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent >
            </Carousel>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60" />

            <motion.div {...fadeUp} className="relative z-10 w-full"> 
                <div className="h-full flex items-center justify-center">
                    <div className="container mx-auto px-4 text-center">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-extrabold mb-2">Busca en nuestro Directorio</h2>
                            <h1 className="text-5xl md:text-7xl font-extrabold mb-4">Reserva de la Biosfera</h1>
                            <h2 className="text-xl md:text-3xl font-extrabold mb-8">Todo en un solo lugar</h2>
                            
                            <form onSubmit={onSubmit} className="bg-white/20 backdrop-blur-md p-6 rounded-3xl shadow-lg md:flex md:items-end md:gap-4 border border-white/20">
                                <div className="grow mb-4 md:mb-0 text-left">
                                    <h5 className="font-bold text-white mb-2">Categoría</h5>
                                    <Select value={selectedGiro} onValueChange={setSelectedGiro}>
                                        <SelectTrigger className="w-full p-4 h-12 rounded-2xl border-0 text-gray-800 bg-white focus:ring-4 focus:ring-[#8fb81f]">
                                            <SelectValue placeholder="Selecciona una categoría" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                            <SelectLabel>Categoria</SelectLabel>
                                            <SelectItem value="all">Todas</SelectItem>
                                            <SelectItem value="Hospedaje">Hospedaje</SelectItem>
                                            <SelectItem value="Restaurantes">Restaurantes</SelectItem>
                                            <SelectItem value="Transporte">Transporte</SelectItem>
                                            <SelectItem value="Artesanías">Artesanías</SelectItem>
                                            <SelectItem value="Tours">Tours</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grow mb-4 md:mb-0 text-left">
                                    <h5 className="font-bold text-white mb-2">Región</h5>
                                    <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                                        <SelectTrigger className="w-full p-4 h-12 rounded-2xl border-0 text-gray-800 bg-white focus:ring-4 focus:ring-[#8fb81f]">
                                            <SelectValue placeholder="Selecciona una región" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                            <SelectLabel>Región</SelectLabel>
                                            <SelectItem value="all">Todas</SelectItem>
                                            <SelectItem value="Norte">Norte</SelectItem>
                                            <SelectItem value="Centro">Centro</SelectItem>
                                            <SelectItem value="Sur">Sur</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button type="submit" className="h-12 w-full md:w-auto px-8 bg-[#8fb81f] hover:bg-[#739419] text-white rounded-2xl font-bold">
                                    Buscar ahora
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default function Directorio() {
    return (
        <HomeLayout>
            <Head title="Directorio Local" />
            <BuscadorSection />
            <motion.div {...fadeUp}>
                <ResultadoSection />
            </motion.div>
            <motion.div {...fadeUp}>
                <RegistroSection />
            </motion.div>
        </HomeLayout>
    );
}
