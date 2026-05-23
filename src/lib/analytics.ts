type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    analytics?: { track?: (name: string, data?: AnalyticsPayload) => void };
  }
}

export function trackEvent(eventName: string, payload: AnalyticsPayload = {}) {
  try {
    if (typeof window === "undefined") return;

    if (window.analytics?.track) {
      window.analytics.track(eventName, payload);
      return;
    }

    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, payload);
      return;
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: eventName, ...payload });
    }
  } catch {
    // Analytics is optional. Share must never fail because tracking is missing.
  }
}
