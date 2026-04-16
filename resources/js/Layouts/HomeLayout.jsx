import React, { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/Components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/Components/ui/sheet";

const Logo = ({ isScrolled }) => (
    <img 
        src={isScrolled ? "/logo.svg" : "/LOGO2.svg"} 
        alt="Logo" 
        className="h-[50px] w-auto transition-all"
    />
);

const HomeNavbarRoutes = ({ isScrolled }) => {
    const linkClass = cn(
        "transition-all duration-200 font-medium",
        isScrolled 
            ? "text-slate-700 hover:text-white hover:bg-[#739419]" // Scroll oscuro
            : "text-white hover:bg-white/20 hover:text-white"      // Top transparente
    );

    return (
        <div className="flex items-center justify-between w-full gap-x-6 px-4 max-w-7xl mx-auto"> 
            <Sheet>
                <SheetTrigger className="md:hidden p-2 rounded-md hover:bg-black/10 transition">
                    <Menu className={cn("h-5 w-5", isScrolled ? "text-slate-700" : "text-white")} />
                </SheetTrigger>
                <SheetContent side="left" className="p-6 bg-white w-72">
                    <SheetTitle className="sr-only">Menu principal</SheetTitle>
                    <div className="flex flex-col gap-2 mt-6">
                        <Link href="/" className="px-3 py-2 rounded-md text-slate-700 hover:bg-[#739419] hover:text-white transition">Inicio</Link>
                        <Link href="/mapa" className="px-3 py-2 rounded-md text-slate-700 hover:bg-[#739419] hover:text-white transition">Mapa</Link>
                        <Link href="/directorio" className="px-3 py-2 rounded-md text-slate-700 hover:bg-[#739419] hover:text-white transition">Directorio</Link>
                        <Link href="/cursos" className="px-3 py-2 rounded-md text-slate-700 hover:bg-[#739419] hover:text-white transition">Cursos</Link>
                    </div>
                    <div className="mt-6">
                        <Button asChild className="w-full bg-[#739419] text-white hover:bg-[#4E6411]">
                            <Link href="/login">Acceder</Link>
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>

            <div className="flex-shrink-0">
                <Link href="/" className="inline-flex items-center focus:outline-none">
                    <Logo isScrolled={isScrolled} />
                </Link>
            </div>
            
            <nav className="hidden md:flex items-center gap-x-2 flex-1 justify-center">
                <Button asChild variant="ghost" className={linkClass}><Link href="/">Inicio</Link></Button>
                <Button asChild variant="ghost" className={linkClass}><Link href="/mapa">Mapa</Link></Button>
                <Button asChild variant="ghost" className={linkClass}><Link href="/directorio">Directorio</Link></Button>
                <Button asChild variant="ghost" className={linkClass}><Link href="/cursos">Cursos</Link></Button>
            </nav>
            
            <div className="flex-shrink-0 flex gap-2">
                <Button 
                    asChild
                    className={cn(
                        "shadow-md hover:shadow-lg transition-all duration-100 font-semibold px-6",
                        isScrolled
                            ? "bg-[#739419] text-white hover:bg-[#4E6411]" 
                            : "bg-white text-[#739419] hover:bg-slate-100" 
                    )}
                >
                    <Link href="/login">Acceder</Link>
                </Button>
            </div>
        </div>
    );
};

export const HomeNavbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { url } = usePage();

    const currentPath = url.split("?")[0];
    const isAlwaysSolid = ["/mapa", "/cursos"].includes(currentPath);

    useEffect(() => {
        if (isAlwaysSolid) {
            setIsScrolled(true);
            return;
        }

        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isAlwaysSolid]);

    return (
        <nav className="fixed top-0 w-full z-50 transition-all duration-300">
            <div 
                className={cn(
                    "p-4 h-[80px] flex items-center transition-all duration-300",
                    isScrolled ? "bg-white border-b shadow-sm" : "bg-transparent border-transparent"
                )}
            >
                <HomeNavbarRoutes isScrolled={isScrolled} />
            </div>
        </nav>
    );
};

export const Footer = () => {
    return ( 
        <footer className="bg-[#4f3b24] text-white p-8 mt-auto z-10 relative">
            <div className="container mx-auto max-w-7xl pt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                        <Link href="/" className="inline-flex items-center mb-4 focus:outline-none">
                            <Logo isScrolled={false} />
                        </Link>
                        <p className="text-sm text-white/80">
                            Desarrollo Sostenible y Turismo Comunitario en la Reserva de la Biosfera Tehuacán-Cuicatlán: Un Modelo de Prosperidad Local.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4 text-lg">Navegación</h3>
                        <div className="flex flex-col space-y-3">
                            <Link href="/mapa" className="text-white hover:text-green-400 transition">Mapa</Link>
                            <Link href="/directorio" className="text-white hover:text-green-400 transition">Directorio</Link>
                            <Link href="/cursos" className="text-white hover:text-green-400 transition">Cursos</Link>
                            <Link href="/register" className="text-white hover:text-green-400 transition">Regístrate</Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4 text-lg">Nosotros</h3>
                        <div className="flex flex-col space-y-3">
                            <a href="http://www.ittehuacan.edu.mx/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-400 transition">Instituto Tecnológico de Tehuacán</a>
                        </div>
                    </div>
                </div>

                <div className="text-center text-sm text-white/60 pt-8 mt-8 border-t border-white/10">
                    © Todos los derechos reservados {new Date().getFullYear()}
                </div>
            </div>
        </footer>
    );
};

export default function HomeLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col font-sans bg-slate-50">
            <HomeNavbar />
            
            <main className="flex-grow">
                {children}
            </main>

            <Footer />
        </div>
    );
}
