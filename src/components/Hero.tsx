'use client';

import { motion } from 'framer-motion';
import { easeSmooth } from '@/lib/motion';
import { hero } from '@/lib/data';

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg-dark">
      {/* Subtle glow behind logo */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* S77 Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: easeSmooth }}
          className="mb-12"
        >
          <img
            src="/s77-logo.svg"
            alt="S77.AI logo"
            className="mx-auto h-24 w-auto md:h-32"
          />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeSmooth, delay: 0.3 }}
          className="mb-6 text-5xl font-extralight tracking-tight text-text-white md:text-7xl"
        >
          {hero.headline}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeSmooth, delay: 0.5 }}
          className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-text-muted md:text-xl"
        >
          {hero.subtitle}
        </motion.p>
      </div>
    </section>
  );
}
