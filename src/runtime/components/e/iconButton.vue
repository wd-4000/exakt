<template>
  <e-btn
    class="icon-btn pa-1"
    :loading="loading"
    :solid="false"
    v-bind="{type, button, active, background}"
  >
    <e-icon
      v-if="icon"
      :fill="fill"
      :size="size"
      :style="{ color: active ? 'var(--e-color-primary)' : undefined }"
    >
      {{ icon }}
    </e-icon>
    <slot />
  </e-btn>
</template>
<script setup lang="ts">
withDefaults(
  defineProps<{
    icon?: string;
    size?: number | `${number}`;
    loading?: boolean;
    type?: "button" | "submit" | "reset";
    fill?: boolean;
    button?: boolean;
    active?: boolean;
    background?: string;
  }>(),
  {
    size: "21",
    icon: undefined,
    type: undefined,
    button: true,
    active: false,
    background: "transparent",
  },
);
</script>
<style scoped>
.icon-btn {
  aspect-ratio: 1;
}
</style>
