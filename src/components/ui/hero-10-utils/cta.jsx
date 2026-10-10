import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Cta({ cta, className }) {
  if (!cta || cta.ctaEnabled === false) return null

  const content = (
    <Button
      variant={cta.variant ?? "default"}
      size={cta.size ?? "default"}
      onClick={cta.onClick}
      className={cn("transition-all duration-300", className, cta.className)}
    >
      {cta.text}
    </Button>
  )

  if (cta.link) {
    return (
      <a href={cta.link} className="inline-block">
        {content}
      </a>
    )
  }

  return content
}

export default Cta
