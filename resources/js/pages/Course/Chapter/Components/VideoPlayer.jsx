import React, { useState } from "react";
import { Lock } from "lucide-react";
import { router } from "@inertiajs/react";
import { useConfettiStore } from "@/hooks/use-confetti-store";

export const VideoPlayer = ({ chapterId, title, courseId, nextChapterId, isLocked, completeOnEnd, videoUrl }) => {
  const confetti = useConfettiStore();
  const [isReady, setIsReady] = useState(false);

  const onEnd = () => {
    if (completeOnEnd) {
      router.put(`/courses/${courseId}/chapters/${chapterId}/progress`, {
        isCompleted: true,
      }, {
        onSuccess: () => {
          if (!nextChapterId) {
            confetti.onOpen();
          } else {
            router.visit(`/courses/${courseId}/chapters/${nextChapterId}`);
          }
        }
      });
    }
  }

  return (
    <div className="relative aspect-video rounded-md overflow-hidden bg-black">
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-brand-text flex-col gap-y-2">
          <Lock className="h-8 w-8 text-white" />
          <p className="text-sm text-white font-medium">Este capítulo está bloqueado.</p>
          <p className="text-xs text-white/70">Inscríbete para acceder al contenido.</p>
        </div>
      )}
      {!isLocked && (
        <video 
           src={videoUrl}
           className="w-full h-full object-cover"
           controls
           controlsList="nodownload"
           onEnded={onEnd}
           onCanPlay={() => setIsReady(true)}
        />
      )}
    </div>
  )
};
