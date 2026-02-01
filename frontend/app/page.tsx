'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

export default function LandingPage() {
  const { user } = useAuth();
  return (
    <div className="overflow-x-hidden">
      
      <section className="relative min-h-[85vh] overflow-hidden bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900 px-4 pt-16 pb-24 sm:px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(56,189,248,0.25),transparent)]" />
        <div className="relative mx-auto max-w-4xl pt-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-sm font-medium uppercase tracking-wider text-primary-300"
          >
            Startup Benefits Platform
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl"
          >
            Exclusive SaaS deals for{' '}
            <span className="bg-gradient-to-r from-primary-400 to-accent-light bg-clip-text text-transparent">
              founders &amp; teams
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mb-10 max-w-2xl text-lg text-slate-300"
          >
            Early-stage startups often can&apos;t afford premium tools. PerkSphere gives you
            exclusive deals on cloud, marketing, analytics, and productivity software.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/deals"
              className="inline-flex items-center rounded-xl bg-primary-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-primary-500/30 transition-all hover:bg-primary-400 hover:shadow-primary-500/40 active:scale-[0.98]"
            >
              Explore deals
            </Link>
            {!user && (
              <Link
                href="/register"
                className="inline-flex items-center rounded-xl border border-slate-500/50 bg-white/5 px-6 py-3 text-base font-semibold text-white backdrop-blur transition-all hover:bg-white/10"
              >
                Get started
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      
      <section className="border-t border-slate-200 bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center text-3xl font-bold text-slate-800"
          >
            Why PerkSphere?
          </motion.h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Curated deals',
                desc: 'Hand-picked SaaS offers from cloud, marketing, analytics, and productivity partners.',
                icon: '✨',
              },
              {
                title: 'Public & exclusive',
                desc: 'Some deals are open to all; others are locked and require verification for access.',
                icon: '🔒',
              },
              {
                title: 'One dashboard',
                desc: 'Claim deals and track status—pending, approved—all in one place.',
                icon: '📊',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 transition-shadow hover:shadow-lg"
              >
                <span className="text-2xl">{item.icon}</span>
                <h3 className="mt-3 text-lg font-semibold text-slate-800">{item.title}</h3>
                <p className="mt-2 text-slate-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="border-t border-slate-200 bg-primary-600 py-16"
      >
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to unlock startup benefits?
          </h2>
          <p className="mt-3 text-primary-100">
            Sign up, browse deals, and claim the ones that fit your stage.
          </p>
          <Link
            href="/deals"
            className="mt-6 inline-block rounded-xl bg-white px-6 py-3 font-semibold text-primary-600 transition-all hover:bg-primary-50 active:scale-[0.98]"
          >
            Explore deals
          </Link>
        </div>
      </motion.section>

      <footer className="border-t border-slate-200 bg-slate-100 py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-slate-500">
          PerkSphere — Startup Benefits Platform
        </div>
      </footer>
    </div>
  );
}
