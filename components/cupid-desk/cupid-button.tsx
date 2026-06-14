import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cupidButtonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-transparent text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:ring-3 focus-visible:ring-cupid-accent/40 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 active:translate-y-px",
  {
    variants: {
      variant: {
        primary:
          "bg-cupid-primary text-white shadow-md shadow-cupid-primary/25 hover:bg-[#F03D72] hover:shadow-lg hover:shadow-cupid-primary/30",
        secondary:
          "bg-cupid-secondary text-cupid-foreground hover:bg-[#FFA0B0]",
        accent:
          "bg-cupid-accent text-white hover:bg-[#FF6B94]",
        outline:
          "border-cupid-primary/30 bg-white text-cupid-primary hover:border-cupid-primary hover:bg-cupid-background",
        ghost:
          "text-cupid-primary hover:bg-cupid-secondary/40",
        soft:
          "bg-cupid-background text-cupid-primary hover:bg-cupid-secondary/50",
        gradient:
          "bg-gradient-to-r from-cupid-primary to-cupid-accent text-white shadow-md shadow-cupid-primary/20 hover:opacity-95 hover:shadow-lg",
        destructive:
          "bg-red-50 text-red-600 hover:bg-red-100",
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-lg",
        default: "h-10 px-4",
        lg: "h-11 px-6 text-base",
        icon: "size-10",
        "icon-sm": "size-8 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface CupidButtonProps
  extends ButtonPrimitive.Props,
    VariantProps<typeof cupidButtonVariants> {}

function CupidButton({
  className,
  variant = "primary",
  size = "default",
  ...props
}: CupidButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="cupid-button"
      className={cn(cupidButtonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { CupidButton, cupidButtonVariants };
