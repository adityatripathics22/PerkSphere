'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, authApi } from '@/lib/api';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  register: (name: string, email: string, password: string) => Promise<string | null>;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    const { data } = await authApi.me();
    setUser(data?.user ?? null);
    setLoading(false);
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (email: string, password: string) => {
    const { data, error } = await authApi.login(email, password);
    if (error || !data?.token) return error || 'Login failed';
    localStorage.setItem('token', data.token);
    setUser(data.user);
    return null;
  };

  const register = async (name: string, email: string, password: string) => {
    const { data, error } = await authApi.register(name, email, password);
    if (error || !data?.token) return error || 'Registration failed';
    localStorage.setItem('token', data.token);
    setUser(data.user);
    return null;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
