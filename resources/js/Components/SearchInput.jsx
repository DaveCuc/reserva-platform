import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import { useDebounce } from "@/hooks/use-debounce"; // Necesitamos asegurarnos que exista o lo creo

export const SearchInput = () => {
    const { filters } = usePage().props;
    const [value, setValue] = useState(filters?.title || "");
    const debouncedValue = useDebounce(value, 500); // 500ms
    const currentCategoryId = filters?.categoryId || null;

    useEffect(() => {
        // Enviar la busqueda via Inertia (sin ensuciar historial)
        const query = {};
        if (debouncedValue) query.title = debouncedValue;
        if (currentCategoryId) query.categoryId = currentCategoryId;

        router.get('/search', query, { preserveState: true, replace: true });
    }, [debouncedValue, currentCategoryId]);

    return ( 
        <div className="relative">
            <Search className="h-4 w-4 absolute top-3 left-3 text-brand-ink" />
            <Input
                onChange={(e) => setValue(e.target.value)}
                value={value}
                className="w-full md:w-[300px] pl-9 rounded-full bg-brand-pale focus-visible:ring-brand-ring"
                placeholder="Buscar experiencia..."
            />
        </div>
    );
};
