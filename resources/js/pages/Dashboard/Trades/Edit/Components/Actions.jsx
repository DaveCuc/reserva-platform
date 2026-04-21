import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Pencil, Trash } from "lucide-react";

import { Button } from "@/Components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";

export const Actions = ({ canSubmit, tradeId, status }) => {
    const [isLoading, setIsLoading] = useState(false);
    const confetti = useConfettiStore();

    const onClick = () => {
        setIsLoading(true);

        router.patch(
            `/directory/trades/${tradeId}/submit`,
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsLoading(false);
                    confetti.onOpen();
                },
                onError: () => setIsLoading(false),
            },
        );
    };

    const onEnableEdit = () => {
        setIsLoading(true);

        router.patch(
            `/directory/trades/${tradeId}/revert-draft`,
            {},
            {
                preserveScroll: true,
                onSuccess: () => setIsLoading(false),
                onError: () => setIsLoading(false),
            },
        );
    };

    const onDelete = () => {
        if (!window.confirm("¿Deseas eliminar este registro? Esta acción no se puede deshacer.")) {
            return;
        }

        setIsLoading(true);

        router.delete(`/directory/trades/${tradeId}`, {
            onSuccess: () => setIsLoading(false),
            onError: () => setIsLoading(false),
        });
    };

    return (
        <div className="flex items-center gap-x-2">
            {status !== "approved" ? (
                <Button
                    onClick={onClick}
                    disabled={isLoading || !canSubmit}
                    variant="outline"
                    size="sm"
                    className="border-brand-soft bg-white shadow-sm"
                >
                    {status === "pending" ? "Solicitud enviada" : "Enviar solicitud"}
                </Button>
            ) : (
                <Button
                    onClick={onEnableEdit}
                    disabled={isLoading}
                    variant="outline"
                    size="sm"
                    className="border-brand-soft bg-white shadow-sm"
                >
                    <Pencil className="mr-2 h-4 w-4" />
                    Editar solicitud
                </Button>
            )}

            <Button
                size="sm"
                onClick={onDelete}
                disabled={isLoading}
                variant="destructive"
            >
                <Trash className="h-4 w-4" />
            </Button>
        </div>
    );
};
