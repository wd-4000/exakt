<template>
  <div />
</template>
<script setup lang="ts">
import { useNuxtApp, computed } from "#imports";

const { $exakt } = useNuxtApp();
const props = withDefaults(
  defineProps<{
    color: string;
  }>(),
  { color: "primary" }
);
const parsedColor = computed(() => $exakt.parseColor(props.color, "rgb"));
</script>
<style scoped lang="scss">
div {
  display: block;
  width: 100%;
  height: 100%;
  --pc: v-bind(parsedColor);
  background-image: linear-gradient(
    90deg,
    rgba(var(--pc), 0) 0%,
    rgba(var(--pc), 0.5) 50%,
    rgba(var(--pc), 0) 50.1%,
    rgba(var(--pc), 0) 100%
  );

  background-size: 200% 100%;

  animation: pos 3.5s linear infinite;
}

@keyframes pos {
  0%,
  10% {
    background-position: 100% 0%;
    opacity: 1;
  }
  40% {
    opacity: 1;
  }

  70% {
    opacity: 0;
  }

  100% {
    background-position: -100% 0%;
    opacity: 0;
  }
}
</style>
