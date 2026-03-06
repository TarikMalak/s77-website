'use client';

import { motion } from 'framer-motion';
import { easeSmooth } from '@/lib/motion';
import type { SiteSettings } from '@/lib/types';

export default function Contact({ settings }: { settings: SiteSettings }) {
  return (
    <section id="contact" className="bg-bg-dark py-32 md:py-48">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: easeSmooth }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="mb-8 text-sm font-medium uppercase tracking-[0.2em] text-accent">
            Get In Touch
          </h2>

          <a
            href={`mailto:${settings.email}`}
            className="mb-8 inline-block text-2xl font-light text-text-white transition-colors hover:text-accent md:text-3xl"
          >
            {settings.email}
          </a>

          <p className="mb-2 text-sm font-light text-text-muted">
            {settings.address}
          </p>

          <p className="text-sm font-light text-text-muted">
            A division of{' '}
            <a
              href={settings.parent_company_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-white transition-colors hover:text-accent"
            >
              {settings.parent_company_name}
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
