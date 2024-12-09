import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addComponentsDir,
  extendViteConfig,
  addImportsSources
} from "@nuxt/kit";
import type { Nuxt, NuxtOptions } from "@nuxt/schema";
import fs from "fs";


interface Colors {
  primary: string;
  green: string;
  red: string;
  blue: string;
  yellow: string;

  bg: string;
  fg: string;
  text: string;

  i: {
    value: string;
    depressed: {
      value: string,
      "2": string;
      active: {outline: string, value:string};
      outline: string;

    };
    outline: string;

    active: string;
    inactive: string;
  }
  elev: {
    value: string
    "2": string;
    "3": string;
  }
}

// Module options TypeScript interface definition
export interface ModuleOptions {
  hue: number,
  colors: {
    light: Partial<Colors>,
    dark: Partial<Colors>

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
  hue: 9,
  colors: {
    light: {
      primary: "sw-ectoplasm-100",
      green: "sw-ectoplasm-100",
      red: "sw-ectoplasm-100",
      blue: "sw-ectoplasm-100",
      yellow: "sw-ectoplasm-100",

      bg: "sw-ectoplasm-100",
      fg: "sw-ectoplasm-100",
      text: "sw-grey-950",

      i: {
        value: "sw-ectoplasm-100",
        depressed: {
          value: "sw-ectoplasm-100",
          "2": "sw-ectoplasm-100",
          active: {outline: "sw-ectoplasm-100",value: "sw-ectoplasm-100"},
          outline: "sw-ectoplasm-100",

        },
        outline: "sw-ectoplasm-100",

        active: "sw-ectoplasm-100",
        inactive: "sw-ectoplasm-100",
      },
      elev: {
        value: "sw-ectoplasm-100",
        "2": "sw-ectoplasm-100",
        "3": "sw-ectoplasm-100",
      }
    },
    dark: {
      primary: "sw-orange-600",
      green: "sw-ectoplasm-400",
      red: "sw-red-500",
      blue: "sw-weezer-500",
      yellow: "#f9c404",

      bg: "sw-grey-950",
      fg: "sw-grey-900",
      text: "white",

      i: {
        value: "sw-grey-800",
        depressed: {
          value: "sw-grey-950",
          "2": "black",
          active: {outline: "sw-grey-700",value: "sw-grey-900"},
          outline: "sw-grey-800"

        },
        outline: "sw-orange-800",

        active: "sw-orange-700",
        inactive: "sw-orange-900",
      },
      elev: {
        value: "sw-grey-800",
        "2": "sw-grey-700",
        "3": "sw-grey-600",
      }
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

const flatten = (data: object, prefix: string = '') => {
  let result = ""

  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === 'object') {
      result += flatten(value, `${prefix}${key}-`);
    } else if (typeof value === 'string') {

      // slightly less annoying Smethwick support
      if (value.startsWith("sw-")) {
        value = `sw.$${value.substring(3)}`
      }

      if (key == 'value') {
        result += `"${prefix.slice(0, -1)}": ${value}, `;
      } else {
        result += `"${prefix}${key}": ${value}, `;

      }
    }
  });

  return result;
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
      }
    );

    // Create variables files
    let SCSSvariables = `@use "${resolver.resolve("./runtime/css/_smethwick.scss")}" as sw;`;
    let CSSvariables = ":root{";

    SCSSvariables += `$root-hue: ${options.hue}; `;
    for (const mode of ['light', 'dark']) {
      SCSSvariables += `$root-colors-${mode}: (`


      SCSSvariables += flatten(options.colors[mode as 'light' | 'dark'])






      SCSSvariables += ');';
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
              additionalData: `@use "sass:color"; @use "sass:map"; @import "${resolver.resolve(
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
