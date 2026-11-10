const API = import.meta.env.VITE_BACKEND_URL;

// ── Session ID ────────────────────────────────────────────
export function getSessionId(): string {
  let id = localStorage.getItem('sess_id');
  if (!id) {
    id = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem('sess_id', id);
  }
  return id;
}

export function getDevice(): 'mobile' | 'tablet' | 'desktop' {
  const w = window.innerWidth;
  if (w < 640) return 'mobile';
  if (w < 1024) return 'tablet';
  return 'desktop';
}

// ── Analytics ─────────────────────────────────────────────
export async function trackPageView(path: string): Promise<void> {
  if (!API) return;
  await fetch(`${API}/analytics/pageview`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId: getSessionId(),
      path,
      device: getDevice(),
    }),
  });
}

export async function trackEvent(
  eventType: string,
  payload?: Record<string, any>,
): Promise<void> {
  if (!API) return;
  await fetch(`${API}/analytics/event`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId: getSessionId(),
      eventType,
      payload,
      device: getDevice(),
    }),
  });
}

// ── Resume ────────────────────────────────────────────────
export async function fetchResumeUrl(): Promise<{ url: string; id: string }> {
  if (!API) throw new Error('Backend URL not configured');
  const res = await fetch(
    `${API}/resume/download?sessionId=${getSessionId()}`,
    { method: 'POST' },
  );
  if (!res.ok) throw new Error('Failed to log resume download');
  return res.json();
}

// ── Contact ───────────────────────────────────────────────
export interface ContactInput {
  name: string;
  email: string;
  company?: string;
  subject?: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  id: string;
  message: string;
}

export async function submitContact(input: ContactInput): Promise<ContactResponse> {
  if (!API) throw new Error('Backend URL not configured');
  const res = await fetch(`${API}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Failed to send message');
  }
  return res.json();
}

// ── Dashboard (private) ───────────────────────────────────
const DASHBOARD_KEY = import.meta.env.VITE_DASHBOARD_API_KEY;

async function dashboardFetch<T>(path: string): Promise<T> {
  if (!API) throw new Error('Backend URL not configured');
  const res = await fetch(`${API}/dashboard${path}`, {
    headers: { 'x-api-key': DASHBOARD_KEY || '' },
  });
  if (!res.ok) throw new Error(`Dashboard fetch failed: ${res.status}`);
  return res.json();
}

export const dashboardApi = {
  getOverview: () => dashboardFetch<DashboardOverview>('/'),
  getCountries: () => dashboardFetch<CountryStat[]>('/countries'),
  getSections: () => dashboardFetch<SectionStat[]>('/sections'),
  getChatbot: () => dashboardFetch<ChatbotStat[]>('/chatbot'),
  getDaily: (days = 30) => dashboardFetch<DailyStat[]>(`/daily?days=${days}`),
  getDevices: () => dashboardFetch<DeviceStat[]>('/devices'),
  getReferrers: () => dashboardFetch<ReferrerStat[]>('/referrers'),
};

// ── Dashboard types ───────────────────────────────────────
export interface DashboardOverview {
  pageViews: { total: number; last30Days: number; last7Days: number };
  resumeDownloads: { total: number; last30Days: number };
  contactMessages: { total: number; pending: number; recent: any[] };
  events: { last30Days: number };
}
export interface CountryStat { country: string; visits: number }
export interface SectionStat { section: string; views: number }
export interface ChatbotStat { question: string; count: number }
export interface DailyStat { date: string; visits: number }
export interface DeviceStat { device: string; count: number }
export interface ReferrerStat { referrer: string; visits: number }
