import type { AnalyticsConfig } from "@/types/analytics";
import {
  clearAnalytics,
  loadAnalytics,
  trackEvent,
} from "@/integrations/analytics";
import { initConversionTracking } from "@/scripts/conversions";

const CONSENT_KEY = "cookie-consent";

type Consent = "granted" | "denied";

function readConsent(): Consent | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

function writeConsent(consent: Consent): void {
  try {
    localStorage.setItem(CONSENT_KEY, consent);
  } catch {
    // The choice still applies to the current page view.
  }
}

export function initConsent(banner: HTMLElement): void {
  const { provider, measurementId } = banner.dataset;

  if (provider !== "google-analytics" || !measurementId) {
    return;
  }

  const config: AnalyticsConfig = { provider, measurementId };
  const accept = banner.querySelector<HTMLButtonElement>(
    "[data-consent-accept]",
  );
  const reject = banner.querySelector<HTMLButtonElement>(
    "[data-consent-reject]",
  );

  let tracking = false;

  const enableAnalytics = () => {
    loadAnalytics(config);

    if (!tracking) {
      tracking = true;
      initConversionTracking((name, params) =>
        trackEvent(config, name, params),
      );
    }
  };

  const consent = readConsent();

  if (consent === "granted") {
    enableAnalytics();
  } else if (consent === null) {
    banner.hidden = false;
  }

  accept?.addEventListener("click", () => {
    writeConsent("granted");
    banner.hidden = true;
    enableAnalytics();
  });

  reject?.addEventListener("click", () => {
    const previous = readConsent();

    writeConsent("denied");
    banner.hidden = true;

    if (previous === "granted") {
      clearAnalytics(config);
      location.reload();
    }
  });

  document
    .querySelectorAll<HTMLButtonElement>("[data-consent-open]")
    .forEach((button) => {
      button.hidden = false;
      button.addEventListener("click", () => {
        banner.hidden = false;
        accept?.focus();
      });
    });
}
