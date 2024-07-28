<template>
  <button
    class="e-btn"
    :style="{ width }"
    :type="type"
    :disabled="disabled || loading"
    :class="{
      active,
      inactive,
      solid,
      block,
      rounded: solid,
      'e-disabled': disabled,
      'my-2': solid,
      loading,
      fab,
      colored: background !== 'transparent' || color || solid,
    }"
  >
    <div
      ref="content"
      class="e-btn-content"
    >
      <div
        v-if="loading"
        class="load-overlay"
      >
        <e-loading-spinner />
      </div>
      <span
        class="actual-content d-flex fullwidth"
        :style="{
          justifyContent: justify,
          alignContent: props.align,
          alignItems: props.align,
        }"
      >
        <slot />
      </span>
    </div>
  </button>
</template>
<script lang="ts" setup>
import { computed, useNuxtApp,  } from "#imports";
//import { IonSpinner } from "@ionic/vue";
const { $exakt } = useNuxtApp();
const props = withDefaults(
  defineProps<{
    width?: number | string;
    justify?: string;
    active?: boolean;
    inactive?: boolean;
    solid?: boolean;
    color?: string;
    background?: string;
    block?: boolean;
    loading?: boolean;
    fab?: boolean;
    disabled?: boolean;
    align?: string;
    type?: "button" | "submit" | "reset";
  }>(),
  {
    type: "button",
    background: "primary",
    solid: true,
    width: undefined,
    justify: "center",
    align: "center",
    color: undefined,
  }
);

function parseColor(input: string) {
  const div = document.createElement("div");
  document.body.appendChild(div);
  div.style.color = input;
  const c = getComputedStyle(div).color as any;
  const res = c.match(/[.\d]+/g).map(Number);

  div.remove();
  return { r: res[0], g: res[1], b: res[2] };
}

const backgroundColorRgb = computed(() => {
  if (!props.background || process.server) {
    return { r: 0, g: 0, b: 0 };
  }
  return parseColor(parsedBackgroundProp.value);
});

const parsedBackgroundProp = computed(() =>
  $exakt.parseColor(props.background)
);

const textColor = computed(() => {
  if (props.color) {
    return props.color;
  }
  if (props.background == "transparent") {
    return "var(--e-color-dark)";
  }
  const rgb = backgroundColorRgb.value;

  const brightness = Math.round(
    (299 * rgb.r + 224490 + 587 * rgb.g + 114 * rgb.b) / 2000
  );
  if (brightness > 150) {
    // Dark Text
    return "#000000";
  }
  return "#FFFFFF";
});

const hoverColor = computed(() => {
  if (parsedBackgroundProp.value === "transparent") {
    return "rgba(98, 98, 98, 0.15)";
  }

  const rgb = backgroundColorRgb.value;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.9)`;
});
</script>
<style lang="scss" scoped>
.e-btn-content {
  transition: transform 0.1s ease-in-out;
  flex-direction: row;
  display: flex;
  position: relative;
  align-content: center;
  align-items: center;
  justify-content: stretch;
  flex-grow: 1;
}

.e-btn {
  user-select: none;
  background: rgba(0, 0, 0, 0);
  display: flex;
  font-size: 1rem;

  justify-content: stretch;
  align-content: center;
  align-items: center;
  padding: 0.3rem var(--e-core-padding-x);
  overflow: hidden;
  color: var(--e-color-dark);
  outline: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  border: none;
  text-decoration: none;
  cursor: pointer;
  flex-shrink: 1;
  position: relative;
  transition: background 0.4s, color 0.3s, opacity 0.4s;

  font-family: var(--e-font-family);
  box-sizing: border-box;

  border: transparent solid 0.1rem;

  &:focus-visible {
    transition: border-width 0.2s;
    border: var(--e-color-dark) solid 0.1rem;
  }

  &.loading {
    pointer-events: none;

    .actual-content {
      opacity: 0;
    }
  }

  &:hover {
    background: rgba(98, 98, 98, 0.15);
    border: transparent solid 0.1rem;
  }

  &:active {
    .e-btn-content {
      transform: scale(0.85);
    }
  }

  &.fab {
    position: fixed;
    right: 5rem;
    bottom: 5rem;
    aspect-ratio: 1;
    border-radius: 100%;
    height: 4.2rem;
    z-index: 3;
    padding: 0 !important;
  }

  &.block {
    width: 100%;
  }

  &.colored {
    background-color: v-bind(parsedBackgroundProp);
    color: v-bind(textColor);

    &:hover {
      background-color: v-bind(hoverColor);
    }
  }

  &.solid {
    padding: 0.7rem 0.9rem;
  }

  &.active {
    color: var(--e-color-primary);
  }

  &.inactive {
    color: var(--e-color-dark);
    opacity: 80%;
  }
}

@media screen and (max-width: $e-md-screen-breakpoint) {
  .e-btn.fab {
    right: 1rem;
  }
}

.loading-spinner {
  max-height: 1rem;
}

.load-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}
</style>
