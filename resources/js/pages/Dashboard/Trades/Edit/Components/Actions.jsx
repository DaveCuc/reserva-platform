import React, { useState } from "react";
import { router } from "@inertiajs/react";

import { Button } from "@/Components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";

export const Actions = ({ canPublish, tradeId, isPublished }) => {
    const [isLoading, setIsLoading] = useState(false);
    const confetti = useConfettiStore();

    const onClick = () => {
        setIsLoading(true);

        if (isPublished) {
            router.patch(
                `/directory/trades/${tradeId}/unpublish`,
                {},
                {
                    preserveScroll: true,
                    onSuccess: () => setIsLoading(false),
                    onError: () => setIsLoading(false),
                },
            );

            return;
        }

        router.patch(
            `/directory/trades/${tradeId}/publish`,
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
                disabled={isLoading || (!isPublished && !canPublish)}
                variant="outline"
                size="sm"
                className="border-brand-soft bg-white shadow-sm"
            >
                {isPublished ? "Despublicar" : "Publicar registro"}
            </Button>
        </div>
    );
};
