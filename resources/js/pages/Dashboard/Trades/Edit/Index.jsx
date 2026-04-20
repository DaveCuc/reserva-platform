import React from "react";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeft, Building2, Contact, MapPin } from "lucide-react";

import MainLayout from "@/Layouts/MainLayout";
import { Banner } from "@/Components/banner";
import { IconBadge } from "@/Components/icon-badge";
import {
    ComercialNameForm,
    DescriptionForm,
    KeyActorForm,
} from "./Components/SimpleForms";
import { ImageForm } from "./Components/ImageForm";
import { Actions } from "./Components/Actions";
import { GirosDigitalForm } from "./Components/GirosDigitalForm";
import { RegionMunicipioForm } from "./Components/RegionMunicipioForm";

export default function TradeEditor({ trade, giros, regions }) {
    const requiredFields = [
        trade.comercial_name,
        trade.descripcion,
        trade.name,
        trade.phone,
        trade.address,
        trade.image_url,
        trade.region_id,
        trade.municipio_id,
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;
    const isComplete = requiredFields.every(Boolean) && (trade.giros?.length || 0) > 0;

    return (
        <MainLayout>
            <Head title={`Editar Registro: ${trade.comercial_name || "Trade"}`} />

            {!trade.is_published && (
                <Banner
                    variant="warningSolid"
                    label="Este registro no es visible para el público hasta que lo publiques."
                />
            )}

            <div className="mx-auto max-w-6xl p-6 pb-20">
                <Link href="/trade" className="mb-6 flex items-center text-sm transition hover:opacity-75">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver a la lista de registros
                </Link>

                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-2">
                        <h1 className="text-2xl font-bold text-brand-text">Configuración del negocio</h1>
                        <span className="text-sm text-brand-text">
                            Completa todos los campos ({completedFields}/{totalFields})
                        </span>
                    </div>
                    <Actions
                        canPublish={isComplete}
                        tradeId={trade.id}
                        isPublished={trade.is_published}
                    />
                </div>

                <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge variant="teacher" size="md" icon={Building2} />
                            <h2 className="text-xl font-semibold">Personaliza tu negocio</h2>
                        </div>

                        <ComercialNameForm initialData={trade} tradeId={trade.id} />
                        <DescriptionForm initialData={trade} tradeId={trade.id} />
                        <GirosDigitalForm initialData={trade} tradeId={trade.id} giros={giros} />
                        <ImageForm initialData={trade} tradeId={trade.id} />
                    </div>

                    <div className="space-y-6">
                        <div>
                            <div className="mb-6 flex items-center gap-x-2">
                                <IconBadge variant="teacher" size="md" icon={Contact} />
                                <h2 className="text-xl font-semibold">Actor clave</h2>
                            </div>
                            <KeyActorForm initialData={trade} tradeId={trade.id} />
                        </div>

                        <div>
                            <div className="mb-6 flex items-center gap-x-2">
                                <IconBadge variant="teacher" size="md" icon={MapPin} />
                                <h2 className="text-xl font-semibold">Ubicación geográfica</h2>
                            </div>
                            <RegionMunicipioForm initialData={trade} tradeId={trade.id} regions={regions} />
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
