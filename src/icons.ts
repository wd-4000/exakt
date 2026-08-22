import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { useLogger } from "@nuxt/kit";

const logger = useLogger("exakt-ui");
const require = createRequire(import.meta.url);

/** The only place a style is named. Everything else derives from it. */
const FONT_FAMILIES = {
  outlined: "Material Symbols Outlined",
  rounded: "Material Symbols Rounded",
  sharp: "Material Symbols Sharp",
} as const;

export type IconStyle = keyof typeof FONT_FAMILIES;

export const ICON_STYLES = Object.keys(FONT_FAMILIES) as IconStyle[];

/** Where the subset fonts are served from. We do this so that we can easily add a preload hint. */
export const ICON_BASE_URL = "/_exakt";

// Bump when the subsetting pipeline changes, so stale caches are not reused.
const PIPELINE_VERSION = 3;

const HB_SUBSET_FLAGS_NO_LAYOUT_CLOSURE = 0x0200;
const HB_MEMORY_MODE_WRITABLE = 2;

const SCANNED_EXTENSIONS = new Set([
  ".vue",
  ".ts",
  ".js",
  ".tsx",
  ".jsx",
  ".mjs",
  ".cjs",
  ".md",
]);

const IGNORED_DIRECTORIES = new Set([
  "node_modules",
  "dist",
  "coverage",
  "public",
]);

const CANDIDATE_RE =
  /"([a-z0-9_]{2,})"|'([a-z0-9_]{2,})'|`([a-z0-9_]{2,})`|>\s*([a-z0-9_]{2,})\s*</g;

export interface IconSubsetOptions {
  styles: IconStyle[];
  /** Directories scanned for icon names. */
  roots: string[];
  /** Icon names to keep regardless of what the scan finds. */
  include: string[];
  /** When false, only `include` is used. */
  scan: boolean;
  cacheDir: string;
}

export interface IconSubsetResult {
  /** Stylesheet declaring the subset `@font-face`s, or null when no icons are used. */
  cssPath: string | null;
  /** Directory holding the subset woff2s, to be served at {@link ICON_BASE_URL}. */
  fontDir: string;
  /** Public URLs of the subset woff2s, for preloading. */
  fontUrls: string[];
  icons: string[];
  bytes: number;
  cached: boolean;
}

/** Walk the roots and collect every token that names a real icon. */
const scanForIconNames = async (
  roots: string[],
  known: Set<string>,
): Promise<Set<string>> => {
  const files: string[] = [];

  const walk = async (dir: string): Promise<void> => {
    let entries: fs.Dirent[];
    try {
      entries = await fs.promises.readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (IGNORED_DIRECTORIES.has(entry.name) || entry.name.startsWith(".")) {
          continue;
        }
        await walk(full);
      } else if (SCANNED_EXTENSIONS.has(path.extname(entry.name))) {
        files.push(full);
      }
    }
  };

  for (const root of roots) await walk(root);

  const found = new Set<string>();
  let cursor = 0;
  const worker = async () => {
    while (cursor < files.length) {
      const file = files[cursor++]!;
      let contents: string;
      try {
        contents = await fs.promises.readFile(file, "utf8");
      } catch {
        continue;
      }
      for (const match of contents.matchAll(CANDIDATE_RE)) {
        const token = match[1] ?? match[2] ?? match[3] ?? match[4];
        if (token && known.has(token)) found.add(token);
      }
    }
  };

  await Promise.all(
    Array.from({ length: Math.min(16, files.length) }, () => worker()),
  );
  return found;
};

// Subsetting

/**
 * Resolve icon names to glyph ids by shaping them.
 * A real icon name collapses to a single glyph through the `liga` feature.
 */
const resolveGlyphIds = (
  hb: typeof import("harfbuzzjs"),
  sfnt: Uint8Array,
  names: string[],
): Map<string, number> => {
  const font = new hb.Font(new hb.Face(new hb.Blob(sfnt)));
  const buffer = new hb.Buffer();
  const resolved = new Map<string, number>();

  for (const name of names) {
    buffer.clearContents();
    buffer.addText(name);
    buffer.guessSegmentProperties();
    hb.shape(font, buffer);
    const infos = buffer.getGlyphInfos();
    if (infos.length === 1) resolved.set(name, infos[0]!.codepoint);
  }

  return resolved;
};

