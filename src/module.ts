import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addComponentsDir,
  extendViteConfig,
} from "@nuxt/kit";
import type { Nuxt } from "@nuxt/schema";
import fs from "fs";

interface Colors {
  primary?: string;
  text?: string;
  bg?: string;
  green?: string;
  red?: string;
  blue?: string;
  yellow?: string;
}

// Module options TypeScript interface definition
export interface ModuleOptions {
  hue: number;
  colors: {
    light: Colors;
    dark: Colors;
  };
  breakpoints: {
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
  borderRadius: string;
  corePaddingX: string;
  font: { family: string; weight?: number };
}

const defaults: ModuleOptions = {
  hue: 9,
  colors: {
    light: {
      primary: "#008dff",
      text: "#212121",
      red: "#f44336",
      blue: "#2196f3",
      green: "#00b850",
      yellow: "#ebbc00",
      bg: "#ffffff",
    },
    dark: {
      primary: "#008dff",
      text: "#ffffff",
      red: "#ff8980",
      blue: "#008dff",
      green: "#00ff6e",
      yellow: "#FFA000",
      bg: "#212121",
    },
  },
  breakpoints: {
    sm: "16em",
    md: "33em",
    lg: "48em",
    xl: "60em",
  },
  borderRadius: "8px",
  corePaddingX: "1rem",
  font: { family: "Open Sans, sans-serif", weight: 400 },
};

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "exakt-ui",
    configKey: "exakt",
  },
  // Default configuration options of the Nuxt module
  defaults: defaults,
  async setup(options: ModuleOptions, nuxt: Nuxt) {
    const resolver = createResolver(import.meta.url);

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve("./runtime/plugin"));

    /* Variables file section */
    await fs.promises.mkdir(
      resolver.resolve("../node_modules/.cache/exakt-ui"),
      {
        recursive: true,
      },
    );

    // Create variables files
    let SCSSvariables = "";
    let CSSvariables = ":root{";

    SCSSvariables += `$root-hue: ${options.hue}; `;
    for (const mode of ["light", "dark"]) {
      SCSSvariables += `$root-colors-${mode}: (`;
      for (const [key, value] of Object.entries(
        options.colors[mode as "light" | "dark"],
      )) {
        SCSSvariables += `"${key}": ${value}, `;
      }
      SCSSvariables += ");";
    }

    for (const [key, value] of Object.entries(options.breakpoints)) {
      SCSSvariables += `$e-${key}-screen-breakpoint: ${value}; `;
    }

    CSSvariables += `--e-font-family: ${options.font.family}; `;
    CSSvariables += `--e-font-weight: ${options.font.weight}; `;

    CSSvariables += `--e-rounded-border-radius: ${options.borderRadius}; `;
    CSSvariables += `--e-core-padding-x: ${options.corePaddingX}; `;

    await fs.promises.writeFile(
      resolver.resolve("../node_modules/.cache/exakt-ui/variables.scss"),
      new Uint8Array(Buffer.from(SCSSvariables)),
    );
    await fs.promises.writeFile(
      resolver.resolve("../node_modules/.cache/exakt-ui/variables.css"),
      new Uint8Array(Buffer.from(CSSvariables + "}")),
    );

    extendViteConfig((config) => {
      Object.assign(config, {
        css: {
          preprocessorOptions: {
            scss: {
              api: "modern-compiler",
              additionalData: `@use "sass:color"; @use "sass:map"; @use "${resolver.resolve(
                "../node_modules/.cache/exakt-ui/variables.scss",
              )}" as exakt;  `,
            },
          },
        },
      });
    });

    nuxt.options.css.push(resolver.resolve("./runtime/css/main.scss"));
    nuxt.options.css.push(resolver.resolve("./runtime/css/util.scss"));
    nuxt.options.css.push("material-symbols");
    nuxt.options.css.push(
      resolver.resolve("../node_modules/.cache/exakt-ui/variables.css"),
    );

    addComponentsDir({ path: resolver.resolve("./runtime/components") });
  },
});
