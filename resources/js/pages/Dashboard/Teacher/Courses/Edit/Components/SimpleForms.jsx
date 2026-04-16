import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Pencil } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Editor } from "@/Components/Editor";
import { Preview } from "@/Components/Preview";

export const TitleForm = ({ initialData, courseId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialData.title);
  const [isLoading, setIsLoading] = useState(false);

  const toggleEdit = () => setIsEditing((c) => !c);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    router.patch(`/teacher/courses/${courseId}`, { title }, {
      preserveScroll: true,
      onSuccess: () => {
        setIsLoading(false);
        toggleEdit();
      },
      onError: () => setIsLoading(false)
    });
  };

  return (
    <div className="mt-6 border bg-[#d9dfd3] rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Título del curso
        <Button onClick={toggleEdit} variant="ghost" className="bg-white hover:bg-[#889b76] hover:text-white">
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
            placeholder="Ej. 'Curso Nuevo'" 
            className="bg-white" 
            required 
          />
          <Button disabled={!title || isLoading} type="submit">Guardar</Button>
        </form>
      )}
    </div>
  );
};

export const DescriptionForm = ({ initialData, courseId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(initialData.description || "");
  const [isLoading, setIsLoading] = useState(false);

  const toggleEdit = () => setIsEditing((c) => !c);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    router.patch(`/teacher/courses/${courseId}`, { description }, {
      preserveScroll: true,
      onSuccess: () => {
        setIsLoading(false);
        toggleEdit();
      },
      onError: () => setIsLoading(false)
    });
  };

  return (
    <div className="mt-6 border bg-[#d9dfd3] rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Descripción del curso
        <Button onClick={toggleEdit} variant="ghost" className="bg-white hover:bg-[#889b76] hover:text-white">
          {isEditing ? "Cancelar" : <><Pencil className="h-4 w-4 mr-2" /> Editar descripción</>}
        </Button>
      </div>
      {!isEditing && (
        <div className={`text-sm mt-2 ${!initialData.description ? "text-slate-500 italic" : ""}`}>
          {!initialData.description ? "Sin descripción" : (
            <Preview value={initialData.description} />
          )}
        </div>
      )}
      {isEditing && (
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
          <Editor 
            value={description}
            onChange={(val) => setDescription(val)}
          />
          <Button disabled={!description || isLoading} type="submit">Guardar</Button>
        </form>
      )}
    </div>
  );
};

export const PriceForm = ({ initialData, courseId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [price, setPrice] = useState(initialData.price || "");
  const [isLoading, setIsLoading] = useState(false);

  const toggleEdit = () => setIsEditing((c) => !c);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    router.patch(`/teacher/courses/${courseId}`, { price: parseFloat(price) }, {
      preserveScroll: true,
      onSuccess: () => {
        setIsLoading(false);
        toggleEdit();
      },
      onError: () => setIsLoading(false)
    });
  };

  const formatPrice = (p) => new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(p);

  return (
    <div className="mt-6 border bg-[#d9dfd3] rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Precio del curso
        <Button onClick={toggleEdit} variant="ghost" className="bg-white hover:bg-[#889b76] hover:text-white">
          {isEditing ? "Cancelar" : <><Pencil className="h-4 w-4 mr-2" /> Editar precio</>}
        </Button>
      </div>
      {!isEditing && (
        <p className={`text-sm mt-2 ${!initialData.price && "text-slate-500 italic"}`}>
          {initialData.price ? formatPrice(initialData.price) : "Sin precio"}
        </p>
      )}
      {isEditing && (
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
          <Input 
            type="number" 
            step="0.01" 
            disabled={isLoading} 
            value={price} 
            onChange={e => setPrice(e.target.value)} 
            placeholder="Ej. 199.99" 
            className="bg-white" 
            required 
          />
          <Button disabled={!price || isLoading} type="submit">Guardar</Button>
        </form>
      )}
    </div>
  );
};
