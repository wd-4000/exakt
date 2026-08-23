<template>
  <e-undecorated-link
    :to="resolvedTo"
    :class="{ 'grow-on-mobile': responsive }"
  >
    <e-btn
      :solid="true"
      background="transparent"
      class="nav-btn"
      :class="{ 'grow-on-mobile': responsive, 'pa-3': !label }"
      align="center"
      :active="active"
      :button="false"
    >
      <div
        class="content"
        :class="{ responsive }"
      >
        <div
          v-if="icon"
          class="icon-wrapper flex-center"
          :class="{ 'mr-2': label }"
        >
          <e-icon
            class="icon"
            :fill="active"
            icon-style="outlined"
            :size="label ? 20 : 25"
          >
            {{ icon }}
          </e-icon>
          <transition name="fade">
            <div
              v-if="alert"
              class="icon-alert"
            />
          </transition>
        </div>
        <p v-if="label">
          {{ label }}
        </p>
        <slot />
      </div>
    </e-btn>
  </e-undecorated-link>
</template>
<script setup lang="ts">
import { computed, useNuxtApp, useRoute } from "#imports";
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
  $localePath?: (to: string, locale?: string) => string;
  $routeBaseName?: (route: RouteLocationNormalizedLoaded) => string | undefined;
  $getRouteBaseName?: (
    route: RouteLocationNormalizedLoaded,
  ) => string | undefined;
}

const props = withDefaults(
  defineProps<{
    /**
     * A path (`/settings`) or a route name (`settings`). Names are the useful
     * form with @nuxtjs/i18n, since a page's path differs per locale — they
     * are resolved through `localePath()` and matched through `routeBaseName()`
     * so the button stays highlighted in every locale. Without i18n installed
     * names are handed to vue-router as-is.
     *
     * A target matches the whole section below it: `/settings` is active on
     * `/settings/profile`, `settings` is active on `settings-profile`.
     */
    to?: string;
    label?: string;
    icon?: string;
    alert?: boolean;
    responsive?: boolean;
    /** Paths or route names below `to` that should not light the button up. */
    excludeActive?: string[];
  }>(),
  { to: "", label: "", icon: "", responsive: true, excludeActive: () => [] },
);

const route = useRoute();
const {
  $localePath: localePath,
  $routeBaseName,
  $getRouteBaseName,
} = useNuxtApp() as NuxtApp & I18nInjections;
const routeBaseName = $routeBaseName ?? $getRouteBaseName;

/** Anything that isn't a path is treated as a route name. */
const isRouteName = (to: string) => !to.startsWith("/");

/** Trailing slashes carry no meaning here, but `/` has to stay `/`. */
const normalize = (path: string) => path.replace(/\/+$/, "") || "/";

/** `to` in a shape <nuxt-link> understands, localized where applicable. */
const resolvedTo = computed<RouteLocationRaw | undefined>(() => {
  if (!props.to) {
    return undefined;
  }
  if (localePath) {
    return localePath(props.to);
  }
  return isRouteName(props.to) ? { name: props.to } : props.to;
});

const active = computed(() => {
  if (!props.to) {
    return false;
  }

  const path = normalize(route.path);
  const baseName =
    routeBaseName?.(route) ??
    (typeof route.name === "string" ? route.name : undefined);
  // Under a prefixed strategy the localized root is `/de` rather than `/`, so
  // it cannot be treated as a plain prefix or it would match every page of
  // that locale.
  const root = normalize(localePath?.("/") ?? "/");

  const matches = (candidate: string) => {
    if (isRouteName(candidate)) {
      return baseName === candidate || !!baseName?.startsWith(candidate + "-");
    }
    const prefix = normalize(localePath?.(candidate) ?? candidate);
    if (prefix === root) {
      return path === root;
    }
    return path === prefix || path.startsWith(prefix + "/");
  };

  return matches(props.to) && !props.excludeActive.some(matches);
});
</script>

<style scoped lang="scss">
a {
  border-radius: var(--e-rounded-border-radius);
}

.content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-items: center;

  p {
    margin: 0;
    padding: 0;
    white-space: nowrap;
  }
}

.icon-wrapper {
  position: relative;
  box-sizing: border-box;
  aspect-ratio: 1;

  // A dot on the bottom right of the icon
  .icon-alert {
    content: "";
    position: absolute;
    width: 0.5rem;
    z-index: 2;
    height: 0.5rem;
    border-radius: 100%;
    bottom: 0.1rem;
    right: 0;
    background-color: var(--e-color-primary);
    outline: 0.1rem solid var(--e-color-elev);
  }
}

@media screen and (max-width: exakt.$e-md-screen-breakpoint) {
  .grow-on-mobile {
    flex-grow: 1;
    width: 100%;
  }

  .content.responsive {
    flex-direction: column;

    .icon-wrapper {
      margin-right: 0;
    }

    p {
      margin: 0;
      white-space: nowrap;
      font-size: 0.8rem;
    }
  }
}
</style>
