<template>
  <nuxt-link
    class="e-undecorated-link"
    :to="resolvedTo"
  ><slot /></nuxt-link>
</template>
<script setup lang="ts">
import { computed } from "#imports";
import type { RouteLocationRaw } from "vue-router";
import { isRouteName, useI18nRouting } from "../../utils/routing";

const props = defineProps<{
  to?: RouteLocationRaw | null;
  disabled?: boolean;
}>();

const { localePath } = useI18nRouting();

const resolvedTo = computed<RouteLocationRaw | undefined>(() => {
  if (props.disabled || !props.to) {
    return undefined;
  }

  // A bare route name is the one form vue-router will not take verbatim.
  const to =
    typeof props.to === "string" && isRouteName(props.to)
      ? { name: props.to }
      : props.to;

  // localePath takes names, params, query and hash alike and gives back a
  // localized fullPath, or "" for anything it cannot match, in which case
  // hand the raw target to <nuxt-link> and let it decide.
  return (localePath && localePath(to)) || to;
});
</script>
<style>
.e-undecorated-link {
  text-decoration: none !important;
  color: inherit !important;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

/* iOS data detectors relink phone numbers, dates and addresses in the slot. */
.e-undecorated-link [x-apple-data-detectors] {
  color: inherit !important;
  text-decoration: none !important;
}
</style>
