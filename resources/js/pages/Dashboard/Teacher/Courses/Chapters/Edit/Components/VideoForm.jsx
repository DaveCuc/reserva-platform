import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Pencil, PlusCircle, Video } from "lucide-react";
import { Button } from "@/Components/ui/button";

export const ChapterVideoForm = ({ initialData, courseId, chapterId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { data, setData, post, progress, processing, errors, reset, clearErrors } = useForm({
    video: null,
  });

  const toggleEdit = () => {
    setIsEditing((current) => !current);
    if (isEditing) {
      reset();
      clearErrors();
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!data.video) return;

    post(`/teacher/courses/${courseId}/chapters/${chapterId}/video`, {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        toggleEdit();
      },
    });
  };

  return (
    <div className="mt-6 border bg-[#d9dfd3] rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Video del capítulo
        <Button onClick={toggleEdit} variant="ghost" className="bg-white hover:bg-[#889b76] hover:text-white">
          {isEditing && <>Cancelar</>}
          {!isEditing && !initialData.video_url && (
            <><PlusCircle className="h-4 w-4 mr-2" /> Agregar video</>
          )}
          {!isEditing && initialData.video_url && (
            <><Pencil className="h-4 w-4 mr-2" /> Cambiar video</>
          )}
        </Button>
      </div>

      {!isEditing && (
        !initialData.video_url ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 mt-2 rounded-md">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <video
              controls
              controlsList="nodownload"
              preload="metadata"
              className="object-cover rounded-md w-full h-full bg-black"
              src={initialData.video_url}
            />
          </div>
        )
      )}

      {isEditing && (
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
           {errors.video && <div className="text-red-600 text-sm font-semibold bg-red-100 p-2 rounded-md">{errors.video}</div>}
           <input 
              type="file"
              accept="video/mp4,video/x-m4v,video/*"
              onChange={e => setData('video', e.target.files[0])}
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#889b76] file:text-white hover:file:bg-[#6e7d60] cursor-pointer"
           />
           <Button disabled={!data.video || processing} type="submit">Guardar Video</Button>
           <div className="text-xs text-muted-foreground mt-4">
             Sube el video de este capítulo (MP4 recomendado).
           </div>
        </form>
      )}
    </div>
  );
};
