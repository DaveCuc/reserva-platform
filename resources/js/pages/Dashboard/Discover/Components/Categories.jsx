import React from "react";
import { CategoryItem } from "./CategoryItem";
import {
    Briefcase,
    Globe,
    Leaf,
    Map,
    Utensils,
    Building,
    Camera,
    Music,
    Palette,
    TreePine
} from "lucide-react";

// Mapeo simple de nombres a iconos basados en el seed
const iconMap = {
    "Turismo de Aventura": TreePine,
    "Turismo Cultural": Palette,
    "Turismo Gastronómico": Utensils,
    "Turismo Ecológico": Leaf,
    "Turismo de Negocios": Briefcase,
    "Turismo de Salud": Globe,
    "Turismo Rural": Map,
    "Alojamiento": Building,
    "Entretenimiento": Music,
    "Fotografía": Camera,
};

export const Categories = ({ items }) => {
    return (
        <div className="flex items-center gap-x-2 overflow-x-auto pb-2 scrollbar-hide">
            {items.map((item) => (
                <CategoryItem
                    key={item.id}
                    label={item.name}
                    value={item.id}
                    icon={iconMap[item.name] || Globe}
                />
            ))}
        </div>
    );
};
