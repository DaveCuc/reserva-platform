import { Link } from "@inertiajs/react";
import { BookOpen } from "lucide-react";

// Simplificación de IconBadge orginal
export const IconBadge = ({ icon: Icon, size = "default", variant = "default" }) => (
    <div className="rounded-full p-2 bg-sky-100 flex items-center justify-center">
        <Icon className="text-sky-700" size={16} />
    </div>
);

// Simplificación del CourseProgress (Próximamente se integrará el componente Progress de Shadcn)
export const CourseProgress = ({ value, variant, size }) => (
    <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
        <div className="bg-sky-700 h-2 rounded-full" style={{ width: `${value}%` }}></div>
    </div>
);

export const formatPrice = (price) => {
    return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN"
    }).format(price);
}

export const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
}) => {
  return (
    <Link href={`/courses/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full bg-white">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <img
            className="object-cover w-full h-full"
            alt={title}
            src={imageUrl || "https://picsum.photos/seed/course/800/600"}
          />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2 text-black">
            {title}
          </div>
          <p className="text-xs text-slate-500">
            {category}
          </p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={BookOpen} />
              <span>
                {chaptersLength} {chaptersLength === 1 ? "Capítulo" : "Capítulos"}
              </span>
            </div>
          </div>
          {progress !== null ? (
            <CourseProgress
              variant={progress === 100 ? "success" : "default"}
              size="sm"
              value={progress}
            />
          ) : (
            <p className="text-md font-medium text-slate-700">
              {formatPrice(price || 0)}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
