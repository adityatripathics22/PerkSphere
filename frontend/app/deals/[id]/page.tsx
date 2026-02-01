'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { dealsApi, claimsApi, type Deal } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function DealDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { user } = useAuth();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);
  const [error, setError] = useState('');
  const [claimed, setClaimed] = useState(false);

  useEffect(() => {
    dealsApi.get(id).then((res) => {
      if (res.data) setDeal(res.data);
      setLoading(false);
    });
  }, [id]);

  const handleClaim = async () => {
    if (!user) {
      router.push('/login?redirect=/deals/' + id);
      return;
    }
    setError('');
    setClaiming(true);
    const res = await dealsApi.claim(id);
    setClaiming(false);
    if (res.error) {
      setError(res.error);
      return;
    }
    setClaimed(true);
  };

  const canClaim = user && (!deal?.isLocked || user.isVerified);
  const showLockedMessage = deal?.isLocked && (!user || !user.isVerified);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="h-8 w-48 animate-pulse rounded bg-slate-200" />
        <div className="mt-6 h-4 w-full animate-pulse rounded bg-slate-200" />
        <div className="mt-4 h-4 w-3/4 animate-pulse rounded bg-slate-200" />
      </div>
    );
  }

  if (!deal) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 text-center">
        <p className="text-slate-600">Deal not found.</p>
        <Link href="/deals" className="mt-4 inline-block text-primary-600 hover:underline">
          Back to deals
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-3xl px-4 py-10 sm:px-6"
    >
      <Link
        href="/deals"
        className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-primary-600"
      >
        ← Back to deals
      </Link>

      <div
        className={`mt-6 rounded-2xl border p-6 sm:p-8 ${
          deal.isLocked ? 'border-amber-200 bg-amber-50/30' : 'border-slate-200 bg-white'
        }`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">{deal.title}</h1>
          {deal.isLocked && (
            <span className="rounded-full bg-amber-200 px-3 py-1 text-sm font-medium text-amber-900">
              Locked — verification required
            </span>
          )}
        </div>
        <p className="mt-2 text-slate-500">by {deal.partnerName}</p>

        <p className="mt-6 text-slate-700">{deal.description}</p>

        {deal.discountInfo && (
          <div className="mt-6 rounded-lg bg-primary-50 p-4">
            <h3 className="font-semibold text-primary-800">Offer</h3>
            <p className="mt-1 text-primary-700">{deal.discountInfo}</p>
          </div>
        )}

        {deal.eligibilityConditions && (
          <div className="mt-6">
            <h3 className="font-semibold text-slate-800">Eligibility</h3>
            <p className="mt-1 text-slate-600">{deal.eligibilityConditions}</p>
          </div>
        )}

        {showLockedMessage && (
          <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-800">
            This deal is restricted. You need to be verified to claim it. Contact support for
            verification.
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-4">
          {claimed ? (
            <span className="rounded-lg bg-green-100 px-4 py-2 font-medium text-green-800">
              Claimed! Check your dashboard.
            </span>
          ) : (
            <button
              onClick={handleClaim}
              disabled={claiming || !!showLockedMessage}
              className="rounded-lg bg-primary-600 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {claiming ? 'Claiming...' : 'Claim this deal'}
            </button>
          )}
          <Link
            href="/dashboard"
            className="rounded-lg border border-slate-300 px-6 py-2.5 font-medium text-slate-700 hover:bg-slate-50"
          >
            My dashboard
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
