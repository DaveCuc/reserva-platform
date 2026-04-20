import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export const CourseSidebarItem = ({ label, id, isCompleted, courseId, isLocked }) => {
  const { url } = usePage();
  const Icon = isLocked ? Lock : (isCompleted ? CheckCircle : PlayCircle);
  const isActive = url.includes(id);

  return (
    <Link
      href={`/courses/${courseId}/chapters/${id}`}
      className={cn(
        "flex items-center gap-x-2 text-brand-ink text-sm font-[500] pl-6 transition-all hover:text-brand-text hover:bg-brand-soft/20",
        isActive && "text-brand-text bg-brand-soft/20 hover:bg-brand-soft/20 hover:text-brand-text",
        isCompleted && "text-brand-text hover:text-brand-text",
        isCompleted && isActive && "bg-brand-mint/50"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon 
          size={22} 
          className={cn(
            "text-brand-ink", 
            isActive && "text-brand-text", 
            isCompleted && "text-brand-text"
          )} 
        />
        {label}
      </div>
      <div 
        className={cn(
          "ml-auto opacity-0 border-2 border-brand-text h-full transition-all", 
          isActive && "opacity-100", 
          isCompleted && "border-brand-text"
        )} 
      />
    </Link>
  );
};

export const CourseSidebar = ({ course, progressCount, purchase }) => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm bg-white">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">{course.title}</h1>
        {purchase && (
          <div className="mt-10">
            <div className="w-full">
               <p className="text-sm font-medium mb-2 text-brand-text">
                 {progressCount}% Completado
               </p>
               <div className="w-full bg-brand-soft rounded-full h-2">
                 <div 
                   className="bg-brand-text h-2 rounded-full transition-all" 
                   style={{ width: `${progressCount}%` }}
                 ></div>
               </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.is_completed}
            courseId={course.id}
            isLocked={!chapter.is_free && !purchase}
          />
        ))}
      </div>
    </div>
  );
};
