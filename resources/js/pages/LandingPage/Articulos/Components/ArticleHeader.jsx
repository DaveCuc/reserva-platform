import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Badge } from "@/Components/ui/badge";

export const ArticleHeader = ({ title, categoryName, publishedAt, userName }) => {
    return (
        <div>
            <div className="flex items-center gap-x-2 mb-4">
                <Badge variant="outline" className="bg-brand-pale text-brand-ink">
                    {categoryName || "General"}
                </Badge>
                <span className="text-sm text-muted-foreground">
                    {publishedAt ? format(new Date(publishedAt), "dd MMM yyyy", { locale: es }) : "Publicado recientemente"}
                </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-brand-text">
                {title}
            </h1>
            <div className="flex items-center gap-x-3 text-sm text-brand-ink">
                <div className="h-10 w-10 rounded-full bg-brand-soft flex items-center justify-center text-white font-bold">
                    {userName?.charAt(0).toUpperCase()}
                </div>
                <div>
                    <p className="font-semibold text-brand-text">Por {userName}</p>
                </div>
            </div>
        </div>
    );
};
