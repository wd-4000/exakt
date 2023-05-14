<template>
  <svg
    :viewBox="'0 0 ' + 24 + ' ' + 24"
    :height="size"
    :width="size"
    :fill="color"
  >
    <path :d="icon" />
  </svg>
</template>
<script setup lang="ts">
 withDefaults(
  defineProps<{
    icon: string;
    color?: string;
    size?: number | string;
  }>(),
  {
    icon: "",
    color: "",
    size: "21",
  }
);

</script>
<style scoped>
svg {
  fill: currentColor;
}
</style>
