import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-amber-500 text-white hover:bg-amber-600 shadow-md font-bold tracking-wide border border-amber-400/40",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 shadow-sm",
        outline:
          "border border-neutral-300 dark:border-neutral-700 bg-white/50 dark:bg-neutral-900/50 hover:bg-white dark:hover:bg-neutral-800 text-neutral-900 dark:text-white hover:text-amber-500 dark:hover:text-amber-400 font-semibold shadow-sm",
        secondary:
          "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700",
        ghost: "hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white",
        link: "text-amber-500 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2 rounded-full",
        sm: "h-9 rounded-full px-3.5 text-xs",
        lg: "h-12 rounded-full px-8 text-sm font-bold",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
export default Button
