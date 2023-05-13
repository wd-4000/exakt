<template>
  <div>
    <Transition name="fade">
      <div
        class="focus-sheet"
        @click="emit('update:modelValue', false)"
        :class="{ 'opaque-on-desktop': opaqueOnDesktop }"
        v-if="modelValue"
      ></div
    ></Transition>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
  opaqueOnDesktop?: boolean;
}>();
const emit = defineEmits(["update:modelValue"]);
</script>

<style scoped lang="scss">
.focus-sheet {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  z-index: 3;
  //background-color: red;

  &.opaque-on-desktop {
    background-color: rgba(var(--e-color-light-rgb), 0.5);
  }
}

@media screen and (max-width: $e-md-screen-breakpoint) {
  .focus-sheet {
    background-color: rgba(var(--e-color-light-rgb), 0.5);
  }
}
</style>
