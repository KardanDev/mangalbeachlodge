import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  const isTime = type === "time"

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // base styles
        "h-10 w-full min-w-0 text-sm outline-none transition",

        // default (your clean boxed style)
        "rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3",
        "focus:outline-none focus:ring-0",
        "dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300",

        // 👉 time-specific overrides
        isTime &&
        [
          "appearance-none",
          "[&::-webkit-calendar-picker-indicator]:hidden",
          "[&::-webkit-calendar-picker-indicator]:appearance-none",
          "[&::-webkit-datetime-edit]:px-0",
          "[&::-webkit-datetime-edit-fields-wrapper]:flex",
          "[&::-webkit-datetime-edit-hour-field]:bg-transparent",
          "[&::-webkit-datetime-edit-minute-field]:bg-transparent",
          "[&::-webkit-datetime-edit-ampm-field]:bg-transparent",
        ],

        className
      )}
      {...props}
    />
  )
}

export { Input }