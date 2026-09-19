import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-2xl border px-4 py-4 text-sm flex items-start gap-3",
  {
    variants: {
      variant: {
        default: "glass-card border-white/10 text-white",
        destructive: "glass-card border-rose-500/30 bg-rose-500/5 text-rose-300",
        success: "glass-card border-emerald-500/30 bg-emerald-500/5 text-emerald-300",
        warning: "glass-card border-amber-500/30 bg-amber-500/5 text-amber-300",
        info: "glass-card border-blue-500/30 bg-blue-500/5 text-blue-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "font-semibold text-white",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-slate-400 leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }