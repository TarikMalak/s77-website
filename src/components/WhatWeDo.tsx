'use client';

import { motion } from 'framer-motion';
import { easeSmooth } from '@/lib/motion';
import type { Service } from '@/lib/types';

export default function WhatWeDo({ services }: { services: Service[] }) {
  return (
    <section id="what-we-do" className="bg-dot-pattern relative bg-bg-dark py-32 md:py-48">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: easeSmooth }}
          className="mb-20"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">
            What We Do
          </p>
          <h2 className="text-4xl font-extralight tracking-tight text-text-white md:text-5xl">
            Three pillars of AI integration.
          </h2>
        </motion.div>

        {/* Pillars */}
        <div className="space-y-24">
          {services.map((pillar, i) => (
            <motion.article
              key={pillar.id}
              id={pillar.title.toLowerCase().replace(/\s+/g, '-')}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: easeSmooth, delay: i * 0.1 }}
              className="grid gap-8 md:grid-cols-[120px_1fr]"
            >
              {/* Number */}
              <div className="text-6xl font-extralight text-accent/30 md:text-7xl">
                {String(pillar.sort_order).padStart(2, '0')}
              </div>

              {/* Content */}
              <div>
                <h3 className="mb-2 text-2xl font-light text-text-white md:text-3xl">
                  {pillar.title}
                </h3>
                <p className="mb-4 text-base font-medium text-accent">
                  {pillar.subtitle}
                </p>
                <p className="max-w-2xl text-base font-light leading-relaxed text-text-muted">
                  {pillar.description.split('\n').map((line, i, arr) => (
                    <span key={i}>
                      {line}
                      {i < arr.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
