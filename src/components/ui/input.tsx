import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full rounded-2xl bg-[#F2F3F7] border-0 px-4 py-3 text-sm",
        "focus-visible:ring-2 focus-visible:ring-blue-500/30 focus-visible:bg-white",
        "transition-all duration-200",
        className
      )}
      {...props}
    />
  )
}

export { Input }
