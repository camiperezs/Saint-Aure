(() => {
  const meta = document.querySelector('meta[name="theme-color"]');
  const background = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-background")
    .trim();

  if (meta && background) {
    meta.setAttribute("content", background);
  }
})();
