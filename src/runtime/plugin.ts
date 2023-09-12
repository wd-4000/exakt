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
        makeid: (length: number) => {
          let result = '';
          const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          const charactersLength = characters.length;
          let counter = 0;
          while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
          }
          return result;
      }
      },


    },
  };
});
