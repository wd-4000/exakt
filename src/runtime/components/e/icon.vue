<template>
  <svg
    :viewBox="'0 0 ' + 24 + ' ' + 24"
    :height="size"
    :width="size"
    :fill="color"
  >
    <path :d="icon"></path>
  </svg>
</template>
<script setup lang="ts">
defineProps(["icon", "size", "color"]);
</script>
<style scoped>
svg {
  fill: currentColor;
}
</style>
