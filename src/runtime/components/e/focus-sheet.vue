<template>
  <div>
    <Transition name="fade">
      <div
        v-if="modelValue"
        class="focus-sheet"
        :class="{ 'opaque-on-desktop': opaqueOnDesktop }"
        @click="emit('update:modelValue', false)"
      />
    </Transition>
  </div>
</template>
<script setup lang="ts">
/*const props =*/ defineProps<{
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
  z-index: 5;
  //background-color: red;

  &.opaque-on-desktop {
    background-color: rgba(var(--e-color-bg-rgb), 0.7);
  }
}

@media screen and (max-width: exakt.$e-md-screen-breakpoint) {
  .focus-sheet {
    background-color: rgba(var(--e-color-bg-rgb), 0.7);
  }
}
</style>
