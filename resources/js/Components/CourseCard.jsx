import { Link } from "@inertiajs/react";
import { BookOpen } from "lucide-react";
import { IconBadge } from "@/Components/icon-badge";

// Simplificación del CourseProgress (Próximamente se integrará el componente Progress de Shadcn)
export const CourseProgress = ({ value, variant, size }) => (
  <div className="w-full bg-brand-pale rounded-full h-2 mt-2">
    <div className="bg-brand-dark h-2 rounded-full" style={{ width: `${value}%` }}></div>
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
          <div className="text-lg md:text-base font-medium group-hover:text-brand-dark transition line-clamp-2 text-brand-text">
            {title}
          </div>
          <p className="text-xs text-brand-ink">
            {category}
          </p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-brand-ink">
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
            <p className="text-md font-medium text-brand-dark">
              {formatPrice(price || 0)}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
