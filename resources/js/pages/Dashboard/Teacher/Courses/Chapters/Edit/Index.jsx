import React from "react";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import MainLayout from "@/Layouts/MainLayout";

import { ChapterTitleForm, ChapterDescriptionForm, ChapterAccessForm } from "./Components/SimpleForms";
import { ChapterVideoForm } from "./Components/VideoForm";
import { ChapterActions } from "./Components/Actions";

const IconBadge = ({ icon: Icon }) => (
  <div className="p-2 bg-[#eafee0] rounded-full mr-2">
    <Icon className="h-6 w-6 text-[#43570e]" />
  </div>
);

const Banner = ({ label, variant = "warning" }) => (
  <div className={`w-full p-4 text-center text-sm font-medium ${variant === 'warning' ? 'bg-yellow-400 text-yellow-900' : 'bg-green-500 text-white'}`}>
    {label}
  </div>
);

export default function ChapterEditor({ courseId, chapter }) {
  const requiredFields = [
    chapter.title,
    chapter.description,
    chapter.video_url,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <MainLayout>
      <Head title={`Editar Capítulo: ${chapter.title}`} />
      
      {!chapter.is_published && (
        <Banner label="Este capítulo no está publicado aún, no será visible para los estudiantes." variant="warning" />
      )}

      <div className="p-6 pb-20 max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${courseId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a la configuración del curso
            </Link>

            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-bold">Creación del capítulo</h1>
                <span className="text-sm text-slate-700">
                  Completa todos los campos {completionText}
                </span>
              </div>
              <ChapterActions 
                disabled={!isComplete} 
                courseId={courseId} 
                chapterId={chapter.id} 
                isPublished={chapter.is_published} 
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          {/* Columna Izquierda */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl font-semibold">Personaliza tu capítulo</h2>
              </div>
              <ChapterTitleForm initialData={chapter} courseId={courseId} chapterId={chapter.id} />
              <ChapterDescriptionForm initialData={chapter} courseId={courseId} chapterId={chapter.id} />
            </div>
            
            <div>
              <div className="flex items-center gap-x-2 mt-8">
                <IconBadge icon={Eye} />
                <h2 className="text-xl font-semibold">Configuración de acceso</h2>
              </div>
              <ChapterAccessForm initialData={chapter} courseId={courseId} chapterId={chapter.id} />
            </div>
          </div>

          {/* Columna Derecha */}
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h2 className="text-xl font-semibold">Agregar video</h2>
            </div>
            <ChapterVideoForm initialData={chapter} courseId={courseId} chapterId={chapter.id} /> 
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
