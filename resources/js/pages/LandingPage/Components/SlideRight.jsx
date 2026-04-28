import React, { useState } from 'react';


const SlideRight = () => {
    // Estado para controlar si el panel de información está abierto o cerrado
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className={`absolute top-0 right-0 h-full w-80 bg-white shadow-2xl z-[1001] transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            
            {/* Pestaña flotante que sobresale para abrir/cerrar */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="absolute top-1/2 -left-10 -translate-y-1/2 flex items-center justify-center w-10 h-16 bg-white rounded-l-xl shadow-[-4px_0_6px_-1px_rgba(0,0,0,0.2)] text-brand-text hover:text-brand hover:bg-brand-light transition-all border border-r-0 border-brand-panel z-[1002]"
                title={isOpen ? "Cerrar Información" : "Abrir Información"}
            >
                <svg viewBox="0 0 24 24" className={`w-6 h-6 transition-transform duration-300 ${isOpen ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>

            {/* Cabecera */}
            <div className="flex items-center p-5 border-b border-brand-panel">
                <h2 className="text-2xl font-semibold text-brand-text">Información</h2>
            </div>

            {/* Contenido de la información */}
                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
                    
                    <div className="flex flex-col gap-3">
                        <h3 className="text-lg font-semibold text-brand-dark border-b border-brand-panel pb-2">N. Municipio/Ruta</h3>
                        <p className="text-sm font-medium text-brand-ink uppercase tracking-wider">Lista de Municipios/ Negocios</p>
                        <ol className="list-decimal list-inside pl-2 space-y-2 text-brand-text marker:text-brand-soft">
                            <li className="hover:text-brand bg-brand-light p-2 rounded-md transition-colors cursor-pointer">Municipio/Negocio</li>
                            <li className="hover:text-brand bg-brand-light p-2 rounded-md transition-colors cursor-pointer">Municipio/Negocio</li>
                            <li className="hover:text-brand bg-brand-light p-2 rounded-md transition-colors cursor-pointer">Municipio/Negocio</li>
                            <li className="hover:text-brand bg-brand-light p-2 rounded-md transition-colors cursor-pointer">Municipio/Negocio</li>
                            <li className="hover:text-brand bg-brand-light p-2 rounded-md transition-colors cursor-pointer">Municipio/Negocio</li>
                        </ol>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h3 className="text-lg font-semibold text-brand-dark border-b border-brand-panel pb-2">Municipio/Ruta</h3>
                        <p className="text-brand-ink text-base">Descripcion / Datos del negocio</p>
                    </div>

                </div>
            </div>
    );
}

export default SlideRight;