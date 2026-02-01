'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-slate-800">
          <span className="text-xl text-primary-600">PerkSphere</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/deals"
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-100 ${
              pathname === '/deals' ? 'text-primary-600' : 'text-slate-600'
            }`}
          >
            Deals
          </Link>
          {loading ? (
            <span className="text-sm text-slate-400">Loading...</span>
          ) : user ? (
            <>
              <Link
                href="/dashboard"
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-100 ${
                  pathname === '/dashboard' ? 'text-primary-600' : 'text-slate-600'
                }`}
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </motion.header>
  );
}
