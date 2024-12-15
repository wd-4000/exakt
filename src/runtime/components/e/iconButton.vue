<template>
  <e-btn
    class="a-btn pa-1"
    :loading="loading"
    :solid="false"
    :type="type"
    background="transparent"
  >
    <e-icon
      v-if="icon"
      :fill="fill"
      :size="size"
    >
      {{ icon }}
    </e-icon>
    <slot />
  </e-btn>
</template>
<script setup lang="ts">
withDefaults(
  defineProps<{ icon?: string; size?: number|`${number}`; loading?: boolean, type?: "button" | "submit" | "reset", fill?: boolean }>(),
  { size: "21" }
);
</script>
<style scoped>
.a-btn {
  color: inherit !important;
  aspect-ratio: 1;
}
</style>
