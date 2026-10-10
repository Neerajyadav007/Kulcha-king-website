'use client'

import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { motion } from "framer-motion";
import { Sparkles, HelpCircle } from "lucide-react";

// Universal Link shim for Vite / Next.js
const Link = ({ href, className, children, ...props }: any) => (
  <a href={href} className={className} {...props}>
    {children}
  </a>
);

export const BlurredStagger = ({
  text = "Kulcha King & Parantha Singh",
}: {
  text: string;
}) => {
  const headingText = text;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.015,
      },
    },
  };

  const letterAnimation = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
    },
    show: {
      opacity: 1,
      filter: "blur(0px)",
    },
  };

  return (
    <div className="w-full">
      <motion.p
        variants={container}
        initial="hidden"
        animate="show"
        className="text-sm sm:text-base leading-relaxed break-words whitespace-normal text-neutral-700 dark:text-neutral-300"
      >
        {headingText.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={letterAnimation}
            transition={{ duration: 0.3 }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.p>
    </div>
  );
};

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQsProps {
  title?: string;
  subtitle?: string;
  faqList?: FAQItem[];
}

export default function FAQs({
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about our authentic Punjabi food, clay tandoor, and online ordering in Jaipur.",
  faqList,
}: FAQsProps) {
  const defaultFaqItems: FAQItem[] = [
    {
      id: 'item-1',
      question: 'Are your Amritsari Kulchas baked in a traditional clay tandoor?',
      answer: 'Yes! Every single kulcha is freshly baked at 400°C inside our traditional charcoal-fired clay tandoor, delivering the signature crispy, flaky crunch and irresistible smoky aroma.',
    },
    {
      id: 'item-2',
      question: 'Is Kulcha King 100% Pure Vegetarian?',
      answer: 'Absolutely. We operate a strictly 100% Pure Vegetarian kitchen with fresh ingredients, pure desi ghee, and daily sourced dairy.',
    },
    {
      id: 'item-3',
      question: 'What is included with each Kulcha order?',
      answer: 'Each order is served generously with authentic slow-simmered Pindi choley, freshly churned desi white makhan (butter), and our tangy imli-pyaz chutney.',
    },
    {
      id: 'item-4',
      question: 'Do you deliver across Mansarovar & Jaipur?',
      answer: 'Yes! We deliver hot doorstep orders across Mansarovar, Gopalpura, Tonk Road, and nearby areas within 35 to 45 minutes. Free delivery unlocks on orders above ₹499.',
    },
    {
      id: 'item-5',
      question: 'Can I place bulk party orders or catering requests?',
      answer: 'Yes, we gladly cater family events, birthday parties, and office lunches. You can submit an inquiry through our Contact page or call our kitchen hotline at +91 89490 19457.',
    },
  ];

  const items = faqList || defaultFaqItems;

  return (
    <section className="py-14 sm:py-20 border-t border-neutral-200 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-5 md:gap-12">
          {/* Left Title Section */}
          <div className="md:col-span-2 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
              <span>Got Questions?</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 dark:text-white leading-tight">
              {title}
            </h2>

            <p className="text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
              {subtitle}
            </p>

            <div className="pt-2 hidden md:block">
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Can’t find what you’re looking for? Reach out directly to our{' '}
                <Link
                  href="contact.html"
                  className="text-amber-600 dark:text-amber-400 font-bold hover:underline"
                >
                  Jaipur team
                </Link>{' '}
                or call{' '}
                <a
                  href="tel:+918949019457"
                  className="text-amber-600 dark:text-amber-400 font-bold hover:underline"
                >
                  +91 89490 19457
                </a>.
              </p>
            </div>
          </div>

          {/* Right Accordion Section */}
          <div className="md:col-span-3">
            <Accordion
              type="single"
              collapsible
              className="space-y-3"
            >
              {items.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="surface-card rounded-2xl border border-neutral-200 dark:border-neutral-800 px-5 py-1 shadow-sm transition-all hover:border-amber-500/40"
                >
                  <AccordionTrigger className="cursor-pointer text-sm sm:text-base font-bold font-serif text-neutral-900 dark:text-white hover:no-underline py-4 text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pt-1 pb-4">
                    <BlurredStagger text={item.answer} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Mobile Footer helper */}
          <p className="text-xs text-neutral-600 dark:text-neutral-400 md:hidden">
            Can't find what you're looking for? Contact our{' '}
            <Link
              href="contact.html"
              className="text-amber-600 dark:text-amber-400 font-bold hover:underline"
            >
              customer support team
            </Link>.
          </p>
        </div>
      </div>
    </section>
  );
}
