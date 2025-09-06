<template>
  <div class="material-symbol" :icon-style="iconStyle">
    <slot />
  </div>
</template>
<script setup lang="ts">
import { computed } from "#imports";

const props = withDefaults(
  defineProps<{
    iconStyle?: "outlined" | "rounded" | "sharp";
    size?: number | `${number}`;
    fill?: boolean | "0" | "1" | `${boolean}`;
    grade?: number | `${number}`;
    weight?: number | `${number}`;
  }>(),
  { iconStyle: "outlined", size: 24, fill: true, weight: 400, grade: 0 },
);

const sizePx = computed(() => props.size + "px");
const fillNum = computed(() => {
  if ([true, "true", "1"].includes(props.fill)) {
    return 1;
  }
  return 0;
});
</script>
<style lang="scss">
.material-symbol {
  font-weight: normal;
  font-style: normal;
  /* Preferred icon size */
  display: inline;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
  user-select: none;
}

.material-symbol[icon-style="outlined"] {
  font-family: "Material Symbols Outlined";
}

.material-symbol[icon-style="rounded"] {
  font-family: "Material Symbols Rounded";
}

.material-symbol[icon-style="sharp"] {
  font-family: "Material Symbols Sharp";
}
</style>
<style scoped lang="scss">
.material-symbol {
  font-size: v-bind("sizePx");
  width: v-bind("sizePx");
  height: v-bind("sizePx");
  font-variation-settings:
    "FILL" v-bind("fillNum"),
    "wght" v-bind("props.weight"),
    "GRAD" v-bind("props.grade"),
    "opsz" v-bind("props.size");
}
</style>
