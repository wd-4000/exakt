<template>
  <div>
    <div class="e-sidebar collapsed d-flex flex-column justify-start">
      <slot name="collapsed" />

      <nuxt-link
        v-for="(item, i) in props.items"
        :key="i"
        :to="item.to"
      >
        <e-btn
          :solid="false"
          justify="center"
          :block="true"
          background="transparent"
          class="pa-0 ma-0 e-sidebar-btn"
        >
          <e-icon  size="22"
        >{{ item.icon }}</e-icon></e-btn>
      </nuxt-link>
    </div>
    <div class="extended e-sidebar">
      <slot name="extension" />

      <nuxt-link
        v-for="(item, i) in props.items"
        :key="i"
        :to="item.to"
      >
        <e-btn
          :solid="false"
          justify="start"
          :block="true"
          background="transparent"
          class="pa-0 ma-0 e-sidebar-btn"
        >
          <div v-if="item.icon" class="icon">
            <e-icon  size="22" >{{ item.icon }} </e-icon>
          </div>
          <div class="ml-4 d-flex flex-column text">
            <div :class="{ 'mb-1': item.subtitle }">
              {{ item.title }}
            </div>
            <div
              v-if="item.subtitle"
              class="text-secondary"
            >
              {{ item.subtitle }}
            </div>
          </div>
        </e-btn>
      </nuxt-link>
    </div>

    <div class="app-content">
      <slot name="app" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, reactive } from "#imports";
const props = withDefaults(
  defineProps<{
    collapsedWidth?: number | string;
    expandedWidth?: number | string;
    buttonHeight: string;
    items: {
      title: string;
      icon: string;
      subtitle?: string;
      to: string;
      position?: "top" | "bottom";
    }[];
    elev: 1 | 2 | 3 | "1" | "2" | "3";
    moveContent: number;
    nestingLevel: number;
  }>(),
  {
    collapsedWidth: "3.5rem",
    expandedWidth: "20rem",
    buttonHeight: "3.5rem",
    elev: 2,
    moveContent: 0.5,
    nestingLevel: 0,
  }
);
const state = reactive({
  hover: false,
});

const background = computed(() =>
  Number(props.elev) == 1
    ? "var(--e-color-elev)"
    : `var(--e-color-elev-${props.elev})`
);
</script>
<style lang="scss" scoped>
.e-sidebar,
.app-content {
  --collapsed-sidebar-width: v-bind(collapsedWidth);
  --expanded-sidebar-width: v-bind(expandedWidth);
  --btn-height: v-bind(buttonHeight);

  --expansion-amount: calc(
    var(--expanded-sidebar-width) - var(--collapsed-sidebar-width)
  );
  --reveal-duration: 0.25s;
}
.e-sidebar {
  height: 100%;
  position: fixed;
  left: 0;
  
  background-color: v-bind("background");
  overflow: clip;
  top: calc(var(--btn-height) * v-bind("props.nestingLevel"));

  &:hover ~ .app-content {
    transform: translateX(
      calc(var(--expansion-amount) * v-bind("props.moveContent"))
    );
  }

  &.collapsed {
    width: var(--collapsed-sidebar-width);
    z-index: 6;
    padding-left: calc(
      var(--collapsed-sidebar-width) * v-bind("props.nestingLevel")
    );

    &:hover ~ .extended {
      transform: translateX(
        calc(var(--collapsed-sidebar-width) * v-bind("props.nestingLevel"))
      );
    }
  }

  &.extended {
    z-index: 5;
    width: var(--expanded-sidebar-width);
    position: fixed;
    // transform: translateX(calc(-1 * var(--expanded-sidebar-width)));
    transform: translateX(-100%);
    transition: transform var(--reveal-duration) ease-in-out;

    &:hover {
      transform: translateX(
        calc(var(--collapsed-sidebar-width) * v-bind("props.nestingLevel"))
      );
    }
  }
}

.app-content {
  transition: transform var(--reveal-duration) ease-in-out;
  background-color: var(--e-color-light);
  width: 100%;
  width: fill-available;
  height: 100%;
  left: 0;
  padding-left: var(--collapsed-sidebar-width);
  top: 0rem;
 position: absolute;
  transform: translateX(0);
}

.e-sidebar-btn {
  min-height: var(--btn-height);

  .icon {
    min-width: calc(
      var(--collapsed-sidebar-width) - 0.1rem * 2
    ); // Compensate the btn's accessibility border

    display: block;
  }

  .text {
    text-align: left;
    max-width: calc(var(--expansion-amount) - 0.1rem * 2);

    display: block;
    flex-grow: 0;
    flex-shrink: 0;
    position: relative;
  }
}

.router-link-active .e-sidebar-btn,
.router-link-exact-active .e-sidebar-btn {
  background-color: rgba(var(--e-color-primary-rgb), 0.25);
}
</style>
