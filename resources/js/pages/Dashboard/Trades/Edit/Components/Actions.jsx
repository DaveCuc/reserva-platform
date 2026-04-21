import React, { useState } from "react";
import { router } from "@inertiajs/react";

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

    return (
        <div className="flex items-center gap-x-2">
            <Button
                onClick={onClick}
                disabled={isLoading || !canSubmit}
                variant="outline"
                size="sm"
                className="border-brand-soft bg-white shadow-sm"
            >
                {status === "pending" ? "Solicitud enviada" : "Enviar solicitud"}
            </Button>
        </div>
    );
};
