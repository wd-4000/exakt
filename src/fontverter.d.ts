// fontverter ships no types of its own.
declare module "fontverter" {
  export type FontFormat = "sfnt" | "woff" | "woff2";

  export function convert(
    font: Uint8Array,
    toFormat: FontFormat,
    fromFormat?: FontFormat,
  ): Promise<Buffer>;

  export function detectFormat(font: Uint8Array): FontFormat | undefined;
}
