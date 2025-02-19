<template>
  <div>
    <Transition name="fade">
      <div v-if="modelValue" class="focus-sheet" :class="{ 'opaque-on-desktop': opaqueOnDesktop }" @click="dismiss" />
    </Transition>
  </div>
</template>
<script setup lang="ts">

const props = withDefaults(defineProps<{
  modelValue: boolean;
  opaqueOnDesktop?: boolean;
  dismissable?: boolean;
}>(), { dismissable: true });
const emit = defineEmits(["update:modelValue"]);

const dismiss = () => {
  if (props.dismissable) {
    emit('update:modelValue', false);
  }
}
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
