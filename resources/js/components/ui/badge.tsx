import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium w-fit whitespace-nowrap shrink-0 transition-all duration-200 [&>svg]:size-3 [&>svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "badge-section-1",
        primary: "badge-section-1",
        "section-1": "badge-section-1",
        "section-2": "badge-section-2",
        "section-3": "badge-section-3",
        "section-4": "badge-section-4",
        secondary: "bg-slate-800/50 text-slate-300 border border-white/10",
        destructive: "badge-red",
        success: "badge-green",
        warning: "badge-yellow",
        info: "badge-blue",
        outline: "bg-transparent border-white/20 text-slate-300 hover:bg-white/5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }