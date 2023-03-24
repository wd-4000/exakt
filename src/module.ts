import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addComponent,
  addComponentsDir,
  extendViteConfig,
} from "@nuxt/kit";
import fs from "fs";
// Module options TypeScript inteface definition
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
    await fs.promises.mkdir("node_modules/.cache/exakt-ui", {
      recursive: true,
    });

    // Create variables file
    let variables = "";

    for (const [key, value] of Object.entries(options.colors)) {
      variables += `$root-${key}: ${value}; `;
    }
    for (const [key, value] of Object.entries(options.breakpoints)) {
      variables += `$${key}-screen-breakpoint: ${value}; `;
    }
    variables += `$font-family: ${options.font}; `;
    variables += `$rounded-border-radius: ${options.borderRadius}; `;

    await fs.promises.writeFile(
      "node_modules/.cache/exakt-ui/variables.scss",
      new Uint8Array(Buffer.from(variables))
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

    nuxt.options.css.push(resolver.resolve("./css/main.scss"));
    addComponentsDir({ path: resolver.resolve("./components") });
  },
});
