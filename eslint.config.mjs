import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      // Allow unused variables that start with underscore
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "caughtErrorsIgnorePattern": "^_"
        }
      ],
      // Configure explicit any rule to be less strict
      "@typescript-eslint/no-explicit-any": [
        "error",
        {
          "fixToUnknown": true,
          "ignoreRestArgs": true
        }
      ],
      // Add specific rules for your chart component
      "rules": {
        "@typescript-eslint/no-explicit-any": "off" // Disable for specific files if needed
      }
    }
  },
  // Optionally add overrides for specific files
  {
    files: ["components/ui/chart.tsx"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off"
    }
  }
];

export default eslintConfig;