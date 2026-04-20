import React from "react";
import { Link } from "@inertiajs/react";
import { BookOpen } from "lucide-react";
import { IconBadge } from "@/Components/icon-badge";

export const CourseCard = ({ id, title, imageUrl, chaptersLength, price, progress, category }) => {
  const formatPrice = (p) => new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(p);

  const resolveImageUrl = (url) => {
    if (!url) return '/logo.svg';
    if (url.startsWith('http') || url.startsWith('https')) return url;
    if (url.startsWith('/')) return url; // Fotos legacy de NextJS (/Fotos/Foto.jpg)
    return `/storage/${url}`; // Archivos subidos localmente a Storage en este nuevo sistema
  };

  return (
    <Link href={`/courses/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden bg-brand-pale flex items-center justify-center">
          <img 
            className="object-cover w-full h-full" 
            alt={title} 
            src={resolveImageUrl(imageUrl)} 
            onError={(e) => { e.target.onerror = null; e.target.src = '/logo.svg'; }} 
          />
        </div>
        <div className="flex flex-col pt-2 h-32">
          <div className="text-lg md:text-base font-medium group-hover:text-brand-text transition line-clamp-2">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">{category}</p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-brand-ink">
              <IconBadge size="sm" icon={BookOpen} />
              <span>{chaptersLength} {chaptersLength === 1 ? "Capítulo" : "Capítulos"}</span>
            </div>
          </div>
          
          <div className="mt-auto">
            {progress !== null ? (
              <div className="w-full">
                 <p className="text-xs font-semibold text-emerald-700">{Math.round(progress)}% Completado</p>
                 <div className="w-full bg-brand-soft rounded-full h-1.5 mt-1 overflow-hidden">
                   <div className="bg-emerald-700 h-1.5 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
                 </div>
              </div>
            ) : (
              <p className="text-md md:text-sm font-semibold text-brand-text">
                {price === 0 || price === null ? "Gratis" : formatPrice(price)}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
