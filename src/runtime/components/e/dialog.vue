<template>
  <div @keyup.esc="dismiss">
    <e-focus-sheet
      :model-value="modelValue"
      :opaque-on-desktop="true"
      v-bind="{ dismissable }"
      @update:model-value="emit('update:modelValue', $event)"
    />

    <e-tr-scale :multiplier="1.3">
      <div
        v-if="modelValue"
        ref="dialogContents"
        class="dialog-wrap flex-center"
        @focusout="onBlur"
      >
        <div class="dialog bg-elev rounded px-6 pe-6 pb-2">
          <div
            v-if="!!slots.title"
            class="my-4"
          >
            <h2 class="ma-0 pa-0">
              <slot name="title" />
            </h2>
          </div>
          <slot />
          <div class="button-bar mb-3">
            <slot name="buttons" />
          </div>
        </div>
      </div>
    </e-tr-scale>
  </div>
</template>

<script setup lang="ts">
import { useSlots, watch, nextTick, ref } from '#imports';

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    dismissable?: boolean;
  }>(), { dismissable: true });

const slots = useSlots();
const dialogContents = ref<HTMLDivElement | null>(null);


const emit = defineEmits(["update:modelValue"]);

const dismiss = () => {
  if(props.dismissable){
    emit('update:modelValue', false);
  }
}

const refocus = () => dialogContents.value?.querySelector('button, input, [tabindex]:not([tabindex="-1"])')?.focus();

// Focus on open
watch(()=>props.modelValue, async (newValue: boolean) => {
  if(newValue) {
    await nextTick();
    refocus();
  }
});

const onBlur = async (event) => {
  // currentTarget is the element the listener is attached to (your container)
    const container = event.currentTarget;

    // relatedTarget is the element that is receiving the new focus
    const newFocusElement = event.relatedTarget;

    // If the new focus is NOT inside our container, we've completely lost focus
    if (!container.contains(newFocusElement)) {
      await nextTick();
      if(!props.modelValue) return;
      refocus();
    }

};

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
  position: relative;
  overflow: clip;
}

@media (max-width: exakt.$e-md-screen-breakpoint) {
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
  justify-content: flex-end;
  width: 100%;
}
</style>
