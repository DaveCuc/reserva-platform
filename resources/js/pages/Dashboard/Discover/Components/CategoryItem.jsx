import React from "react";
import qs from "query-string";
import { Button } from "@/Components/ui/button";
import { cn } from "@/lib/utils";
import { router, usePage } from "@inertiajs/react";

export const CategoryItem = ({ label, value, icon: Icon, isSpecial }) => {
    const { filters } = usePage().props;
    const currentCategory = filters?.categoryId;
    const currentTitle = filters?.title;

    const isSelected = value === null 
        ? (!currentCategory || currentCategory === 'null')
        : currentCategory === value;

    const onClick = () => {
        const url = qs.stringifyUrl({
            url: "/discover",
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
                "py-2 px-5 text-sm rounded-full flex items-center gap-x-1 transition",
                isSpecial ? "bg-brand text-white border-brand hover:bg-brand-dark" : "border border-brand-soft hover:bg-brand-pale",
                isSelected && (isSpecial ? "ring-2 ring-offset-2 ring-brand" : "bg-brand-text text-white hover:bg-brand-text/80 border-brand-text")
            )}
            type="button"
        >
            {Icon && <Icon size={isSpecial ? 20 : 24} className={isSpecial ? "mr-1" : ""} />}
            <div className="truncate">
                {label}
            </div>
        </Button>
    )
};
