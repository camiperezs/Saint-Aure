(() => {
  const root = document.documentElement;

  try {
    const savedTheme = localStorage.getItem(root.dataset.themeKey ?? "");

    if (savedTheme === "light" || savedTheme === "dark") {
      root.dataset.theme = savedTheme;
    }
  } catch {
    // Keep the configured default theme.
  }
})();
