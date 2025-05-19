<template>
  <e-undecorated-link :to="to" :class="{ 'grow-on-mobile': responsive }">
    <e-btn
      :solid="true"
      background="transparent"
      class="nav-btn"
      :class="{ 'grow-on-mobile': responsive, 'pa-3': !label }"
      align="center"
      :active="active"
      :button="false"
    >
      <div class="content" :class="{ responsive }">
        <div
          v-if="icon"
          class="icon-wrapper flex-center"
          :class="{ 'mr-2': label }"
        >
          <e-icon
            class="icon"
            :fill="active"
            icon-style="outlined"
            :size="label ? 20 : 25"
          >
            {{ icon }}
          </e-icon>
          <transition name="fade">
            <div v-if="alert" class="icon-alert" />
          </transition>
        </div>
        <p v-if="label">
          {{ label }}
        </p>
        <slot />
      </div>
    </e-btn>
  </e-undecorated-link>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    to?: string;
    label?: string;
    icon?: string;
    alert?: boolean;
    responsive?: boolean;
    excludeActive?: string[];
  }>(),
  { to: "", label: "", icon: "", responsive: true },
);

const route = useRoute();

const active = computed(() => {
  if (!route || !route.path) {
    return false;
  }

  let excluded = false;
  if (props.excludeActive) {
    for (const e of props.excludeActive) {
      if (route.path.startsWith(e)) {
        excluded = true;
        break;
      }
    }
  }
  return !excluded && route.path.startsWith(props.to);
});
</script>

<style scoped lang="scss">
/*a.router-link-active > .nav-btn {
  color:var(--e-color-primary) !important;
  background-color: rgba(var(--e-color-primary-rgb), 0.075);
}*/

a {
  border-radius: var(--e-rounded-border-radius);
}

.content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-items: center;

  p {
    margin: 0;
    padding: 0;
    white-space: nowrap;
  }
}

.icon-wrapper {
  position: relative;
  box-sizing: border-box;
  aspect-ratio: 1;

  .icon-alert {
    // Add a blue dot to the bottom right of the icon
    content: "";
    position: absolute;
    width: 0.5rem;
    z-index: 2;
    height: 0.5rem;
    border-radius: 100%;
    bottom: 0.1rem;
    right: 0px;
    background-color: var(--e-color-primary);
    outline: 0.1rem solid var(--e-color-elev);
  }
}

@media screen and (max-width: exakt.$e-md-screen-breakpoint) {
  .grow-on-mobile {
    flex-grow: 1;
    width: 100%;
  }

  .content.responsive {
    flex-direction: column;

    .icon-wrapper {
      margin-right: 0rem;
    }

    p {
      margin: 0px;
      white-space: nowrap;
      font-size: 0.6rem;
    }
  }
}
</style>
