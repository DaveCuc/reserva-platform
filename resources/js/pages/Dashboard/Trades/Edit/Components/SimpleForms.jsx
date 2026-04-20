import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Pencil } from "lucide-react";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";

function BaseCard({ title, isEditing, onToggle, children, preview }) {
    return (
        <div className="mt-6 rounded-md border bg-brand-pale p-4">
            <div className="flex items-center justify-between font-medium">
                {title}
                <Button
                    onClick={onToggle}
                    variant="ghost"
                    className="bg-white hover:bg-brand-soft hover:text-white"
                >
                    {isEditing ? (
                        "Cancelar"
                    ) : (
                        <>
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar
                        </>
                    )}
                </Button>
            </div>
            {!isEditing ? preview : children}
        </div>
    );
}

export function ComercialNameForm({ initialData, tradeId }) {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialData.comercial_name || "");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        router.patch(
            `/directory/trades/${tradeId}`,
            { comercial_name: value },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsLoading(false);
                    setIsEditing(false);
                },
                onError: () => setIsLoading(false),
            },
        );
    };

    return (
        <BaseCard
            title="Nombre comercial"
            isEditing={isEditing}
            onToggle={() => setIsEditing((current) => !current)}
            preview={
                <p className="mt-2 text-sm text-brand-text">
                    {initialData.comercial_name || "Sin definir"}
                </p>
            }
        >
            <form onSubmit={onSubmit} className="mt-4 space-y-4">
                <Input
                    disabled={isLoading}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Ej. Mercado Artesanal Los Pinos"
                    className="bg-white"
                    required
                />
                <Button type="submit" disabled={!value || isLoading}>
                    Guardar
                </Button>
            </form>
        </BaseCard>
    );
}

export function DescriptionForm({ initialData, tradeId }) {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialData.descripcion || "");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        router.patch(
            `/directory/trades/${tradeId}`,
            { descripcion: value },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsLoading(false);
                    setIsEditing(false);
                },
                onError: () => setIsLoading(false),
            },
        );
    };

    return (
        <BaseCard
            title="Descripción"
            isEditing={isEditing}
            onToggle={() => setIsEditing((current) => !current)}
            preview={
                <p className={`mt-2 text-sm ${initialData.descripcion ? "text-brand-text" : "italic text-brand-ink"}`}>
                    {initialData.descripcion || "Sin descripción"}
                </p>
            }
        >
            <form onSubmit={onSubmit} className="mt-4 space-y-4">
                <Textarea
                    disabled={isLoading}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Describe tu negocio y lo que ofreces"
                    className="min-h-32 bg-white"
                />
                <Button type="submit" disabled={!value || isLoading}>
                    Guardar
                </Button>
            </form>
        </BaseCard>
    );
}

export function GiroWebsiteForm({ initialData, tradeId }) {
    const [isEditing, setIsEditing] = useState(false);
    const [giro, setGiro] = useState(initialData.giro || "");
    const [website, setWebsite] = useState(initialData.website || "");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        router.patch(
            `/directory/trades/${tradeId}`,
            { giro, website },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsLoading(false);
                    setIsEditing(false);
                },
                onError: () => setIsLoading(false),
            },
        );
    };

    return (
        <BaseCard
            title="Giro o categoría"
            isEditing={isEditing}
            onToggle={() => setIsEditing((current) => !current)}
            preview={
                <div className="mt-2 space-y-1 text-sm">
                    <p className={initialData.giro ? "text-brand-text" : "italic text-brand-ink"}>
                        Giro: {initialData.giro || "Sin definir"}
                    </p>
                    <p className={initialData.website ? "text-brand-text" : "italic text-brand-ink"}>
                        Sitio web: {initialData.website || "Sin sitio web"}
                    </p>
                </div>
            }
        >
            <form onSubmit={onSubmit} className="mt-4 space-y-4">
                <Input
                    disabled={isLoading}
                    value={giro}
                    onChange={(e) => setGiro(e.target.value)}
                    placeholder="Ej. Artesanías, hospedaje, alimentos..."
                    className="bg-white"
                />
                <Input
                    disabled={isLoading}
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://misitio.com"
                    className="bg-white"
                />
                <Button type="submit" disabled={isLoading}>
                    Guardar
                </Button>
            </form>
        </BaseCard>
    );
}

export function KeyActorForm({ initialData, tradeId }) {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(initialData.name || "");
    const [phone, setPhone] = useState(initialData.phone || "");
    const [email, setEmail] = useState(initialData.email || "");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        router.patch(
            `/directory/trades/${tradeId}`,
            { name, phone, email },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsLoading(false);
                    setIsEditing(false);
                },
                onError: () => setIsLoading(false),
            },
        );
    };

    return (
        <BaseCard
            title="Actor clave"
            isEditing={isEditing}
            onToggle={() => setIsEditing((current) => !current)}
            preview={
                <div className="mt-2 space-y-1 text-sm">
                    <p className={initialData.name ? "text-brand-text" : "italic text-brand-ink"}>
                        Nombre y apellidos: {initialData.name || "Sin definir"}
                    </p>
                    <p className={initialData.phone ? "text-brand-text" : "italic text-brand-ink"}>
                        Teléfono: {initialData.phone || "Sin definir"}
                    </p>
                    <p className={initialData.email ? "text-brand-text" : "italic text-brand-ink"}>
                        Correo: {initialData.email || "Sin definir"}
                    </p>
                </div>
            }
        >
            <form onSubmit={onSubmit} className="mt-4 space-y-4">
                <Input
                    disabled={isLoading}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre y apellidos"
                    className="bg-white"
                />
                <Input
                    disabled={isLoading}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Número de teléfono"
                    className="bg-white"
                />
                <Input
                    disabled={isLoading}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Correo"
                    className="bg-white"
                />
                <Button type="submit" disabled={isLoading}>
                    Guardar
                </Button>
            </form>
        </BaseCard>
    );
}

export function LocationForm({ initialData, tradeId }) {
    const [isEditing, setIsEditing] = useState(false);
    const [address, setAddress] = useState(initialData.address || "");
    const [mapLocation, setMapLocation] = useState(initialData.map_location || "");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        router.patch(
            `/directory/trades/${tradeId}`,
            { address, map_location: mapLocation },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsLoading(false);
                    setIsEditing(false);
                },
                onError: () => setIsLoading(false),
            },
        );
    };

    return (
        <BaseCard
            title="Ubicación geográfica"
            isEditing={isEditing}
            onToggle={() => setIsEditing((current) => !current)}
            preview={
                <div className="mt-2 space-y-1 text-sm">
                    <p className={initialData.address ? "text-brand-text" : "italic text-brand-ink"}>
                        Dirección: {initialData.address || "Sin definir"}
                    </p>
                    <p className={initialData.map_location ? "text-brand-text" : "italic text-brand-ink"}>
                        Ubicación en mapa: {initialData.map_location || "Sin definir"}
                    </p>
                </div>
            }
        >
            <form onSubmit={onSubmit} className="mt-4 space-y-4">
                <Input
                    disabled={isLoading}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Dirección"
                    className="bg-white"
                />
                <Input
                    disabled={isLoading}
                    value={mapLocation}
                    onChange={(e) => setMapLocation(e.target.value)}
                    placeholder="Ubicación en mapa (texto temporal)"
                    className="bg-white"
                />
                <Button type="submit" disabled={isLoading}>
                    Guardar
                </Button>
            </form>
        </BaseCard>
    );
}
