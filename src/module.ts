import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addComponent,
  addComponentsDir,
  extendViteConfig,
} from "@nuxt/kit";
import fs from "fs";
// Module options TypeScript interface definition
export interface ModuleOptions {
  colors: {
    primary?: string;
    dark?: string;
    light?: string;
    red?: string;
    blue?: string;
  };
  breakpoints: {
    md?: string;
    l?: string;
    xl?: string;
  };
  borderRadius: string;
  corePaddingX: string;
  font: string;
}

const defaults: ModuleOptions = {
  colors: {
    primary: "#008dff",
    dark: "#212121",
    light: "#f5f5f5",
    red: "#f44336",
    blue: "#2196f3",
  },
  breakpoints: {
    md: "33em",
    l: "48em",
    xl: "60em",
  },
  borderRadius: "8px",
  corePaddingX: "1rem",
  font: "Roboto, sans-serif",
};

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "exakt-ui",
    configKey: "exakt",
  },
  // Default configuration options of the Nuxt module
  defaults: defaults,
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve("./runtime/plugin"));

    /* Variables file section */
    await fs.promises.mkdir(
      resolver.resolve("../node_modules/.cache/exakt-ui"),
      {
        recursive: true,
      }
    );

    // Create variables files
    let SCSSvariables = "";
    let CSSvariables = ":root{";

    for (const [key, value] of Object.entries(options.colors)) {
      SCSSvariables += `$root-${key}: ${value}; `;
    }
    for (const [key, value] of Object.entries(options.breakpoints)) {
      SCSSvariables += `$e-${key}-screen-breakpoint: ${value}; `;
    }

    CSSvariables += `--e-font-family: ${options.font}; `;
    CSSvariables += `--e-rounded-border-radius: ${options.borderRadius}; `;
    CSSvariables += `--e-core-padding-x: ${options.corePaddingX}; `;

    await fs.promises.writeFile(
      resolver.resolve("../node_modules/.cache/exakt-ui/variables.scss"),
      new Uint8Array(Buffer.from(SCSSvariables))
    );
    await fs.promises.writeFile(
      resolver.resolve("../node_modules/.cache/exakt-ui/variables.css"),
      new Uint8Array(Buffer.from(CSSvariables + "}"))
    );

    extendViteConfig((config) => {
      Object.assign(config, {
        css: {
          preprocessorOptions: {
            scss: {
              additionalData: `@use "sass:color"; @import "${resolver.resolve(
                "../node_modules/.cache/exakt-ui/variables.scss"
              )}";  `,
            },
          },
        },
      });
    });

    // Yeah, I know, it's ugly, but it (mostly) works.
    //    Nuxt seems insistent on transpiling the scss file to regular css when packaging the module,
    //    which breaks the scss variables.

    await fs.promises.copyFile(
      resolver.resolve("./runtime/css/main.scssx"),
      resolver.resolve("../node_modules/.cache/exakt-ui/main.scss")
    );

    nuxt.options.css.push(
      resolver.resolve("../node_modules/.cache/exakt-ui/main.scss")
    );
    nuxt.options.css.push(resolver.resolve("./runtime/css/util.css"));
    nuxt.options.css.push(
      resolver.resolve("../node_modules/.cache/exakt-ui/variables.css")
    );

    addComponentsDir({ path: resolver.resolve("./runtime/components") });
  },
});
