import { LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// 1. Variantes para el FONDO (Background)
const backgroundVariants = cva(
  "rounded-full flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-[#AAB88D80]",
        success: "bg-emerald-100",
      },
      size: {
        default: "p-2",
        sm: "p-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// 2. Variantes para el ÍCONO (Color e imagen)
const iconVariants = cva(
  "",
  {
    variants: {
      variant: {
        default: "text-[#405352]",
        success: "text-emerald-700",
      },
      size: {
        default: "h-8 w-8",
        sm: "h-4 w-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// 3. Tipado de Props
type BackgroundVariantsProps = VariantProps<typeof backgroundVariants>;
type IconVariantsProps = VariantProps<typeof iconVariants>;

interface IconBadgeProps extends BackgroundVariantsProps, IconVariantsProps {
  icon: LucideIcon;
}

// 4. Componente Final
export const IconBadge = ({
  icon: Icon,
  variant,
  size,
}: IconBadgeProps) => {
  return (
    <div className={cn(backgroundVariants({ variant, size }))}>
      <Icon className={cn(iconVariants({ variant, size }))} />
    </div>
  );
};