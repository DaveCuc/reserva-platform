import { useState } from "react";
import { router } from "@inertiajs/react";
import { Lock } from "lucide-react";
// import { toast } from "sonner"; // Descomentar al integrar libreria de toasts

export const VideoPlayer = ({
  courseId,
  chapterId,
  videoUrl,
  nextChapterId,
  isLocked,
  completeOnEnd,
  title,
}) => {
  const [isReady, setIsReady] = useState(false);

  const onEnd = () => {
    if (completeOnEnd) {
      // Llamada de Inertia para marcar como completado
      router.put(`/courses/${courseId}/chapters/${chapterId}/progress`, {
        isCompleted: true,
      }, {
        preserveScroll: true,
        onSuccess: () => {
          // Si no hay siguiente capítulo -> CONFETI
          if (!nextChapterId) {
            console.log("¡Curso Finalizado! Lanza confeti aquí.");
          }
          console.log("Progreso actualizado");

          if (nextChapterId) {
            router.visit(`/courses/${courseId}/chapters/${nextChapterId}`);
          }
        },
        onError: () => {
          console.error("Hubo un error al actualizar el progreso");
        }
      });
    }
  }

  return (
    <div className="relative aspect-video">
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary text-white">
          <Lock className="h-8 w-8" />
          <p className="text-sm">
            Este capítulo está bloqueado
          </p>
        </div>
      )}
      
      {!isLocked && (
        <video
          src={videoUrl}
          controls
          className="w-full h-full bg-black rounded-md"
          onEnded={onEnd}
          onCanPlay={() => setIsReady(true)}
        />
      )}
    </div>
  )
}
