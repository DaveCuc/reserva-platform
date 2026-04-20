import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { PlusCircle, File, Loader2, X } from "lucide-react";
import { Button } from "@/Components/ui/button";

export const AttachmentForm = ({ initialData, courseId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleEdit = () => setIsEditing((c) => !c);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    router.post(`/teacher/courses/${courseId}/attachments`, {
      attachment: file,
      name: file.name
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

  const onDelete = (id) => {
    setDeletingId(id);
    router.delete(`/teacher/courses/${courseId}/attachments/${id}`, {
      preserveScroll: true,
      onFinish: () => setDeletingId(null),
    });
  };

  return (
    <div className="mt-6 border bg-brand-pale rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Archivos del curso
        <Button onClick={toggleEdit} variant="ghost" className="bg-white hover:bg-brand-soft hover:text-white">
          {isEditing ? <>Cancelar</> : <><PlusCircle className="h-4 w-4 mr-2" /> Agregar archivo</>}
        </Button>
      </div>

      {!isEditing && (
        <>
          {(!initialData.attachments || initialData.attachments.length === 0) && (
            <p className="text-sm mt-2 text-brand-ink italic">No hay recursos adjuntos aún.</p>
          )}
          {initialData.attachments?.length > 0 && (
            <div className="space-y-2 mt-2">
              {initialData.attachments.map((attachment) => (
                <div key={attachment.id} className="flex items-center p-3 w-full bg-white border-brand-soft border text-brand-ink rounded-md">
                  <File className="h-4 w-4 mr-2 shrink-0" />
                  <p className="text-xs line-clamp-1">{attachment.name}</p>
                  {deletingId === attachment.id ? (
                    <div className="ml-auto">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  ) : (
                    <button onClick={() => onDelete(attachment.id)} className="ml-auto hover:opacity-75 transition">
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {isEditing && (
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
           <input 
              type="file"
              onChange={e => setFile(e.target.files[0])}
                 className="w-full text-sm text-brand-ink file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-brand-soft file:text-white hover:file:bg-brand-dark cursor-pointer"
           />
           <Button disabled={!file || isLoading} type="submit">Subir archivo</Button>
           <div className="text-xs text-muted-foreground mt-4">
            Agrega archivos relacionados con el curso, como PDFs, documentos o recursos adicionales.
          </div>
        </form>
      )}
    </div>
  );
};
