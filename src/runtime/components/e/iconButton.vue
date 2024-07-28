<template>
  <e-btn
    class="a-btn"
    :loading="loading"
    :solid="false"
    :type="type"
    background="transparent"
  >
    <e-icon
      v-if="icon"
      
      :size="size"
    >{{ icon }}</e-icon>
    <slot />
  </e-btn>
</template>
<script setup lang="ts">
withDefaults(
  defineProps<{ icon?: string; size?: string; loading?: boolean, type?: "button" | "submit" | "reset" }>(),
  { size: "21" }
);
</script>
<style scoped>
.a-btn {
  color: inherit !important;
  aspect-ratio: 1;
}
</style>
