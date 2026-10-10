import React from "react"
import { Hero10 } from "@/components/ui/hero-10"

const values = {
  title: "Authentic Amritsari Kulchas",
  titleLine2Prefix: "& Golden Desi Ghee",
  titleHighlight: "Paranthas",
  description:
    "Crispy, layered tandoori kulchas baked fresh at 400°C in traditional clay ovens, served with slow-simmered Pindi choley and freshly churned white makhan in Mansarovar, Jaipur.",
  socialProof: "⭐ Rated 4.9/5 by 10,000+ Happy Diners in Jaipur • 100% Pure Veg",
  images: [
    "https://kulchakingparanthasingh.com/images/demo/gallery/gallery-01.jpg",
    "https://kulchakingparanthasingh.com/images/demo/gallery/gallery-02.jpg",
    "https://kulchakingparanthasingh.com/images/demo/gallery/gallery-05.jpg",
  ],
  imageAlts: [
    "Crispy Amritsari Kulcha with Choley",
    "Royal Paneer Tandoori Parantha",
    "Special Pede Wali Malai Lassi",
  ],
  animation: "subtle",
  primaryCTA: {
    ctaEnabled: true,
    text: "Order Online Menu",
    link: "menu.html",
    variant: "default",
    size: "lg",
  },
  secondaryCTA: {
    ctaEnabled: true,
    text: "Reserve a Table",
    link: "contact.html",
    variant: "outline",
    size: "lg",
  },
}

export default function Hero10Example() {
  return <Hero10 {...values} />
}
