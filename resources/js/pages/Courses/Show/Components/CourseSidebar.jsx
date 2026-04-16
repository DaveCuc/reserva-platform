import { Link } from "@inertiajs/react";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { CourseProgress } from "@/Components/CourseCard"; // Simplificado del anterior

const CourseSidebarItem = ({ label, id, isCompleted, courseId, isLocked, isActive }) => {
  const Icon = isLocked ? Lock : (isCompleted ? CheckCircle : PlayCircle);

  return (
    <Link
      href={`/courses/${courseId}/chapters/${id}`}
      preserveState
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive && "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700",
        isCompleted && "text-emerald-700 hover:text-emerald-700",
        isCompleted && isActive && "bg-emerald-200/20",
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            "text-slate-500",
            isActive && "text-slate-700",
            isCompleted && "text-emerald-700"
          )}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
          isActive && "opacity-100",
          isCompleted && "border-emerald-700"
        )}
      />
    </Link>
  )
}

export const CourseSidebar = ({ course, progressCount, currentChapterId, purchase }) => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm bg-white">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">{course.title}</h1>
        {purchase && (
          <div className="mt-10">
            <CourseProgress value={progressCount} />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={Array.isArray(chapter.userProgress)
              ? !!chapter.userProgress.find((progress) => progress?.is_completed)
              : !!chapter.userProgress?.is_completed}
            courseId={course.id}
            isLocked={!chapter.is_free && !purchase}
            isActive={chapter.id === currentChapterId}
          />
        ))}
      </div>
    </div>
  )
}
