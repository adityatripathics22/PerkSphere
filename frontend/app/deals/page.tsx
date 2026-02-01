'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { dealsApi, type Deal } from '@/lib/api';

const CATEGORIES = ['all', 'cloud', 'marketing', 'analytics', 'productivity', 'other'];

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [access, setAccess] = useState<'all' | 'locked' | 'unlocked'>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const params: { category?: string; access?: string } = {};
    if (category !== 'all') params.category = category;
    if (access !== 'all') params.access = access;
    dealsApi.list(params).then((res) => {
      if (res.data) setDeals(res.data);
      setLoading(false);
    });
  }, [category, access]);

  const filtered = deals.filter(
    (d) =>
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.partnerName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-slate-800"
      >
        Deals
      </motion.h1>
      <p className="mt-2 text-slate-600">Browse and filter exclusive SaaS deals.</p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mt-8 flex flex-wrap gap-4"
      >
        <input
          type="search"
          placeholder="Search deals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border border-slate-300 px-4 py-2 text-slate-800 placeholder-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-slate-300 px-4 py-2 text-slate-800 focus:border-primary-500 focus:outline-none"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c === 'all' ? 'All categories' : c}
            </option>
          ))}
        </select>
        <select
          value={access}
          onChange={(e) => setAccess(e.target.value as 'all' | 'locked' | 'unlocked')}
          className="rounded-lg border border-slate-300 px-4 py-2 text-slate-800 focus:border-primary-500 focus:outline-none"
        >
          <option value="all">All access</option>
          <option value="unlocked">Unlocked only</option>
          <option value="locked">Locked only</option>
        </select>
      </motion.div>

      {loading ? (
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-48 animate-pulse rounded-xl border border-slate-200 bg-slate-100"
            />
          ))}
        </div>
      ) : (
        <motion.ul
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.05 } },
            hidden: {},
          }}
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((deal) => (
              <motion.li
                key={deal._id}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0 },
                }}
                layout
                className="group"
              >
                <Link href={`/deals/${deal._id}`}>
                  <div
                    className={
                      deal.isLocked
                        ? 'rounded-xl border border-amber-200 bg-amber-50/30 p-5 shadow-sm transition-all hover:shadow-md'
                        : 'rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-primary-200'
                    }
                  >
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-slate-800 group-hover:text-primary-600">
                        {deal.title}
                      </h3>
                      {deal.isLocked && (
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                          Locked
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-slate-500">{deal.partnerName}</p>
                    <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                      {deal.description}
                    </p>
                    <span className="mt-3 inline-block text-sm font-medium text-primary-600 group-hover:underline">
                      View deal
                    </span>
                  </div>
                </Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}

      {!loading && filtered.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-12 text-center text-slate-500"
        >
          No deals match your filters.
        </motion.p>
      )}
    </div>
  );
}
