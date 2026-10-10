'use client'

import * as React from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import Balancer from 'react-wrap-balancer'

import { cn } from '@/lib/utils'
import { Cta, type CtaProps } from '@/components/ui/hero-10-utils/cta'

export interface Hero10Props {
  title: string
  titleLine2Prefix?: string
  titleHighlight?: string
  description: string
  socialProof?: string
  images: string[]
  imageAlts?: string[]
  animation?: 'none' | 'subtle'
  primaryCTA: CtaProps
  secondaryCTA?: CtaProps
  variant?: 'standard' | 'compact'
}

const variantStyles = {
  standard: {
    section: 'py-16 sm:py-24',
    title: 'text-3xl sm:text-5xl md:text-6xl',
    description: 'max-w-xl text-sm sm:text-base',
    header: 'gap-5',
    content: 'gap-8 sm:gap-10',
    fan: 'max-w-3xl',
    fanCard: 'aspect-4/5',
  },
  compact: {
    section: 'py-12 sm:py-16',
    title: 'text-2xl sm:text-4xl md:text-5xl',
    description: 'max-w-lg text-sm',
    header: 'gap-4',
    content: 'gap-6 sm:gap-8',
    fan: 'max-w-2xl',
    fanCard: 'aspect-4/5',
  },
} as const

const fanSlots = [
  { width: 'w-[38%]', layout: '-mr-8 z-10', rotate: -6, x: 48, ty: 24 },
  { width: 'w-[42%]', layout: 'z-20', rotate: 0, x: 0, ty: -8 },
  { width: 'w-[38%]', layout: '-ml-8 z-10', rotate: 6, x: -48, ty: 24 },
]

const fanContainer: Variants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.4,
      delayChildren: 0.5,
      staggerChildren: 0.1,
    },
  },
}

const fanCard: Variants = {
  hidden: (slot: (typeof fanSlots)[number]) => ({
    x: slot.x,
    rotate: slot.rotate,
    y: slot.ty,
  }),
  visible: (slot: (typeof fanSlots)[number]) => ({
    x: 0,
    rotate: slot.rotate,
    y: slot.ty,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
}

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

function Reveal({
  active,
  variants,
  className,
  children,
}: Readonly<{
  active: boolean
  variants?: Variants
  className?: string
  children: React.ReactNode
}>) {
  if (!active) return <div className={className}>{children}</div>

  return (
    <motion.div variants={variants ?? item} className={className}>
      {children}
    </motion.div>
  )
}

function ImageFan({
  images,
  imageAlts,
  cardAspect,
  animate,
}: Readonly<{
  images: string[]
  imageAlts?: string[]
  cardAspect: string
  animate: boolean
}>) {
  return (
    <motion.div
      className="relative flex w-full items-center justify-center pt-4"
      variants={fanContainer}
      initial={animate ? 'hidden' : false}
      whileInView={animate ? 'visible' : undefined}
      animate={animate ? undefined : 'visible'}
      viewport={{ once: true, margin: '-80px' }}
    >
      {images.slice(0, 3).map((src, i) => {
        const slot = fanSlots[i] ?? fanSlots[1]
        return (
          <motion.div
            key={src}
            custom={slot}
            variants={fanCard}
            className={cn(
              'relative shrink-0 overflow-hidden rounded-2xl shadow-2xl outline outline-amber-500/20 dark:outline-amber-400/20 transition-transform duration-500 hover:scale-105',
              cardAspect,
              slot.width,
              slot.layout,
            )}
          >
            <img
              src={src}
              alt={imageAlts?.[i] ?? 'Authentic Punjabi Food'}
              decoding="async"
              className="size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        )
      })}
    </motion.div>
  )
}

export function Hero10({
  title,
  titleLine2Prefix,
  titleHighlight,
  description,
  socialProof,
  images,
  imageAlts,
  animation = 'subtle',
  primaryCTA,
  secondaryCTA,
  variant = 'standard',
}: Readonly<Hero10Props>) {
  const reduce = useReducedMotion()
  const animate = animation === 'subtle' && !reduce
  const vs = variantStyles[variant]

  const titleElement = title && (
    <h1
      className={cn(
        'text-neutral-900 dark:text-white font-serif font-black tracking-tight text-balance leading-[1.12]',
        vs.title,
      )}
    >
      <Balancer>{title}</Balancer>
      {(titleLine2Prefix || titleHighlight) && (
        <>
          <br />
          <Balancer>
            {titleLine2Prefix && <span className="text-neutral-900 dark:text-white">{titleLine2Prefix} </span>}
            {titleHighlight && (
              <span className="text-amber-500 dark:text-amber-400">{titleHighlight}</span>
            )}
          </Balancer>
        </>
      )}
    </h1>
  )

  const descriptionElement = description && (
    <p className={cn('text-neutral-700 dark:text-neutral-200 leading-relaxed font-normal', vs.description)}>
      <Balancer>{description}</Balancer>
    </p>
  )

  const ctasElement = (primaryCTA?.ctaEnabled || secondaryCTA?.ctaEnabled) && (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 pt-2">
      {primaryCTA?.ctaEnabled && <Cta cta={primaryCTA} />}
      {secondaryCTA?.ctaEnabled && (
        <Cta
          cta={{ ...secondaryCTA, variant: secondaryCTA.variant ?? 'outline' }}
        />
      )}
    </div>
  )

  const socialProofElement = socialProof && (
    <p className="text-amber-600 dark:text-amber-400 text-xs font-bold tracking-wide">{socialProof}</p>
  )

  const mediaElement = images?.length ? (
    <ImageFan
      images={images}
      imageAlts={imageAlts}
      cardAspect={vs.fanCard}
      animate={animate}
    />
  ) : null

  return (
    <section className="bg-background relative isolate w-full overflow-hidden border-b border-neutral-200 dark:border-neutral-800/80">
      {/* Ambient warm glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        className={cn(
          'relative z-10 mx-auto flex max-w-6xl flex-col items-center px-4 sm:px-6 lg:px-8 text-center',
          vs.section,
          vs.content,
        )}
        variants={animate ? container : undefined}
        initial={animate ? 'hidden' : false}
        whileInView={animate ? 'visible' : undefined}
        viewport={{ once: true, margin: '-80px' }}
      >
        <Reveal
          active={animate}
          className={cn(
            'flex w-full max-w-3xl flex-col items-center',
            vs.header,
          )}
        >
          {titleElement}
          {descriptionElement}
        </Reveal>

        <Reveal active={animate} className="flex flex-col items-center gap-3">
          {ctasElement}
          {socialProofElement}
        </Reveal>

        <div className={cn('mx-auto w-full pt-4', vs.fan)}>{mediaElement}</div>
      </motion.div>
    </section>
  )
}

export default Hero10;
