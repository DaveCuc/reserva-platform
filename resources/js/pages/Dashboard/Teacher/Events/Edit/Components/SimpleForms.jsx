import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Pencil } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Editor } from "@/Components/Editor";
import { Preview } from "@/Components/Preview";

export const TitleForm = ({ initialData, articleId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialData.title);
  const [isLoading, setIsLoading] = useState(false);

  const toggleEdit = () => setIsEditing((c) => !c);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    router.patch(`/teacher/articles/${articleId}`, { title }, {
      preserveScroll: true,
      onSuccess: () => {
        setIsLoading(false);
        toggleEdit();
      },
      onError: () => setIsLoading(false)
    });
  };

  return (
    <div className="mt-6 border bg-brand-pale rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Título del artículo
        <Button onClick={toggleEdit} variant="ghost" className="bg-white hover:bg-brand-soft hover:text-white">
          {isEditing ? "Cancelar" : <><Pencil className="h-4 w-4 mr-2 " /> Editar título</>}
        </Button>
      </div>
      {!isEditing && <p className="text-sm mt-2">{initialData.title}</p>}
      {isEditing && (
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
          <Input 
            disabled={isLoading} 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            placeholder="Ej. 'Turismo en Oaxaca'" 
            className="bg-white" 
            required 
          />
          <Button disabled={!title || isLoading} type="submit">Guardar</Button>
        </form>
      )}
    </div>
  );
};

export const ShortDescriptionForm = ({ initialData, articleId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [shortDescription, setShortDescription] = useState(initialData.short_description || "");
  const [isLoading, setIsLoading] = useState(false);

  const toggleEdit = () => setIsEditing((c) => !c);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    router.patch(`/teacher/articles/${articleId}`, { short_description: shortDescription }, {
      preserveScroll: true,
      onSuccess: () => {
        setIsLoading(false);
        toggleEdit();
      },
      onError: () => setIsLoading(false)
    });
  };

  return (
    <div className="mt-6 border bg-brand-pale rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Descripción corta (Max. 200)
        <Button onClick={toggleEdit} variant="ghost" className="bg-white hover:bg-brand-soft hover:text-white">
          {isEditing ? "Cancelar" : <><Pencil className="h-4 w-4 mr-2" /> Editar descripción corta</>}
        </Button>
      </div>
      {!isEditing && (
        <div className={`text-sm mt-2 ${!initialData.short_description ? "text-brand-ink italic" : ""}`}>
          {!initialData.short_description ? "Sin descripción" : initialData.short_description}
        </div>
      )}
      {isEditing && (
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
          <Textarea 
            disabled={isLoading} 
            value={shortDescription} 
            onChange={e => setShortDescription(e.target.value)} 
            placeholder="Escribe un resumen aquí..." 
            className="bg-white resize-none" 
            maxLength={200}
            required 
          />
          <div className="text-xs text-brand-ink flex justify-end">
             {shortDescription.length}/200
          </div>
          <Button disabled={!shortDescription || shortDescription.length > 200 || isLoading} type="submit">Guardar</Button>
        </form>
      )}
    </div>
  );
};

export const ContentForm = ({ initialData, articleId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(initialData.content || "");
  const [isLoading, setIsLoading] = useState(false);

  const toggleEdit = () => setIsEditing((c) => !c);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    router.patch(`/teacher/articles/${articleId}`, { content }, {
      preserveScroll: true,
      onSuccess: () => {
        setIsLoading(false);
        toggleEdit();
      },
      onError: () => setIsLoading(false)
    });
  };

  return (
    <div className="mt-6 border bg-brand-pale rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Contenido del artículo
        <Button onClick={toggleEdit} variant="ghost" className="bg-white hover:bg-brand-soft hover:text-white">
          {isEditing ? "Cancelar" : <><Pencil className="h-4 w-4 mr-2" /> Editar contenido</>}
        </Button>
      </div>
      {!isEditing && (
        <div className={`text-sm mt-2 ${!initialData.content ? "text-brand-ink italic" : ""}`}>
          {!initialData.content ? "Sin contenido" : (
            <Preview value={initialData.content} />
          )}
        </div>
      )}
      {isEditing && (
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
          <Editor 
            value={content}
            onChange={(val) => setContent(val)}
          />
          <Button disabled={!content || isLoading} type="submit">Guardar</Button>
        </form>
      )}
    </div>
  );
};
