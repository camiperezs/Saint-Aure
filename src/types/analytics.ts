export interface AnalyticsConfig {
  provider: "google-analytics";
  measurementId: string;
  privacyPolicyUrl?: string;
}

export interface ConsentLabels {
  region: string;
  message: string;
  accept: string;
  reject: string;
  manage: string;
  privacyPolicy: string;
}
