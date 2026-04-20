import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const bannerVariants = cva(
  "w-full p-4 text-center text-sm font-medium",
  {
    variants: {
      variant: {
        warning: "bg-yellow-500/20 text-yellow-700 border-b border-yellow-500/30",
        success: "bg-emerald-500/20 text-emerald-700 border-b border-emerald-500/30",
        warningSolid: "bg-yellow-400 text-yellow-900",
        successSolid: "bg-emerald-700 text-white",
      }
    },
    defaultVariants: {
      variant: "warning",
    }
  }
);

interface BannerProps extends VariantProps<typeof bannerVariants> {
  label: string;
};

export const Banner = ({
  label,
  variant,
}: BannerProps) => {
  return <div className={cn(bannerVariants({ variant }))}>{label}</div>;
};