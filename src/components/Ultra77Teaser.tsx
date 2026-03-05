'use client';

import { motion } from 'framer-motion';
import { easeSmooth } from '@/lib/motion';
import { ultra77 } from '@/lib/data';

export default function Ultra77Teaser() {
  return (
    <section id="ultra77" className="relative bg-bg-surface py-32 md:py-48">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: easeSmooth }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Ultra77 logo */}
          <img
            src="/ultra77-logo.svg"
            alt="Ultra77"
            className="mx-auto mb-4 w-[min(70vw,400px)]"
          />

          {/* Tagline */}
          <p className="mb-3 text-lg font-light text-accent-teal md:text-xl">
            {ultra77.tagline}
          </p>

          {/* Status badge */}
          <div className="mb-8 inline-block rounded-full border border-accent/30 px-4 py-1.5 text-sm font-medium text-accent">
            {ultra77.status}
          </div>

          {/* Description */}
          <p className="text-base font-light leading-relaxed text-text-muted">
            {ultra77.description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
