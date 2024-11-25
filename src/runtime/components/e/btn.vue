<template>
  <button class="e-btn" :style="{ width }" :type="type" :disabled="disabled || loading" :class="{
    active,
    inactive,
    solid,
    block,
    rounded: solid,
    'e-disabled': disabled,
    'my-2': solid,
    loading,
    fab,
    compact,
    ...backgroundClass
  }">
    <div ref="content" class="e-btn-content">
      <div v-if="loading" class="load-overlay">
        <e-loading-spinner size="1.25" />
      </div>
      <span class="actual-content d-flex fullwidth" :style="{
        justifyContent: justify,
        alignContent: props.align,
        alignItems: props.align,
      }">
        <slot />
      </span>
    </div>
  </button>
</template>
<script lang="ts" setup>
import { computed, useNuxtApp, } from "#imports";
const { $exakt } = useNuxtApp();
const props = withDefaults(
  defineProps<{
    width?: number | string;
    justify?: string;
    active?: boolean;
    inactive?: boolean;
    solid?: boolean;
    compact?: boolean;
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
    compact: false,
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
  return parseColor($exakt.parseColor(props.background));
});

const isRootColor = computed(() =>  $exakt&&$exakt.rootColors && $exakt.rootColors.includes(props.background))
const backgroundClass = computed(() => {
  const c: { [key: string]: boolean } = {}

  if (props.background == 'transparent') {
    c['transparent'] = true;
  } else if (isRootColor.value) {
    c["bg-" + props.background] = true
  } else {
    c['custom-color'] = true
  }

  return c
})
const backgroundColor = computed(() => {
  if (isRootColor.value) { return 'unset' } else {
    return props.background
  }
})
const textColor = computed(() => {
  if (isRootColor.value) {
    return 'unset';
  }
  if (props.color) {
    return props.color;
  }
  if (props.background == "transparent") {
    return "var(--e-color-text)";
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
  display: flex;
  font-size: 1rem;

  justify-content: stretch;
  align-content: center;
  align-items: center;
  padding: 0.3rem var(--e-core-padding-x);
  overflow: hidden;
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

  &.transparent {
    color: var(--e-color-text);
    background: rgba(0, 0, 0, 0);

    &:hover {
      background: rgba(98, 98, 98, 0.15);
      opacity: 1;
    }
  }

  &:focus-visible {
    transition: border-width 0.2s;
    border: var(--e-color-text) solid 0.1rem;
  }

  &.loading {
    pointer-events: none;

    .actual-content {
      opacity: 0;
    }
  }

  &:hover {
    // background: rgba(98, 98, 98, 0.15);
    opacity: 0.7;
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

  &.custom-color {
    background-color: v-bind(backgroundColor);
    color: v-bind(textColor);

    /* &:hover {
      opacity: 0.9;
    } */
  }

  &.solid {
    padding: 0.7rem 0.9rem;

    &.compact {
      padding: 0.6rem 0.8rem;
    }
  }

  &.active {
    color: var(--e-color-primary);

    &.transparent {
      background: rgba(var(--e-color-primary-rgb), 0.1);

      &:hover {
        background: rgba(var(--e-color-primary-rgb),0.075);
        opacity: 1;
      }
    }
  }

  &.inactive {
    color: var(--e-color-text);
    opacity: 80%;
  }
}

@media screen and (max-width: $e-md-screen-breakpoint) {
  .e-btn.fab {
    right: 1rem;
  }
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
