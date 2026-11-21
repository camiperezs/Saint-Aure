export type TrackEvent = (
  name: string,
  params?: Record<string, string>,
) => void;

const CONTACT_METHODS: [RegExp, string][] = [
  [/^https:\/\/wa\.me\//, "whatsapp"],
  [/^tel:/, "phone"],
  [/^mailto:/, "email"],
];

export function initConversionTracking(track: TrackEvent): void {
  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) {
      return;
    }

    const link = event.target.closest<HTMLAnchorElement>("a[href]");

    if (!link) {
      return;
    }

    const href = link.getAttribute("href") ?? "";
    const method = CONTACT_METHODS.find(([pattern]) => pattern.test(href))?.[1];

    if (method) {
      track("contact_click", { method });
    } else if (link.classList.contains("button")) {
      track("cta_click", {
        link_text: link.textContent?.trim() ?? "",
        link_url: link.href,
      });
    }
  });

  document.addEventListener("submit", (event) => {
    const form = event.target;

    if (
      event.defaultPrevented ||
      !(form instanceof HTMLFormElement) ||
      !form.matches("[data-contact-form]")
    ) {
      return;
    }

    track("generate_lead", { form_name: form.name });
  });
}
