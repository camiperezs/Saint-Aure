import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";

export default defineConfig(
  { ignores: ["dist/", ".astro/"] },
  js.configs.recommended,
  tseslint.configs.strict,
  astro.configs.recommended,
  {
    files: ["*.config.{js,mjs}"],
    languageOptions: {
      globals: {
        URL: "readonly",
      },
    },
  },
  {
    files: ["src/scripts/inline/*.js"],
    languageOptions: {
      globals: {
        document: "readonly",
        localStorage: "readonly",
        getComputedStyle: "readonly",
      },
    },
  },
);
