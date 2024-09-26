import { defineNuxtPlugin } from "#app";
import 'material-symbols';

export default defineNuxtPlugin((/*nuxtApp*/) => {
  return {
    provide: {
      exakt: {
        /**
         * Converts a color to an RGB object by creating a temporary element and reading the color.
         *
         * @param x Input color string
         * @returns The RGB object
         */
        computeColor: (input: string) => {
          const div = document.createElement("div");
          document.body.appendChild(div);
          div.style.color = input;
          const c = getComputedStyle(div).color as any;
          const res = c.match(/[.\d]+/g).map(Number);

          div.remove();
          return { r: res[0], g: res[1], b: res[2] };
        },
        /**
         * Parses exakt-specific color strings to CSS variable names.
         */
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
        rootColors: ['primary', 'red', 'text', 'yellow', 'elev'],
        /**
         * Generates an alphanumeric ID of a given length.
         */        
        makeid: (length: number) => {
          let result = "";
          const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          const charactersLength = characters.length;
          let counter = 0;
          while (counter < length) {
            result += characters.charAt(
              Math.floor(Math.random() * charactersLength)
            );
            counter += 1;
          }
          return result;
        },
      },
    },
  };
});
