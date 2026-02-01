'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { claimsApi, type Claim } from '@/lib/api';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=/dashboard');
      return;
    }
    if (!user) return;
    claimsApi.list().then((res) => {
      if (res.data) setClaims(res.data);
      setLoading(false);
    });
  }, [user, authLoading, router]);

  if (authLoading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center text-slate-500">
        Loading...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-4xl px-4 py-10 sm:px-6"
    >
      <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
      <p className="mt-2 text-slate-600">Your profile and claimed deals.</p>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-800">Profile</h2>
        <dl className="mt-4 grid gap-2 sm:grid-cols-2">
          <dt className="text-sm text-slate-500">Name</dt>
          <dd className="font-medium text-slate-800">{user.name}</dd>
          <dt className="text-sm text-slate-500">Email</dt>
          <dd className="font-medium text-slate-800">{user.email}</dd>
          <dt className="text-sm text-slate-500">Verified</dt>
          <dd>
            <span
              className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                user.isVerified ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
              }`}
            >
              {user.isVerified ? 'Verified' : 'Not verified'}
            </span>
          </dd>
        </dl>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold text-slate-800">Claimed deals</h2>
        {loading ? (
          <div className="mt-4 space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 animate-pulse rounded-xl border border-slate-200 bg-slate-100"
              />
            ))}
          </div>
        ) : claims.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-slate-500"
          >
            You haven&apos;t claimed any deals yet.{' '}
            <Link href="/deals" className="text-primary-600 hover:underline">
              Browse deals
            </Link>
          </motion.p>
        ) : (
          <motion.ul
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.05 } },
              hidden: {},
            }}
            className="mt-4 space-y-4"
          >
            {claims.filter(claim => claim.deal).map((claim) => (
              <motion.li
                key={claim._id}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <Link
                      href={`/deals/${claim.deal._id}`}
                      className="font-semibold text-slate-800 hover:text-primary-600"
                    >
                      {claim.deal.title}
                    </Link>
                    <p className="text-sm text-slate-500">{claim.deal.partnerName}</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      claim.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : claim.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {claim.status}
                  </span>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>
    </motion.div>
  );
}
