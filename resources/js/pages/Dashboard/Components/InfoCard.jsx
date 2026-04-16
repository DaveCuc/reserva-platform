import React from "react";
import { cn } from "@/lib/utils";

const IconBadge = ({ icon: Icon, variant }) => {
  return (
    <div className={cn(
      "rounded-full p-2 flex items-center justify-center",
      variant === "success" ? "bg-emerald-100 text-emerald-700" : "bg-sky-100 text-sky-700"
    )}>
      <Icon className="h-6 w-6" />
    </div>
  );
};

export const InfoCard = ({ numberOfItems, variant, label, icon: Icon }) => {
  return (
    <div className="border rounded-xl flex items-center gap-x-2 p-4 bg-white shadow-sm hover:shadow-md transition">
      <IconBadge variant={variant} icon={Icon} />
      <div className="ml-2">
        <p className="font-semibold text-slate-800 tracking-tight">{label}</p>
        <p className="text-gray-500 text-sm font-medium">
          {numberOfItems} {numberOfItems === 1 ? "Curso" : "Cursos"}
        </p>
      </div>
    </div>
  );
};
