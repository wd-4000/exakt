<template>
  <e-undecorated-link :to="to" class="grow-on-mobile">
    <e-btn :solid="true" background="transparent" class="nav-btn grow-on-mobile" align="center" :active="active">
      <div class="content">
        <div v-if="icon" class="icon-wrapper flex-center mr-2">
          <e-icon class="icon" size="20" :fill="active">
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
    size?: string;
    alert?: boolean;
  }>(),
  { to: "", label: "", icon: "" }
);

const route = useRoute();



const active = computed(() => {
  return route && route.path === props.to;
});
const inactive = computed(() => {
  return !active.value && Boolean(props.icon);
});
</script>

<style scoped lang="scss">
/*a.router-link-active > .nav-btn {
  color:var(--e-color-primary) !important;
  background-color: rgba(var(--e-color-primary-rgb), 0.075);
}*/



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


@media screen and (max-width: $e-md-screen-breakpoint) {

  .grow-on-mobile {
    flex-grow: 1;
    width: 100%;
  }

  p {
    margin: 0px;
    white-space: nowrap;
    font-size: small;

  }

  .content {
    flex-direction: column;

    .icon-wrapper {
      margin-right: 0rem;
    }
  }
}
</style>
