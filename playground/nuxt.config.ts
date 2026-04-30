export default defineNuxtConfig({
 modules: ["../src/module", "@nuxt/eslint"],
  exakt: { colors: { light: { primary: "#ff7d00" }, dark: { primary: "#ff7d00" } } },
 components: true,
  pages: true,
 compatibilityDate: "2024-07-28"
});
