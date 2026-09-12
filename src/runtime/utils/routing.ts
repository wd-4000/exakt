import { useNuxtApp } from "#imports";
import type { NuxtApp } from "#app";
import type {
  RouteLocationNormalizedLoaded,
  RouteLocationRaw,
} from "vue-router";

/**
 * The parts of @nuxtjs/i18n we care about.
 *
 * Its plugin hands these to the Nuxt app (`nuxt.provide("localePath", ...)`),
 * so we can pick them up when they are there instead of importing `#i18n`,
 * which only exists once the module is installed. `$routeBaseName` superseded
 * `$getRouteBaseName` in v10, so accept either.
 */
interface I18nInjections {
  $localePath?: (to: RouteLocationRaw, locale?: string) => string;
  $routeBaseName?: (route: RouteLocationNormalizedLoaded) => string | undefined;
  $getRouteBaseName?: (
    route: RouteLocationNormalizedLoaded,
  ) => string | undefined;
}

/**
 * A bare `to` is treated as a route name. Names are the useful form with i18n,
 * since a page's path differs per locale.
 *
 * Route names never contain `/`, `:`, `#` or `?`, so anything carrying one is
 * a path, an external URL, a fragment or a query — all of which <nuxt-link>
 * already understands and must be passed through untouched.
 */
export const isRouteName = (to: string) => !/[/:#?]/.test(to);

/**
 * i18n's routing helpers, or `undefined` for each when i18n is not installed.
 * Callers are expected to fall back to plain vue-router behaviour.
 */
export function useI18nRouting() {
  const {
    $localePath: localePath,
    $routeBaseName,
    $getRouteBaseName,
  } = useNuxtApp() as NuxtApp & I18nInjections;

  return { localePath, routeBaseName: $routeBaseName ?? $getRouteBaseName };
}
