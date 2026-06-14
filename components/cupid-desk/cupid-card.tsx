import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { HeartCorner } from "./heart-decoration";

const cupidCardVariants = cva("relative overflow-hidden rounded-2xl transition-shadow", {
  variants: {
    variant: {
      default:
        "border border-cupid-border/60 bg-white shadow-sm shadow-cupid-primary/5",
      elevated:
        "border border-cupid-border/40 bg-white shadow-md shadow-cupid-primary/10 hover:shadow-lg hover:shadow-cupid-primary/15",
      gradient:
        "border border-cupid-border/30 bg-gradient-to-br from-white via-cupid-background to-cupid-secondary/20 shadow-sm",
      glass:
        "border border-white/60 bg-white/70 shadow-sm backdrop-blur-md",
      accent:
        "border border-cupid-border/50 border-l-4 border-l-cupid-primary bg-white shadow-sm",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface CupidCardProps
  extends React.ComponentProps<typeof Card>,
    VariantProps<typeof cupidCardVariants> {
  heartCorner?: boolean;
}

function CupidCard({
  className,
  variant = "default",
  heartCorner = false,
  children,
  ...props
}: CupidCardProps) {
  return (
    <Card
      className={cn(cupidCardVariants({ variant }), className)}
      {...props}
    >
      {heartCorner && <HeartCorner position="top-right" />}
      {children}
    </Card>
  );
}

function CupidCardHeader({
  className,
  ...props
}: React.ComponentProps<typeof CardHeader>) {
  return (
    <CardHeader
      className={cn("[--card-spacing:--spacing(5)]", className)}
      {...props}
    />
  );
}

function CupidCardTitle({
  className,
  ...props
}: React.ComponentProps<typeof CardTitle>) {
  return (
    <CardTitle
      className={cn("text-cupid-foreground", className)}
      {...props}
    />
  );
}

function CupidCardDescription({
  className,
  ...props
}: React.ComponentProps<typeof CardDescription>) {
  return (
    <CardDescription
      className={cn("text-cupid-muted-foreground", className)}
      {...props}
    />
  );
}

function CupidCardContent({
  className,
  ...props
}: React.ComponentProps<typeof CardContent>) {
  return <CardContent className={className} {...props} />;
}

function CupidCardFooter({
  className,
  ...props
}: React.ComponentProps<typeof CardFooter>) {
  return (
    <CardFooter
      className={cn("border-cupid-border/40 bg-cupid-background/50", className)}
      {...props}
    />
  );
}

export {
  CupidCard,
  CupidCardHeader,
  CupidCardTitle,
  CupidCardDescription,
  CupidCardContent,
  CupidCardFooter,
  CardAction as CupidCardAction,
  cupidCardVariants,
};
