<template>
  <e-btn class="a-btn" :loading="loading">
    <e-icon :icon="icon" :size="size"></e-icon>
  </e-btn>
</template>
<script setup lang="ts">
withDefaults(
  defineProps<{ icon: string; size?: string; loading?: boolean }>(),
  { size: "21" }
);
</script>
<style scoped>
.a-btn {
  color: inherit !important;
  aspect-ratio: 1;
}
</style>
