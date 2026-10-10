'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Universal compatibility shims for Vite & Next.js environments
interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  priority?: boolean;
}

const Image = ({ src, alt, width, height, className, draggable, priority, ...props }: ImageProps) => (
  <img
    src={src}
    alt={alt}
    width={width}
    height={height}
    className={className}
    draggable={draggable}
    loading={priority ? 'eager' : 'lazy'}
    {...props}
  />
);

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

const Link = ({ href, className, children, ...props }: LinkProps) => (
  <a href={href} className={className} {...props}>
    {children}
  </a>
);

const containerVariants = {
  hidden: { 
    opacity: 0,
    y: 30
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.43, 0.13, 0.23, 0.96],
      delayChildren: 0.1,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
};

const numberVariants = {
  hidden: (direction: number) => ({
    opacity: 0,
    x: direction * 40,
    y: 15,
    rotate: direction * 5
  }),
  visible: {
    opacity: 0.7,
    x: 0,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
};

const ghostVariants = {
  hidden: { 
    scale: 0.8,
    opacity: 0,
    y: 15,
    rotate: -5
  },
  visible: { 
    scale: 1,
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  },
  hover: {
    scale: 1.1,
    y: -10,
    rotate: [0, -5, 5, -5, 0],
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      rotate: {
        duration: 2,
        ease: "linear",
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  },
  floating: {
    y: [-5, 5],
    transition: {
      y: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  }
};

export function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#090a0d] px-4 transition-colors duration-300">
      <AnimatePresence mode="wait">
        <motion.div 
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <div className="flex items-center justify-center gap-4 md:gap-6 mb-8 md:mb-12">
            <motion.span 
              className="text-[80px] md:text-[120px] font-bold text-[#222222] dark:text-white opacity-70 font-signika select-none"
              variants={numberVariants}
              custom={-1}
            >
              4
            </motion.span>
            <motion.div
              variants={ghostVariants}
              whileHover="hover"
              animate={["visible", "floating"]}
            >
              <Image
                src="https://cdn.21st.dev/assets/mirror/88/8848c4fd858052c49c5a5d7267489c02b021c6cf3e31bfec02787e16f1ab7d0e.png"
                alt="Ghost"
                width={120}
                height={120}
                className="w-[80px] h-[80px] md:w-[120px] md:h-[120px] object-contain select-none drop-shadow-md"
                draggable="false"
                priority
              />
            </motion.div>
            <motion.span 
              className="text-[80px] md:text-[120px] font-bold text-[#222222] dark:text-white opacity-70 font-signika select-none"
              variants={numberVariants}
              custom={1}
            >
              4
            </motion.span>
          </div>
          
          <motion.h1 
            className="text-3xl md:text-5xl font-bold text-[#222222] dark:text-white mb-4 md:mb-6 opacity-70 dark:opacity-90 font-dm-sans select-none"
            variants={itemVariants}
          >
            Boo! Page missing!
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-[#222222] dark:text-neutral-300 mb-8 md:mb-12 opacity-60 dark:opacity-80 font-dm-sans select-none max-w-md mx-auto"
            variants={itemVariants}
          >
            Whoops! This page must be a ghost - it&apos;s not here!
          </motion.p>

          <motion.div 
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              transition: {
                duration: 0.3,
                ease: [0.43, 0.13, 0.23, 0.96]
              }
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              href="index.html"
              className="inline-block bg-[#222222] dark:bg-amber-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-[#000000] dark:hover:bg-amber-500 transition-colors font-dm-sans select-none shadow-lg shadow-black/20"
            >
              Find shelter (Back to Home)
            </Link>
          </motion.div>

          <motion.div 
            className="mt-12 flex justify-center items-center gap-4"
            variants={itemVariants}
          >
            <Link
              href="index.html"
              className="text-[#222222] dark:text-amber-400 opacity-60 hover:opacity-100 transition-opacity underline font-dm-sans select-none text-sm"
            >
              What means 404?
            </Link>
            <span className="text-neutral-400">•</span>
            <Link
              href="menu.html"
              className="text-[#222222] dark:text-amber-400 opacity-60 hover:opacity-100 transition-opacity underline font-dm-sans select-none text-sm"
            >
              Browse Menu
            </Link>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default NotFound;
