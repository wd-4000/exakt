<template>
  <div>
    <e-focus-sheet
      :model-value="modelValue"
      :opaque-on-desktop="true"
      @update:model-value="emit('update:modelValue', $event)"
    />

    <e-tr-scale :multiplier="1.3">
      <div
        v-if="modelValue"
        class="dialog-wrap flex-center"
      >
        <div class="dialog rounded px-6 pe-6 pb-2">
          <div class="mb-4">
            <h2 class="ma-0 pa-0">
              <slot name="title" />
            </h2>
          </div>
          <slot />
          <div class="button-bar me-4 mb-3">
            <slot name="buttons" />
          </div>
        </div>
      </div>
    </e-tr-scale>
  </div>
</template>

<script setup lang="ts">
 defineProps<{
  modelValue: boolean;
}>();
const emit = defineEmits(["update:modelValue"]);
</script>
<style scoped lang="scss">
.dialog-wrap {
  position: fixed;
  pointer-events: none;
  z-index: 6;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
}

.dialog {
  min-width: 25rem;
  pointer-events: all;
  background-color: var(--e-color-elev);
  color: var(--e-color-dark);
  position: relative;
  overflow: clip;
}

@media (max-width: $e-md-screen-breakpoint) {
  .dialog {
    width: 100%;
    max-width: 100vw;
    min-width: unset;
  }

  .dialog-wrap {
    align-content: flex-end;
    align-items: flex-end;
  }
}

.button-bar {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  width: 100%;
}
</style>