const subsetFont = (
  wasm: Uint8Array,
  sfnt: Uint8Array,
  glyphIds: Iterable<number>,
  names: string[],
): Buffer => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  // Re-wrapped because Node types Buffer over ArrayBufferLike, which does not
  // satisfy WebAssembly's BufferSource.
  const hb = new WebAssembly.Instance(
    new WebAssembly.Module(new Uint8Array(wasm)),
  ).exports as any;
  const heap = () => new Uint8Array(hb.memory.buffer);

  const fontPtr = hb.malloc(sfnt.byteLength);
  heap().set(sfnt, fontPtr);
  const blob = hb.hb_blob_create(
    fontPtr,
    sfnt.byteLength,
    HB_MEMORY_MODE_WRITABLE,
    0,
    0,
  );
  const face = hb.hb_face_create(blob, 0);
  const input = hb.hb_subset_input_create_or_fail();
  if (!input) throw new Error("could not create a harfbuzz subset input");

  // Keep the icon glyphs...
  const glyphSet = hb.hb_subset_input_glyph_set(input);
  for (const gid of glyphIds) hb.hb_set_add(glyphSet, gid);

  // ...and the characters their ligatures are keyed off, so `liga` still fires.
  const unicodeSet = hb.hb_subset_input_unicode_set(input);
  const characters = new Set<number>();
  for (const name of names) {
    for (const character of name) characters.add(character.codePointAt(0)!);
  }
  for (const codepoint of characters) hb.hb_set_add(unicodeSet, codepoint);

  // Otherwise harfbuzz pulls in every ligature reachable from a-z
  hb.hb_subset_input_set_flags(input, HB_SUBSET_FLAGS_NO_LAYOUT_CLOSURE);

  const subsetFace = hb.hb_subset_or_fail(face, input);
  if (!subsetFace) throw new Error("harfbuzz failed to subset the icon font");

  const outBlob = hb.hb_face_reference_blob(subsetFace);
  const outPtr = hb.hb_blob_get_data(outBlob, 0);
  // Copied out of the wasm heap, and a Buffer because fontverter sniffs the
  // font signature off one.
  const output = Buffer.from(
    heap().subarray(outPtr, outPtr + hb.hb_blob_get_length(outBlob)),
  );

  hb.hb_blob_destroy(outBlob);
  hb.hb_face_destroy(subsetFace);
  hb.hb_subset_input_destroy(input);
  hb.hb_face_destroy(face);
  hb.hb_blob_destroy(blob);
  /* eslint-enable @typescript-eslint/no-explicit-any */

  return output;
};

// Cache

/** Remove subset artefacts from previous runs. Scoped to our own cache dir. */
const pruneCache = async (cacheDir: string, keep: string): Promise<void> => {
  let entries: string[];
  try {
    entries = await fs.promises.readdir(cacheDir);
  } catch {
    return;
  }
  await Promise.all(
    entries
      .filter((name) => name.startsWith("icons-") && !name.includes(keep))
      .map((name) =>
        fs.promises.rm(path.join(cacheDir, name), { force: true }),
      ),
  );
};

