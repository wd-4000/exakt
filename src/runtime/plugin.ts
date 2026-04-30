import { defineNuxtPlugin } from "#app";

const exakt = {
  /**
   * Converts a color to an RGB object by creating a temporary element and reading the color.
   *
   * @param x Input color string
   * @returns The RGB object
   */
  computeColor: (input: string): { r: number; g: number; b: number } => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    div.style.color = input;
    const c = getComputedStyle(div).color;
    const [r = 0, g = 0, b = 0] = c.match(/[.\d]+/g)!.map(Number);
    div.remove();
    return { r, g, b };
  },
  /**
   * Parses exakt-specific color strings to CSS variable names.
   */
  parseColor: (p: string, suffix = ""): string => {
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
  rootColors: ["primary", "red", "text", "yellow", "elev", "i", "i-depressed"],
  isRootColor: (c: string): boolean =>
    ["primary", "red", "text", "yellow", "elev", "i"].includes(c),
  /**
    * Generates an alphanumeric ID of a given length.
    */
  makeid: (length: number): string => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  },
};

type Exakt = typeof exakt;

declare module "#app" {
  interface NuxtApp {
    $exakt: Exakt;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $exakt: Exakt;
  }
}

export default defineNuxtPlugin(() => ({
  provide: { exakt },
}));
