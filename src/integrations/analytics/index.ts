import type { AnalyticsConfig } from "@/types/analytics";
import {
  clearGoogleAnalyticsCookies,
  isMeasurementId,
  loadGoogleAnalytics,
  trackGoogleAnalyticsEvent,
} from "./google-analytics";

export function validateAnalytics(config: AnalyticsConfig): void {
  if (!isMeasurementId(config.measurementId)) {
    throw new Error(
      `Invalid Google Analytics measurement ID "${config.measurementId}": expected the format G-XXXXXXXXXX.`,
    );
  }
}

export function loadAnalytics(config: AnalyticsConfig): void {
  switch (config.provider) {
    case "google-analytics":
      loadGoogleAnalytics(config.measurementId);
  }
}

export function clearAnalytics(config: AnalyticsConfig): void {
  switch (config.provider) {
    case "google-analytics":
      clearGoogleAnalyticsCookies();
  }
}

export function trackEvent(
  config: AnalyticsConfig,
  name: string,
  params?: Record<string, string>,
): void {
  switch (config.provider) {
    case "google-analytics":
      trackGoogleAnalyticsEvent(name, params);
  }
}
