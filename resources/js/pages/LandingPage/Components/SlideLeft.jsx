import React, { useState } from 'react';


const SlideLeft = ({ capasActivas, setCapasActivas }) => {
    // Estado para controlar si el menú está abierto o cerrado
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className={`absolute top-0 left-0 h-full w-72 bg-white shadow-2xl z-[1001] transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            
            {/* Pestaña flotante que sobresale para abrir/cerrar */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="absolute top-1/2 -right-10 -translate-y-1/2 flex items-center justify-center w-10 h-16 bg-white rounded-r-xl shadow-[4px_0_6px_-1px_rgba(0,0,0,0.2)] text-brand-text hover:text-brand hover:bg-brand-light transition-all border border-l-0 border-brand-panel z-[1002]"
                title={isOpen ? "Cerrar Mapas" : "Abrir Mapas"}
            >
                <svg viewBox="0 0 24 24" className={`w-6 h-6 transition-transform duration-300 ${isOpen ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>

            {/* Cabecera: Título */}
            <div className="flex items-center p-5 border-b border-brand-panel">
                <h2 className="text-2xl font-semibold text-brand-text">Mapas</h2>
            </div>

            {/* Botones de navegación (Capas) */}
                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
                    <button 
                        onClick={() => setCapasActivas(prev => ({ ...prev, reserva: !prev.reserva }))}
                        className={`w-full text-left px-4 py-3 rounded-md transition-colors font-medium shadow-sm ${capasActivas?.reserva ? 'bg-brand-soft text-white' : 'text-brand-ink hover:bg-brand-panel hover:text-brand-text'}`}
                    >
                        Reserva
                    </button>
                    <button 
                        onClick={() => setCapasActivas(prev => ({ ...prev, general: !prev.general }))}
                        className={`w-full text-left px-4 py-3 rounded-md transition-colors font-medium shadow-sm ${capasActivas?.general ? 'bg-brand-soft text-white' : 'text-brand-ink hover:bg-brand-panel hover:text-brand-text'}`}
                    >
                        General
                    </button>
                </div>
            </div>
    );
}

export default SlideLeft;