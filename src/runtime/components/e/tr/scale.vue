<template>
  <!-- wrap the built-in Transition component -->
  <Transition name="e-tr-scale">
    <slot /> <!-- pass down slot content -->
  </Transition>
</template>
  
  <script setup lang="ts">
  const props = withDefaults(
      defineProps<{
          multiplier?: number
      }>(),
      { multiplier: 1 }
  );
  </script>
  
  <style>
  .e-tr-scale-enter-active,
  .e-tr-scale-leave-active {
      transition: all calc(0.15s * v-bind('props.multiplier')) ease-in-out;
  }
  
  .e-tr-scale-enter-from,
  .e-tr-scale-leave-to {
      opacity: 0;
      transform: scale(90%) translateY(-6%);
  }
  </style>
  