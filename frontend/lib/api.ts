const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

export async function api<T>(
  path: string,
  options: RequestInit = {}
): Promise<{ data?: T; error?: string; status: number }> {
  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (token) (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const text = await res.text();
  let data: T | undefined;
  try {
    data = text ? (JSON.parse(text) as T) : undefined;
  } catch {
    data = undefined;
  }

  if (!res.ok) {
    const message =
      (data as { message?: string })?.message || res.statusText || 'Request failed';
    return { error: message, status: res.status };
  }
  return { data: data as T, status: res.status };
}

export type User = {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
};

export type Deal = {
  _id: string;
  title: string;
  description: string;
  category: string;
  partnerName: string;
  partnerLogo?: string;
  isLocked: boolean;
  eligibilityConditions?: string;
  discountInfo?: string;
  validUntil?: string;
  createdAt: string;
};

export type Claim = {
  _id: string;
  user: string;
  deal: Deal;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
};

export const authApi = {
  register: (name: string, email: string, password: string) =>
    api<{ token: string; user: User }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),
  login: (email: string, password: string) =>
    api<{ token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  me: () => api<{ user: User }>('/auth/me'),
};

export const dealsApi = {
  list: (params?: { category?: string; access?: string }) => {
    const search = new URLSearchParams(params as Record<string, string>).toString();
    return api<Deal[]>(`/deals${search ? `?${search}` : ''}`);
  },
  get: (id: string) => api<Deal>(`/deals/${id}`),
  claim: (id: string) =>
    api<Claim>(`/deals/${id}/claim`, { method: 'POST' }),
};

export const claimsApi = {
  list: () => api<Claim[]>('/claims'),
};
