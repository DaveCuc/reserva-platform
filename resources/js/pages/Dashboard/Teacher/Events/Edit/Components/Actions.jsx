import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Trash } from "lucide-react";
import { Button } from "@/Components/ui/button";

export const Actions = ({ disabled, eventId, isPublished }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = () => {
    setIsLoading(true);
    if (isPublished) {
      router.patch(`/teacher/events/${eventId}/unpublish`, {}, {
        onFinish: () => setIsLoading(false),
      });
    } else {
      router.patch(`/teacher/events/${eventId}/publish`, {}, {
        onFinish: () => setIsLoading(false),
      });
    }
  };

  const onDelete = () => {
    if (window.confirm("¿Estás súper seguro de que deseas eliminar este evento permanentemente?")) {
      setIsLoading(true);
      router.delete(`/teacher/events/${eventId}`, {
        onFinish: () => setIsLoading(false),
      });
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
        className="bg-white border-brand-soft shadow-sm"
      >
        {isPublished ? "Ocultar" : "Publicar"}
      </Button>
      
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
