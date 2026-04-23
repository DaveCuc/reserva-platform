import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/Components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";

const fadeUp = {
    initial: { opacity: 0, y: 80 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 1 }
};

const imageModules = import.meta.glob('/public/Fotos/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
    eager: true,
    import: 'default',
});

const carouselImages = Object.values(imageModules).sort((a, b) => String(a).localeCompare(String(b)));

export default function HeroSection() {
    return (
        <div className="h-screen relative text-white flex justify-center">
            <Carousel
                plugins={[
                    Autoplay({
                        delay: 5000,
                        stopOnInteraction: false,
                    }),
                ]}
                className="absolute inset-0 w-full h-full"
                opts={{ loop: true }}
            >
                <CarouselContent>
                    {(carouselImages.length ? carouselImages : Array.from({ length: 5 }, (_, index) => `https://picsum.photos/1920/1080?random=${index + 1}`)).map((imageSrc, index) => (
                        <CarouselItem key={`${imageSrc}-${index}`}>
                            <div className="relative w-full h-screen">
                                <img
                                    src={imageSrc}
                                    alt={`Foto galería ${index + 1}`}
                                    className="object-cover w-full h-full absolute inset-0"
                                    onError={(e) => { e.target.src = 'https://picsum.photos/1920/1080?random=' + index; }}
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent >
                <CarouselPrevious className="left-4 hidden" />
                <CarouselNext className="right-4 hidden" />
            </Carousel>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Content */}
            <motion.div {...fadeUp} className="w-full flex justify-center z-10">
                <div className="relative z-10 h-full flex items-center w-full">
                    <div className="container pl-15 mx-auto px-15">
                        <div className="w-full md:w-2/3 lg:w-1/2">
                            <img
                                src="/logo2.svg"
                                alt="Logo"
                                className="mx-auto mb-4 h-100 w-auto"
                            />
                            
                            <h2 className='text-5xl font-light mb-6'> Un Modelo de Prosperidad Local</h2>
                            <p className="text-xl font-lightmb-12">Explora el Patrimonio Biocultural de la Humanidad. Esta plataforma conecta a los visitantes con la riqueza natural y cultural de la región, fomentando un turismo responsable que beneficia directamente a las comunidades locales.</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
