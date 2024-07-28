import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addComponentsDir,
  extendViteConfig,
  addImportsSources
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
    yellow?: string;
  };
  breakpoints: {
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
  borderRadius: string;
  corePaddingX: string;
  font: { family: string, weight?: number };
}

const defaults: ModuleOptions = {
  colors: {
    primary: "#008dff",
    dark: "#212121",
    light: "#ffffff",
    red: "#f44336",
    blue: "#2196f3",
    yellow: '#FFA000'
  },
  breakpoints: {
    sm: "16em",
    md: "33em",
    lg: "48em",
    xl: "60em",
  },
  borderRadius: "8px",
  corePaddingX: "1rem",
  font: { family: "Roboto, sans-serif", weight: 400 },
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

    CSSvariables += `--e-font-family: ${options.font.family}; `;
    CSSvariables += `--e-font-weight: ${options.font.weight}; `;

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

    addImportsSources({
      from: 'material-symbols', imports: ['material-symbols']
    })

    nuxt.options.css.push(resolver.resolve("./runtime/css/main.scss"));
    nuxt.options.css.push(resolver.resolve("./runtime/css/util.scss"));
    nuxt.options.css.push(
      resolver.resolve("../node_modules/.cache/exakt-ui/variables.css")
    );

    addComponentsDir({ path: resolver.resolve("./runtime/components") });
  },
});