export const buildIconSubset = async (
  options: IconSubsetOptions,
): Promise<IconSubsetResult> => {
  const packageDir = path.dirname(require.resolve("material-symbols"));
  const packageVersion = JSON.parse(
    await fs.promises.readFile(path.join(packageDir, "package.json"), "utf8"),
  ).version as string;

  /* Collect candidate names */
  const candidates = new Set(options.include);
  if (options.scan) {
    // Every icon name the installed material-symbols ships.
    const declaration = await fs.promises.readFile(
      path.join(packageDir, "index.d.ts"),
      "utf8",
    );
    const known = new Set(
      [...declaration.matchAll(/"([a-z0-9_]+)"/g)].map((match) => match[1]!),
    );
    for (const name of await scanForIconNames(options.roots, known)) {
      candidates.add(name);
    }
  }

  const fontDir = path.join(options.cacheDir, "fonts");

  const wanted = [...candidates].sort();
  if (wanted.length === 0) {
    return {
      cssPath: null,
      fontDir,
      fontUrls: [],
      icons: [],
      bytes: 0,
      cached: false,
    };
  }

  /* Cache lookup */
  const hash = createHash("sha256")
    .update(
      JSON.stringify([
        PIPELINE_VERSION,
        packageVersion,
        options.styles,
        wanted,
      ]),
    )
    .digest("hex")
    .slice(0, 12);

  const cssPath = path.join(options.cacheDir, `icons-${hash}.css`);
  const manifestPath = path.join(options.cacheDir, `icons-${hash}.json`);

  try {
    const manifest = JSON.parse(
      await fs.promises.readFile(manifestPath, "utf8"),
    );
    await fs.promises.access(cssPath);
    return {
      cssPath,
      fontDir,
      fontUrls: (manifest.fonts as string[]).map(
        (file) => `${ICON_BASE_URL}/${file}`,
      ),
      icons: manifest.icons,
      bytes: manifest.bytes,
      cached: true,
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      logger.warn(
        `Could not reuse the cached icon subset at ${options.cacheDir}, rebuilding it.`,
        error,
      );
    }
  }

  /* Subset */
  const hb = await import("harfbuzzjs");
  const fontverter = await import("fontverter");
  const wasm = await fs.promises.readFile(
    path.join(
      path.dirname(require.resolve("harfbuzzjs")),
      "harfbuzz-subset.wasm",
    ),
  );

  let css = "";
  let bytes = 0;
  let resolvedNames: string[] = [];
  const fontFiles: string[] = [];

  for (const style of options.styles) {
    const sfnt = await fontverter.convert(
      await fs.promises.readFile(
        path.join(packageDir, `material-symbols-${style}.woff2`),
      ),
      "sfnt",
    );

    const resolved = resolveGlyphIds(hb, sfnt, wanted);
    if (resolved.size > resolvedNames.length) resolvedNames = [...resolved.keys()];
    if (resolved.size === 0) continue;

    const woff2 = await fontverter.convert(
      subsetFont(wasm, sfnt, resolved.values(), [...resolved.keys()]),
      "woff2",
    );

    const fontFile = `icons-${style}-${hash}.woff2`;
    await fs.promises.mkdir(fontDir, { recursive: true });
    await fs.promises.writeFile(
      path.join(fontDir, fontFile),
      new Uint8Array(woff2),
    );
    bytes += woff2.byteLength;
    fontFiles.push(fontFile);

    css +=
      `@font-face{` +
      `font-family:"${FONT_FAMILIES[style]}";` +
      `font-style:normal;` +
      `font-weight:100 700;` +
      `font-display:block;` +
      `src:url("${ICON_BASE_URL}/${fontFile}") format("woff2");` +
      `}`;
  }

  if (!css) {
    return {
      cssPath: null,
      fontDir,
      fontUrls: [],
      icons: [],
      bytes: 0,
      cached: false,
    };
  }

  await fs.promises.writeFile(cssPath, css);
  await fs.promises.writeFile(
    manifestPath,
    JSON.stringify({ icons: resolvedNames, bytes, fonts: fontFiles }),
  );
  await pruneCache(options.cacheDir, hash);
  await pruneCache(fontDir, hash);

  const missing = options.include.filter(
    (name) => !resolvedNames.includes(name),
  );
  if (missing.length) {
    logger.warn(
      `These icons.include entries are not Material Symbols icons and were skipped: ${missing.join(", ")}`,
    );
  }

  return {
    cssPath,
    fontDir,
    fontUrls: fontFiles.map((file) => `${ICON_BASE_URL}/${file}`),
    icons: resolvedNames,
    bytes,
    cached: false,
  };
};
