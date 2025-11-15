import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Next.js recommended configs
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    // Your ignores
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },

  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      // Allow ANY
      "@typescript-eslint/no-explicit-any": "off",

      // Allow {} type
      "@typescript-eslint/no-empty-object-type": "off",

      // Allow <img>
      "@next/next/no-img-element": "off",

      // Optional: prevent build errors on unused vars
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
];

export default eslintConfig;
