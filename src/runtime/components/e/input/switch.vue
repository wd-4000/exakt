<template>
  <div class="wrap d-flex flex-align-center mt-3">
    <button
      :id="id"
      ref="root"
      type="button"
      role="switch"
      class="switch"
      :class="{ loading }"
      :aria-checked="!!modelValue"
      :aria-disabled="loading || undefined"
      :disabled="disabled"
      @click="onClick"
    >
      <span
        class="knob"
        aria-hidden="true"
      />
    </button>
    <label
      v-if="$slots.default"
      :for="id"
      class="label"
    ><slot /></label>
  </div>
</template>
<script setup lang="ts">
import { onBeforeUnmount, ref, useId, watch } from '#imports';

const props = withDefaults(defineProps<{
  modelValue?: boolean,
  disabled?: boolean,
  loading?: boolean,
  /** Read out by screen readers when loading starts. */
  loadingLabel?: string,
}>(), { loadingLabel: "Loading…" });
const emit = defineEmits(["update:modelValue"]);

const id = useId();

// Loading keeps the switch focusable so we need to prevent toggling here
const onClick = () => {
  if (props.loading) return;
  emit('update:modelValue', !props.modelValue);
};

// not in TypeScript's DOM types yet
const root = ref<HTMLElement & { ariaNotify?: (announcement: string) => void }>();
let notifyTimer: ReturnType<typeof setTimeout> | undefined;

// don't announce short loads
watch(
  () => props.loading,
  (loading) => {
    clearTimeout(notifyTimer);
    if (loading) {
      notifyTimer = setTimeout(() => root.value?.ariaNotify?.(props.loadingLabel), 300);
    }
  },
);
onBeforeUnmount(() => clearTimeout(notifyTimer));
</script>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.label {
  cursor: pointer;
  font-size: 1.1rem;
  user-select: none;
}

.switch {
  --height: 1.5rem;
  --width: 2.75rem;
  --knob: 1rem;
  --inset: calc((var(--height) - var(--knob)) / 2);
  --translateX: calc(var(--width) - var(--knob) - var(--inset) * 2);

  -webkit-appearance: none;
  appearance: none;
  position: relative;
  flex-shrink: 0;
  margin: 0 0.6rem 0 0;
  padding: 0;
  border: none;
  width: var(--width);
  height: var(--height);
  border-radius: calc(var(--height) / 2);
  background-color: var(--e-color-i-inactive);
  outline: var(--e-color-i-outline) solid 0.1rem;
  cursor: pointer;
  transition: background-color 0.15s, outline-color 0.15s, transform 0.25s;
}

.knob {
  position: absolute;
  top: var(--inset);
  left: var(--inset);
  width: var(--knob);
  height: var(--knob);
  border-radius: 50%;
  background-color: var(--e-color-i-outline);
  transition: transform 0.25s, background-color 0.15s;
}

/* Hover */
.wrap:hover .switch:not(:disabled, .loading) {
  background-color: var(--e-color-elev-2);
}

/* Checked */
.switch[aria-checked="true"] {
  &,
  .wrap:hover &:not(:disabled, .loading) {
    background-color: rgba(var(--e-color-primary-rgb), 0.8);
   // outline-color: var(--e-color-primary);
  }
  .wrap &:not(:disabled, .loading) {
    background-color: var(--e-color-primary);
   // outline-color: var(--e-color-primary);
  }

  .knob {
    background-color: var(--e-color-i-active);
    transform: translateX(var(--translateX));
  }
}

/* Pressed */
.switch:not(:disabled, .loading):active {
  transform: scale(0.9);

  &[aria-checked="false"] {
    .knob {
      transform: translateX(calc(var(--translateX) * 0.1)) scale(0.9);
    }
  }
  &[aria-checked="true"] {
    .knob {
      transform: translateX(calc(var(--translateX) * 0.9)) scale(0.9);
    }
  }
}


@media (prefers-reduced-motion: reduce) {
  .switch {
    transition: background-color 0.4s, outline-color 0.4s;
  }

  .knob {
    transition: background-color 0.4s;
    transform: unset;
  }

  .switch:not(:disabled, .loading):active {
    transform: unset;

    &[aria-checked="false"] {
      background-color: var(--e-color-i-depressed-2);

      .knob {
        transform: unset;
      }
    }
    &[aria-checked="true"] {
      background-color: rgba(var(--e-color-primary-rgb), 0.5) !important;

      .knob {
        transform: translateX(calc(var(--translateX)));
      }
    }
  }
}

.switch:focus-visible {
  outline: var(--e-color-primary) solid 0.125rem;
}

.switch:disabled,
.switch.loading {
  opacity: 0.5;
}

.switch.loading {
  &,
  & ~ .label {
    cursor: progress;
  }
}

.switch:disabled {
  &,
  & ~ .label {
    cursor: not-allowed;
  }
}
</style>
