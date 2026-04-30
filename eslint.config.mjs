// @ts-check
import withNuxt from './playground/.nuxt/eslint.config.mjs'
import eslintConfigPrettier from "eslint-config-prettier";
import { globalIgnores } from "eslint/config";
import vueParser from "vue-eslint-parser";
import tsParser from "@typescript-eslint/parser";

export default withNuxt(
  globalIgnores([
    'eslint.config.mjs',
    'node_modules/*',
    'dist/*',
    '.nuxt/*',
    'playground/node_modules/*',
    'playground/.nuxt/*',
    '.yarn/*'
  ]),

  // Explicitly force the TS + Vue parsers for your module's source code
  {
    files: ["src/**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        sourceType: "module",
        extraFileExtensions: [".vue"],
      }
    }
  },

  {
      rules: {
        "vue/multi-word-component-names": "off"
      }
    },

  eslintConfigPrettier
)
