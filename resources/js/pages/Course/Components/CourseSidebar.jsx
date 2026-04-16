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
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive && "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700",
        isCompleted && "text-[#43570e] hover:text-[#43570e]",
        isCompleted && isActive && "bg-[#eafee0]/50"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon 
          size={22} 
          className={cn(
            "text-slate-500", 
            isActive && "text-slate-700", 
            isCompleted && "text-[#43570e]"
          )} 
        />
        {label}
      </div>
      <div 
        className={cn(
          "ml-auto opacity-0 border-2 border-slate-700 h-full transition-all", 
          isActive && "opacity-100", 
          isCompleted && "border-[#43570e]"
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
               <p className="text-sm font-medium mb-2 text-[#43570e]">
                 {progressCount}% Completado
               </p>
               <div className="w-full bg-slate-200 rounded-full h-2">
                 <div 
                   className="bg-[#43570e] h-2 rounded-full transition-all" 
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
