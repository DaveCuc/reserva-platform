import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Pencil } from "lucide-react";
import { Button } from "@/Components/ui/button";

export const CategoryForm = ({ initialData, articleId, options }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [categoryId, setCategoryId] = useState(initialData.category_id || "");
  const [isLoading, setIsLoading] = useState(false);

  const toggleEdit = () => setIsEditing((c) => !c);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    router.patch(`/teacher/articles/${articleId}`, { category_id: categoryId }, {
      preserveScroll: true,
      onSuccess: () => {
        setIsLoading(false);
        toggleEdit();
      },
      onError: () => setIsLoading(false)
    });
  };

  const selectedOption = options.find((o) => String(o.value) === String(initialData.category_id));

  return (
    <div className="mt-6 border bg-brand-pale rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Categoría del artículo
        <Button onClick={toggleEdit} variant="ghost" className="bg-white hover:bg-brand-soft hover:text-white">
          {isEditing ? "Cancelar" : <><Pencil className="h-4 w-4 mr-2" /> Editar categoría</>}
        </Button>
      </div>
      {!isEditing && (
        <p className={`text-sm mt-2 ${!initialData.category_id ? "text-brand-ink italic" : ""}`}>
          {selectedOption ? selectedOption.label : "Sin categoría"}
        </p>
      )}
      {isEditing && (
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
          <select 
            disabled={isLoading} 
            value={categoryId} 
            onChange={e => setCategoryId(e.target.value)} 
            className="w-full rounded-md border border-brand-soft bg-white p-2 text-sm"
            required 
          >
             <option value="" disabled>Selecciona una categoría...</option>
             {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
             ))}
          </select>
          <Button disabled={!categoryId || isLoading} type="submit">Guardar</Button>
        </form>
      )}
    </div>
  );
};
