import React, { useState } from 'react';


const SlideRight = ({ mapRef }) => {
    // Estado para controlar si el panel de información está abierto o cerrado
    const [isOpen, setIsOpen] = useState(true);

    const handleZoom = (lat, lng, zoom = 13) => {
        if (mapRef?.current) {
            mapRef.current.setView([lat, lng], zoom);
        }
    };

    return (
        <div className={`relative h-full w-80 shrink-0 bg-white shadow-2xl z-[1001] transition-all duration-300 ease-in-out flex flex-col ${isOpen ? 'mr-0' : '-mr-80'}`}>

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
            <div className="pt-24 flex items-center p-5 border-b border-brand-panel">
                <h2 className="text-2xl font-semibold text-brand-text">Información</h2>
            </div>

            {/* Contenido de la información */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">

                <div className="flex flex-col gap-3">
                    <h3 className="text-lg font-semibold text-brand-dark border-b border-brand-panel pb-2">N. Municipio/Ruta</h3>
                    <p className="text-sm font-medium text-brand-ink uppercase tracking-wider">Lista de Municipios/ Negocios</p>
                    <ol className="list-decimal list-inside pl-2 space-y-2 text-brand-text marker:text-brand-soft">
                        <li onClick={() => handleZoom(18.3273, -97.4752)} className="hover:text-brand bg-brand-light p-2 rounded-md transition-colors cursor-pointer">Zapotitlán Salinas</li>
                        <li onClick={() => handleZoom(18.3145, -97.6149)} className="hover:text-brand bg-brand-light p-2 rounded-md transition-colors cursor-pointer">San Juan Raya</li>
                        <li onClick={() => handleZoom(18.2252, -97.4865)} className="hover:text-brand bg-brand-light p-2 rounded-md transition-colors cursor-pointer">Los Reyes Metzontla</li>
                        <li onClick={() => handleZoom(18.3964, -97.4452)} className="hover:text-brand bg-brand-light p-2 rounded-md transition-colors cursor-pointer">San Antonio Texcala</li>
                        <li onClick={() => handleZoom(18.1111, -97.1795, 9)} className="hover:text-brand bg-brand-light p-2 rounded-md transition-colors cursor-pointer">Tehuacán Centro</li>
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