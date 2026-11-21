declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const googleAnalyticsOrigins = {
  script: "https://www.googletagmanager.com",
  connect: [
    "https://*.google-analytics.com",
    "https://*.analytics.google.com",
    "https://*.googletagmanager.com",
  ],
};

export function isMeasurementId(id: string): boolean {
  return /^G-[A-Z0-9]{4,}$/.test(id);
}

export function loadGoogleAnalytics(measurementId: string): void {
  if (window.gtag) {
    return;
  }

  const dataLayer = (window.dataLayer ??= []);

  window.gtag = function gtag() {
    // gtag.js only processes the native arguments object, not an array.
    // eslint-disable-next-line prefer-rest-params
    dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", measurementId);

  const script = document.createElement("script");
  script.async = true;
  script.src = `${googleAnalyticsOrigins.script}/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.append(script);
}

export function trackGoogleAnalyticsEvent(
  name: string,
  params?: Record<string, string>,
): void {
  window.gtag?.("event", name, params);
}

export function clearGoogleAnalyticsCookies(): void {
  const names = document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0]?.trim() ?? "")
    .filter((name) => name === "_ga" || name.startsWith("_ga_"));

  const domains = ["", location.hostname, `.${location.hostname}`];

  for (const name of names) {
    for (const domain of domains) {
      const domainPart = domain ? `; domain=${domain}` : "";
      document.cookie = `${name}=; Max-Age=0; path=/${domainPart}`;
    }
  }
}
