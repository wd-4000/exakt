<template>
  <div v-if="disabled || !to">
    <slot />
  </div>
  <nuxt-link
    v-else
    :to="to"
  >
    <slot />
  </nuxt-link>
</template>
<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";

defineProps<{
  to?: RouteLocationRaw | null;
  disabled?: boolean;
}>();
</script>
<style scoped>
nuxt-link,
a {
  text-decoration: none !important;
  color: inherit !important;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
</style>
