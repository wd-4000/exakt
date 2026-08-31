<template>
  <nuxt-link :to="disabled ? undefined : to ?? undefined"><slot /></nuxt-link>
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
