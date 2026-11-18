import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex h-12 items-center justify-center gap-2 rounded-full border px-6 text-sm font-medium uppercase transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-graphite disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-graphite text-white shadow-[0_16px_36px_rgba(17,17,17,0.16)] hover:border-champagne/60 hover:bg-white hover:text-graphite hover:shadow-[0_22px_48px_rgba(214,195,165,0.22)]",
        ghost:
          "border-champagne/25 bg-white/45 text-graphite shadow-glass backdrop-blur-xl hover:border-champagne hover:bg-white/90 hover:shadow-[0_20px_42px_rgba(214,195,165,0.18)]",
        outline:
          "border-champagne/20 bg-white/70 text-graphite shadow-glass backdrop-blur-xl hover:border-champagne hover:bg-white hover:shadow-[0_15px_35px_rgba(214,195,165,0.12)]"
      },
      size: {
        default: "h-12 px-6",
        sm: "h-10 px-4 text-xs",
        lg: "h-14 px-8"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
