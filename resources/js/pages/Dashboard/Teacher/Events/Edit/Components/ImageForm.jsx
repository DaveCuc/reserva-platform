import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Pencil, PlusCircle, ImageIcon } from "lucide-react";
import { Button } from "@/Components/ui/button";

export const ImageForm = ({ initialData, articleId, label = "Imagen", endpoint, field = "image_url" }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    router.post(endpoint, {
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

  const currentImageUrl = initialData[field];

  return (
    <div className="mt-6 border bg-brand-pale rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        {label}
        <Button onClick={toggleEdit} variant="ghost" className="bg-white hover:bg-brand-soft hover:text-white">
          {isEditing && <>Cancelar</>}
          {!isEditing && !currentImageUrl && (
            <><PlusCircle className="h-4 w-4 mr-2" /> Agregar imagen</>
          )}
          {!isEditing && currentImageUrl && (
            <><Pencil className="h-4 w-4 mr-2" /> Editar imagen</>
          )}
        </Button>
      </div>

      {!isEditing && (
        !currentImageUrl ? (
          <div className="flex items-center justify-center h-60 bg-brand-pale mt-2 rounded-md">
            <ImageIcon className="h-10 w-10 text-brand-ink" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <img
              alt="Upload"
              className="object-cover rounded-md w-full h-full"
              src={currentImageUrl}
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
        </form>
      )}
    </div>
  );
};
