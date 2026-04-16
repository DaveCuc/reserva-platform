import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Trash } from "lucide-react";
import { Button } from "@/Components/ui/button";

export const ChapterActions = ({ disabled, courseId, chapterId, isPublished }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = () => {
    setIsLoading(true);
    if (isPublished) {
      router.patch(`/teacher/courses/${courseId}/chapters/${chapterId}/unpublish`, {}, {
        preserveScroll: true,
        onSuccess: () => setIsLoading(false),
        onError: () => setIsLoading(false)
      });
    } else {
      router.patch(`/teacher/courses/${courseId}/chapters/${chapterId}/publish`, {}, {
        preserveScroll: true,
        onSuccess: () => setIsLoading(false),
        onError: () => setIsLoading(false)
      });
    }
  };

  const onDelete = () => {
    if (window.confirm("¿Estás súper seguro de que deseas eliminar este capítulo permanentemente? No se puede deshacer.")) {
      setIsLoading(true);
      router.delete(`/teacher/courses/${courseId}/chapters/${chapterId}`, {
        onSuccess: () => setIsLoading(false),
        onError: () => setIsLoading(false)
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
        className="bg-white border-slate-300 shadow-sm"
      >
        {isPublished ? "Despublicar" : "Publicar Capítulo"}
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
