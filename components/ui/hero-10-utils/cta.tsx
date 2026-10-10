import * as React from "react"
import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface CtaProps {
  ctaEnabled?: boolean
  text: string
  link?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  onClick?: () => void
}

export function Cta({ cta, className }: { cta: CtaProps; className?: string }) {
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
