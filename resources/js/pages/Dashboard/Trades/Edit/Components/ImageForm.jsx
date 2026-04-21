import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Pencil, PlusCircle, ImageIcon } from "lucide-react";

import { Button } from "@/Components/ui/button";

export const ImageForm = ({ initialData, tradeId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!file) return;

        setIsLoading(true);

        router.post(
            `/directory/trades/${tradeId}/image`,
            { image: file },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsLoading(false);
                    setFile(null);
                    toggleEdit();
                },
                onError: () => setIsLoading(false),
            },
        );
    };

    return (
        <div className="mt-6 rounded-md border bg-brand-pale p-4">
            <div className="flex items-center justify-between font-medium">
                Foto del negocio
                <Button onClick={toggleEdit} variant="ghost" className="bg-white hover:bg-brand-soft hover:text-white">
                    {isEditing && <>Cancelar</>}
                    {!isEditing && !initialData.image_url && (
                        <>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Agregar imagen
                        </>
                    )}
                    {!isEditing && initialData.image_url && (
                        <>
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar imagen
                        </>
                    )}
                </Button>
            </div>

            {!isEditing &&
                (!initialData.image_url ? (
                    <div className="mt-2 flex h-60 items-center justify-center rounded-md bg-brand-pale">
                        <ImageIcon className="h-10 w-10 text-brand-ink" />
                    </div>
                ) : (
                    <div className="relative mt-2 aspect-video">
                        <img
                            alt="Negocio"
                            className="h-full w-full rounded-md object-cover"
                            src={initialData.image_url}
                        />
                    </div>
                ))}

            {isEditing && (
                <form onSubmit={onSubmit} className="mt-4 space-y-4">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="w-full cursor-pointer text-sm text-brand-ink file:mr-4 file:rounded-md file:border-0 file:bg-brand-soft file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-brand-dark"
                    />
                    <Button disabled={!file || isLoading} type="submit">
                        Guardar imagen
                    </Button>
                    <div className="mt-4 text-xs text-muted-foreground">
                        Se recomienda una relación de aspecto de 16:9
                    </div>
                </form>
            )}
        </div>
    );
};
