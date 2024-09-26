<template>
  <div v-if="disabled || !to">
    <slot />
  </div>
  <router-link
    v-else
    :to="to"
  >
    <slot />
  </router-link>
</template>
<script setup lang="ts">
defineProps<{
  to: string;
  disabled?: boolean;
}>();
</script>
<style scoped>
router-link,
a {
  text-decoration: none !important;
  color: inherit !important;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
</style>
