import React from "react";
import qs from "query-string";
import { Button } from "@/Components/ui/button";
import { cn } from "@/lib/utils";
import { router, usePage } from "@inertiajs/react";

export const CategoryItem = ({ label, value, icon: Icon }) => {
    const { filters } = usePage().props;
    const currentCategory = filters?.categoryId;
    const currentTitle = filters?.title;

    const isSelected = currentCategory === value;

    const onClick = () => {
        const url = qs.stringifyUrl({
            url: "/search",
            query: {
                title: currentTitle,
                categoryId: isSelected ? null : value,
            }
        }, { skipNull: true, skipEmptyString: true });
        
        router.visit(url, { preserveState: true, preserveScroll: true });    
    };

    return (
        <Button
            onClick={onClick}
            variant="outline"
            className={cn(
                "py-2 px-5 text-sm border border-brand-soft rounded-full flex items-center gap-x-1 transition hover:bg-brand-pale",
                isSelected && "bg-brand-text text-white hover:bg-brand-text/80 border-brand-text"
            )}
            type="button"
        >
            {Icon && <Icon size={24} />}
            <div className="truncate">
                {label}
            </div>
        </Button>
    )
};
