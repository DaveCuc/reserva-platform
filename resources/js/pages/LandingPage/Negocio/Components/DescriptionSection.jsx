import React from 'react';
import { Preview } from "@/Components/Preview";
import { User, Phone, Mail } from "lucide-react";

const DescriptionSection = ({ trade }) => {
    if (!trade) return null;

    const hasPersonalContact = trade.personal_name || trade.personal_phone || trade.personal_email;

    return (
        <section className="bg-brand-earth">
            <div className=" container max-w-7xl mx-auto px-5 py-11 md:pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className={`bg-white rounded-xl border shadow-sm p-6 md:p-8 ${hasPersonalContact ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
                        <h2 className="text-6xl font-semibold text-brand-text mb-6">Descripción</h2>
                        {trade.descripcion_larga ? (
                            <div className="prose prose-sm md:prose-base max-w-none text-brand-ink text-justify text-lg">
                                <Preview value={trade.descripcion_larga} />
                            </div>
                        ) : (
                            <p className="text-brand-ink italic">No hay descripción disponible.</p>
                        )}
                    </div>

                    {hasPersonalContact && (
                        <div className="bg-white rounded-xl border shadow-sm p-6 md:p-8 lg:col-span-1 h-fit">
                            <h2 className="text-6xl font-semibold text-brand-text mb-6">Contacto Personal</h2>
                            <div className="space-y-4">
                                {/* Podemos agregar un avatar placeholder si no hay foto del responsable */}
                                {/*}
                                <div className="flex justify-center mb-6">
                                    <div className="w-24 h-24 rounded-full bg-brand-pale border-2 border-brand-soft flex items-center justify-center text-brand-text shadow-sm overflow-hidden">
                                        <User className="w-10 h-10" />
                                    </div>
                                </div>
*/}
                                {trade.personal_name && (
                                    <div className="flex items-center text-brand-ink text-lg">
                                        <User className="w-5 h-5 mr-3 text-brand-text" />
                                        <span>{trade.personal_name}</span>
                                    </div>
                                )}
                                {/* Cargo */}
                                {trade.personal_cargo && (
                                    <div className="flex items-center text-brand-ink text-lg">
                                        <User className="w-5 h-5 mr-3 text-brand-text" />
                                        <span>{trade.personal_cargo}</span>
                                    </div>
                                )}
                                {trade.personal_phone && (
                                    <div className="flex items-center text-brand-ink text-lg">  
                                        <Phone className="w-5 h-5 mr-3 text-brand-text" />
                                        <span>{trade.personal_phone}</span>
                                    </div>
                                )}
                                {trade.personal_email && (
                                    <div className="flex items-center text-brand-ink text-lg md:text-base">
                                        <Mail className="w-5 h-5 mr-3 text-brand-text" />
                                        <a href={`mailto:${trade.personal_email}`} className="hover:underline">
                                            {trade.personal_email}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>


    );
}

export default DescriptionSection;