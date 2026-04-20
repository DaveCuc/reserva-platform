"use client";

import { UploadCloud } from "lucide-react";
import { useCallback } from "react";
import { useDropzone , FileWithPath } from "react-dropzone";
import { toast } from "sonner";
import axios from "axios";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: "courseImage" | "courseAttachment" | "chapterVideo";
}

export const FileUpload = ({
  onChange,
  endpoint
}: FileUploadProps) => {
  
  // 1. Lógica para decidir qué archivos aceptar
  const getAcceptedFiles = () => {
    switch (endpoint) {
      case "courseImage":
        // Solo imágenes
        return { "image/*": [".jpg", ".jpeg", ".png", ".webp"] };
      case "chapterVideo":
        // Solo videos MP4
        return { "video/mp4": [".mp4", ".mkv"] };
      case "courseAttachment":
        // Todo (PDFs, zips, imagenes, etc)
        return undefined; 
      default:
        return undefined;
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    // Si el archivo no es válido, acceptedFiles estará vacío
    const file = acceptedFiles[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const promise = axios.post("/api/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    toast.promise(promise, {
      loading: "Subiendo archivo...",
      success: (res) => {
        onChange(res.data.url);
        return "Archivo subido correctamente";
      },
      error: "Error al subir el archivo",
    });

  }, [onChange]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({ 
    onDrop,
    maxFiles: 1,
    // 2. Aquí aplicamos la restricción
    accept: getAcceptedFiles(), 
  });

  // (Opcional) Mostrar mensaje si el usuario intenta subir algo incorrecto
  if (fileRejections.length > 0) {
     toast.error("Tipo de archivo no permitido");
  }
  return (
    <div 
      {...getRootProps()} 
      className="bg-white border-dashed border-2 border-brand-soft rounded-md p-10 cursor-pointer hover:bg-brand-pale/70 transition flex flex-col items-center justify-center gap-4 h-60"
    >
      <input {...getInputProps()} />
      <UploadCloud className="h-10 w-10 text-brand-ring" />
      <p className="text-sm text-brand-ring text-center">
        {isDragActive 
          ? "Suelta el archivo aquí..." 
: endpoint === "courseImage" ? "Sube una imagen (jpg, png)" : "Arrastra un archivo"}</p>
    </div>
  );
}