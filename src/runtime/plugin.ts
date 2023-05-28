import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((/*nuxtApp*/) => {
  return {
    provide: {
      exakt: {
        parseColor: (p: string, suffix = "") => {
          let result = null;
          if (p === "primary") {
            result = "var(--e-color-primary";
          } else if (p === "elev") {
            result = "var(--e-color-elev";
          }

          if (result) {
            return result.concat(suffix ? "-".concat(suffix) : "", ")");
          }
          return p;
        },
      },
    },
  };
});
