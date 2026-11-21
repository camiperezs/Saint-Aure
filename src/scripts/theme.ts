import type { Theme } from "@/types/appearance";

export const THEME_STORAGE_KEY = "site-theme";

function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}

export function syncThemeColor(): void {
  const meta = document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"]',
  );

  if (!meta) {
    return;
  }

  const background = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-background")
    .trim();

  if (background) {
    meta.content = background;
  }
}

export function toggleTheme(): Theme {
  const root = document.documentElement;
  const current = root.dataset.theme;
  const currentTheme: Theme = isTheme(current) ? current : "light";

  const nextTheme: Theme = currentTheme === "light" ? "dark" : "light";

  root.dataset.theme = nextTheme;
  syncThemeColor();

  try {
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  } catch {
    // The theme still works for the current page session.
  }

  return nextTheme;
}
