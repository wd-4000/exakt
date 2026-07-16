<template>
  <e-btn
    class="a-btn pa-1"
    :loading="loading"
    :solid="false"
    :type="type"
    :button="button"
    :active="active"
    :background="background"
  >
    <e-icon
      v-if="icon"
      :fill="fill"
      :size="size"
      :style="{ color: active ? 'var(--e-color-primary)' : 'unset' }"
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
.a-btn {
  color: inherit !important;
  aspect-ratio: 1;
}
</style>
