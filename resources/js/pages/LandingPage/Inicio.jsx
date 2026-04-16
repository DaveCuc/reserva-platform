import React from 'react';
import { Head } from '@inertiajs/react';
import HomeLayout from '@/Layouts/HomeLayout';
import { motion } from 'framer-motion';

import HeroSection from './Components/HeroSection';
import NewsSection from './Components/NewsSection';
import MapSection from './Components/MapSection';
import ConocenosSection from './Components/ConocenosSection';
import CursosSection from './Components/CursosSection';

const fadeUp = {
  initial: { opacity: 0, y: 100 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 1 }
};

export default function Welcome() {
    return (
        <HomeLayout>
            <Head title="Inicio" />
            
            <HeroSection />

            <motion.div {...fadeUp}>
                <NewsSection />
            </motion.div>

            <motion.div {...fadeUp}>
                <MapSection />
            </motion.div>

            <motion.div {...fadeUp}>
                <ConocenosSection />
            </motion.div>

            <motion.div {...fadeUp}>
                <CursosSection />
            </motion.div>
            
        </HomeLayout>
    );
}
