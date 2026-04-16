import React from "react";
import { CategoryItem } from "./CategoryItem";
import {
  FcLandscape,
  FcBiomass,
  FcConferenceCall,
  FcLike,
  FcInspection,
  FcHome,
  FcGlobe,
} from "react-icons/fc";

const iconMap = {
  "Ecoturismo": FcLandscape,
  "Agroturismo": FcBiomass,
  "Turismo Comunitario": FcConferenceCall,
  "Solidario": FcLike,
  "Responsable": FcInspection,
  "Rural Sostenible": FcHome,
};

export const Categories = ({ items }) => {
    return ( 
        <div className="flex items-center gap-x-2 overflow-x-auto pb-2 scrollbar-hide shrink-0">
            {items.map((item) => (
                <CategoryItem
                    key={item.id}
                    label={item.name}
                    icon={iconMap[item.name] || FcGlobe}
                    value={item.id}   
                />
            ))}
        </div>
    );
};
