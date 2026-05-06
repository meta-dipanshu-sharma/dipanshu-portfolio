import { useQuery, useMutation } from '@tanstack/react-query';
import {
  trackPageView,
  trackEvent,
  fetchResumeUrl,
  submitContact,
  dashboardApi,
  ContactInput,
} from '@/services/api';

// ── Query keys — centralised so invalidation is easy ─────
export const queryKeys = {
  dashboard: {
    overview: ['dashboard', 'overview'] as const,
    countries: ['dashboard', 'countries'] as const,
    sections: ['dashboard', 'sections'] as const,
    chatbot: ['dashboard', 'chatbot'] as const,
    daily: (days: number) => ['dashboard', 'daily', days] as const,
    devices: ['dashboard', 'devices'] as const,
    referrers: ['dashboard', 'referrers'] as const,
  },
};

// ── Analytics mutations ───────────────────────────────────
// Mutations because they're fire-and-forget POST calls.
// We don't need the response — just want to track in background.

export function useTrackPageView() {
  return useMutation({
    mutationFn: trackPageView,
    // Silent — never surface errors to the user for analytics
    onError: () => {},
  });
}

export function useTrackEvent() {
  return useMutation({
    mutationFn: ({
      eventType,
      payload,
    }: {
      eventType: string;
      payload?: Record<string, any>;
    }) => trackEvent(eventType, payload),
    onError: () => {},
  });
}

// ── Resume mutation ───────────────────────────────────────
export function useResumeDownload() {
  return useMutation({
    mutationFn: fetchResumeUrl,
    onSuccess: ({ url }) => {
      // Open the PDF as soon as the URL comes back
      window.open(url, '_blank');
    },
    onError: (err) => {
      console.error('Resume download failed:', err);
      // Fallback — open the PDF directly from the frontend public folder
      window.open('/DipanshuSharmaResume.pdf', '_blank');
    },
  });
}

// ── Contact form mutation ─────────────────────────────────
export function useContactForm() {
  return useMutation({
    mutationFn: (input: ContactInput) => submitContact(input),
    // onSuccess and onError handled in the component
  });
}

// ── Dashboard queries ─────────────────────────────────────
// All dashboard queries are disabled by default — only fetch
// when explicitly enabled (e.g. when the /admin page mounts).

export function useDashboardOverview(enabled = true) {
  return useQuery({
    queryKey: queryKeys.dashboard.overview,
    queryFn: dashboardApi.getOverview,
    enabled,
    staleTime: 1000 * 60 * 2, // 2 minutes — refresh more often for live dashboard
  });
}

export function useDashboardCountries(enabled = true) {
  return useQuery({
    queryKey: queryKeys.dashboard.countries,
    queryFn: dashboardApi.getCountries,
    enabled,
  });
}

export function useDashboardSections(enabled = true) {
  return useQuery({
    queryKey: queryKeys.dashboard.sections,
    queryFn: dashboardApi.getSections,
    enabled,
  });
}

export function useDashboardChatbot(enabled = true) {
  return useQuery({
    queryKey: queryKeys.dashboard.chatbot,
    queryFn: dashboardApi.getChatbot,
    enabled,
  });
}

export function useDashboardDaily(days = 30, enabled = true) {
  return useQuery({
    queryKey: queryKeys.dashboard.daily(days),
    queryFn: () => dashboardApi.getDaily(days),
    enabled,
  });
}

export function useDashboardDevices(enabled = true) {
  return useQuery({
    queryKey: queryKeys.dashboard.devices,
    queryFn: dashboardApi.getDevices,
    enabled,
  });
}

export function useDashboardReferrers(enabled = true) {
  return useQuery({
    queryKey: queryKeys.dashboard.referrers,
    queryFn: dashboardApi.getReferrers,
    enabled,
  });
}
