import React from "react";
import { BookOpen } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Badge } from "@/Components/ui/badge";

export const ArticleCover = ({ imageUrl, title, categoryName, publishedAt, userName }) => {
    return (
        <div className="relative w-full h-[40vh] md:h-[50vh] bg-black rounded-2xl overflow-hidden shadow-sm">
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt={title}
                    className="object-cover w-full h-full opacity-60"
                />
            ) : (
                <div className="w-full h-full bg-brand-dark flex items-center justify-center opacity-60">
                    <BookOpen className="h-16 w-16 text-brand-mint" />
                </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
                <div className="flex items-center gap-x-2 mb-4">
                    <Badge variant="outline" className="bg-brand-dark border-brand-mint text-brand-mint">
                        {categoryName || "General"}
                    </Badge>
                    <span className="text-sm text-white/90 font-medium">
                        {publishedAt ? format(new Date(publishedAt), "dd MMM yyyy", { locale: es }) : "Publicado recientemente"}
                    </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-white max-w-4xl leading-tight">
                    {title}
                </h1>
                <div className="flex items-center gap-x-3 mt-4 text-sm">
                    <div className="h-8 w-8 rounded-full bg-brand-mint flex items-center justify-center text-brand-dark font-bold">
                        {userName?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="font-semibold text-brand-mint">Por {userName}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
