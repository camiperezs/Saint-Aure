export const imageSizes = {
  full: "100vw",
  half: "(min-width: 64rem) 50vw, 100vw",
  content: "(min-width: 70rem) 70rem, 100vw",
  column: "(min-width: 64rem) 33vw, (min-width: 48rem) 50vw, 100vw",
  avatar: "3rem",
} as const;

export const imageWidths = [480, 800, 1200, 1600, 2000] as const;
