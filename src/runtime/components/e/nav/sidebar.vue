<template>
  <div class="e-sidebar d-flex flex-column justify-start collapsed-sidebar">
    <slot />
  </div>
  <div class="e-sidebar e-sidebar-extension"><slot /></div>

  <div class="e-sidebar-app-content">
    <slot name="app" />
  </div>
</template>
<script setup lang="ts">
import { reactive } from "#imports";
const props = withDefaults(
  defineProps<{
    collapsedWidth?: number | string;
    width?: number | string;
  }>(),
  { width: "3.5rem" }
);
const state = reactive({
  hover: false,
});
</script>
<style lang="scss" scoped>
.e-sidebar,
.e-sidebar-app-content {
  --collapsed-sidebar-width: v-bind(collapsedWidth);
  --expanded-sidebar-width: 20rem; //v-bind(width);
  --expansion-amount: calc(
    var(--expanded-sidebar-width) - var(--collapsed-sidebar-width)
  );
  --reveal-duration: 0.25s;
}
.e-sidebar {
  height: 100vh;
  width: var(--collapsed-sidebar-width);
  z-index: 6;
  position: fixed;
  left: 0;
  top: 0;
  background-color: var(--e-color-elev-2);
  overflow-x: hidden;
  //  transition: width 0.25s ease-in-out;

  /*&:hover ~ .e-sidebar-app-content {

    transform: translateX(calc(var(--expansion-amount)*0.5));
  }*/
  /* &:hover {
    width: var(--expanded-sidebar-width);

  }*/

  &:hover ~ .e-sidebar-extension {
    transform: translateX(0);
  }
}

.e-sidebar-extension {
  z-index: 5 !important;
  width: var(--expanded-sidebar-width) !important;
  transform: translateX(-99%);
  transition: transform var(--reveal-duration) ease-in-out;
  &:hover {
    transform: translateX(0);
  }
}

.e-sidebar-app-content {
  transition: transform 0.25s ease-in-out;
  background-color: var(--e-color-light);
  width: 100%;
  /* width: -moz-available;          /* WebKit-based browsers will ignore this. */
  width: -webkit-fill-available; /* Mozilla-based browsers will ignore this. */
  width: fill-available;
  height: 100%;
  left: 3.5rem;
  top: 0rem;
  position: absolute;
}
</style>
