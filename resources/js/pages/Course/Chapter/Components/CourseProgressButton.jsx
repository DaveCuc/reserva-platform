import React, { useState } from "react";
import { Button } from "@/Components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { CheckCircle, XCircle } from "lucide-react";
import { router } from "@inertiajs/react";

export const CourseProgressButton = ({ chapterId, courseId, nextChapterId, isCompleted }) => {
  const [isLoading, setIsLoading] = useState(false);
  const confetti = useConfettiStore();

  const onClick = () => {
    setIsLoading(true);
    router.put(`/courses/${courseId}/chapters/${chapterId}/progress`, {
      isCompleted: !isCompleted
    }, {
      onSuccess: () => {
        if (!isCompleted && !nextChapterId) {
          confetti.onOpen();
        }
        if (!isCompleted && nextChapterId) {
          router.visit(`/courses/${courseId}/chapters/${nextChapterId}`);
        }
      },
      onFinish: () => setIsLoading(false)
    });
  }

  return (
    <Button 
      onClick={onClick} 
      disabled={isLoading} 
      size="sm" 
      variant={isCompleted ? "outline" : "default"} 
      className={`w-full md:w-auto ${isCompleted ? "border-emerald-700 text-emerald-700 hover:bg-emerald-50" : "bg-emerald-700 hover:bg-emerald-800 text-white"}`}
    >
      {isCompleted ? "Marcar como incompleto" : "Marcar como completado"}
      {isCompleted ? <XCircle className="h-4 w-4 ml-2" /> : <CheckCircle className="h-4 w-4 ml-2" />}
    </Button>
  );
};
