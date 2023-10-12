<template>
  <div
    class="sidebar"
    @mouseenter="state.hover = true"
    @mouseleave="state.hover = false"
  >
    <e-btn
      :solid="false"
      justify="stretch"
      block
      background="transparent"
      class="pa-0 ma-0 btn"
    >
      <div class="icon">
        <e-icon
          :icon="mdiHome"
          size="22"
        />
      </div>
      <div class="ml-4 d-flex flex-column btn-text">
        <div class="mb-1">
          John Pork
        </div>
        <div class="text-secondary">
          Hey I was wondering if you've got your bogos
          binted
        </div>
      </div>
    </e-btn>
  </div>
  <div class="app-content">
    <slot name="app" />
  </div>
</template>
<script setup lang="ts">
import { reactive } from "#imports";
import { mdiHome } from "@mdi/js";
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
.sidebar,
.app-content {
  --collapsed-sidebar-width: v-bind(collapsedWidth);
  --expanded-sidebar-width: 20rem; //v-bind(width);
  --expansion-amount: calc(
      var(--expanded-sidebar-width) - var(--collapsed-sidebar-width)
    );
}
.sidebar {
  height: 100vh;
  width: var(--collapsed-sidebar-width);
  z-index: 5;
  position: fixed;
  left: 0;
  top: 0;
  background-color: var(--e-color-elev-2);
  overflow-x: hidden;
  transition: width 0.25s ease-in-out;
  .btn-text {
    text-align: left;
    max-width: calc(var(--expansion-amount) - 0.1rem*2);
  }

  &:hover ~ .app-content {

   // transform: translateX(var(--expansion-amount));
  }
  &:hover {
    width: var(--expanded-sidebar-width);

  }
  &:hover .btn-text {
    display: block;
    flex-grow: 0;
    flex-shrink: 0;
    position: relative;
  }
  .btn {
    width: 100%;
    flex-grow: 0;
    flex-shrink: 0;
  }
}

.app-content {
  transition: transform 0.25s ease-in-out;
  background-color: var(--e-color-light);
  width: 100%;
  height: 100%;
  left: 3.5rem;
  top: 0rem;
  position: absolute;
}

.icon {
  min-width: calc(
    var(--collapsed-sidebar-width) - 0.1rem * 2
  ); // Compensate the btn's accessibility border

  display: block;
}


</style>
