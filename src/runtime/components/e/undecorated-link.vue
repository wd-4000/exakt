<template>
  <nuxt-link :to="resolvedTo"><slot /></nuxt-link>
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
<style scoped>
nuxt-link,
a {
  text-decoration: none !important;
  color: inherit !important;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
</style>
