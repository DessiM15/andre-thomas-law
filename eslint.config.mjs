// Flat config for ESLint 9. `next lint` is deprecated in Next 15.5 and gone in
// 16, so the `lint` script calls ESLint directly; without a config file here,
// `next lint` would stop and wait for an interactive setup prompt.
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) });

const config = [
  // `assets/` holds design sources, including a saved copy of the old site
  // with its minified scripts — nothing there is ours to lint.
  { ignores: [".next/**", "out/**", "node_modules/**", "assets/**", "next-env.d.ts"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default config;
