import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Pencil, PlusCircle, ImageIcon } from "lucide-react";
import { Button } from "@/Components/ui/button";

export const ImageForm = ({ initialData, courseId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    // Laravel procesará esto como un POST normal porque web.php define Route::post()
    router.post(`/teacher/courses/${courseId}/image`, {
      image: file,
    }, {
      preserveScroll: true,
      onSuccess: () => {
        setIsLoading(false);
        setFile(null);
        toggleEdit();
      },
      onError: () => setIsLoading(false)
    });
  };

  return (
    <div className="mt-6 border bg-brand-pale rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Imagen del curso
        <Button onClick={toggleEdit} variant="ghost" className="bg-white hover:bg-brand-soft hover:text-white">
          {isEditing && <>Cancelar</>}
          {!isEditing && !initialData.image_url && (
            <><PlusCircle className="h-4 w-4 mr-2" /> Agregar imagen</>
          )}
          {!isEditing && initialData.image_url && (
            <><Pencil className="h-4 w-4 mr-2" /> Editar imagen</>
          )}
        </Button>
      </div>

      {!isEditing && (
        !initialData.image_url ? (
          <div className="flex items-center justify-center h-60 bg-brand-pale mt-2 rounded-md">
            <ImageIcon className="h-10 w-10 text-brand-ink" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <img
              alt="Upload"
              className="object-cover rounded-md w-full h-full"
              src={initialData.image_url}
            />
          </div>
        )
      )}

      {isEditing && (
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
           <input 
              type="file"
              accept="image/*"
              onChange={e => setFile(e.target.files[0])}
                 className="w-full text-sm text-brand-ink file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-brand-soft file:text-white hover:file:bg-brand-dark cursor-pointer"
           />
           <Button disabled={!file || isLoading} type="submit">Guardar Imagen</Button>
           <div className="text-xs text-muted-foreground mt-4">
             Se recomienda una relación de aspecto de 16:9
           </div>
        </form>
      )}
    </div>
  );
};
