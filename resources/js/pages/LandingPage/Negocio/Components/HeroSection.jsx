import React from 'react';
import { motion } from "framer-motion";
import { Badge } from "@/Components/ui/badge";

const fadeUp = {
    initial: { opacity: 0, y: 80 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 1 }
};

export default function HeroSection({ trade }) {
    const bgImage = trade.image_url || 'https://picsum.photos/1920/1080?random=1';
    const regionName = trade.region?.name || trade.region || 'Región no definida';
    const municipioName = trade.municipio?.name || 'Municipio no definido';

    return (
        <div className="h-screen relative text-white flex justify-center overflow-hidden">
            <img 
                src={bgImage} 
                alt={trade.comercial_name}
                className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Content */}
            <motion.div {...fadeUp} className="w-full flex justify-center z-10">
                <div className="relative z-10 h-full flex items-end w-full pb-40">
                    <div className="container mx-auto px-4 md:px-8">
                        <div>
                            <Badge className="inline-flex items-center rounded-full border border-white/30 bg-white/15 px-4 py-1 text-sm font-semibold uppercase tracking-wider text-white backdrop-blur-md shadow-lg md:px-6 md:py-2 md:text-base">
                                Región
                            </Badge>
                            <h2 className='text-5xl md:text-9xl font-bold mb-4 drop-shadow-md pt-5'>{regionName}</h2>
                            <p className="text-2xl md:text-6xl font-light drop-shadow-md">{municipioName}</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
