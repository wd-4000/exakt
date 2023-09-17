<template>
  <div class="sidebar" @mouseenter="state.hover=true" @mouseleave="state.hover=false">
<e-btn :solid="false" justify="stretch" block background="transparent" class="btn"><e-icon
:icon="mdiHome" size="22"/><div class="onhover ml-4">Home</div></e-btn>
  </div>
  <div class="app-content">
    <slot />
  </div>
</template>
<script setup lang="ts">
import { reactive } from "#imports";
import { mdiHome } from "@mdi/js";
const state = reactive({
  hover: false,
});
</script>
<style lang="scss" scoped>

.navbtn{
    height:3.5rem;
}
.sidebar {
  height: 100vh;
  width: 3.5rem;
  z-index: 5;
  position: fixed;
  left: 0;
  top: 0;
  background-color: var(--e-color-elev-2);
  transition: width 0.3s ease-in-out;
  overflow-x: hidden;
  .onhover {
    display: none;
  }

  &:hover {
    width: 15rem;
  }

  &:hover ~ .app-content {
    transform: translateX(5rem);
  }

  &:hover .onhover {
    display: block;
    position: relative;
    flex-grow: 0;
    flex-shrink: 0;
  }

  &:hover .btn{
    width:100%;
  }
}

.logo {
  height: 3.5rem;

  flex-grow: 0;
  flex-shrink: 0;
}
.textlogo {
  text-align: left;
}
.app-content {
  transition: transform 0.25s ease-in-out;
}

.btn{
    transition: all 0.3s ease-in-out;
    height:3.5rem;
    width: 3.5rem;
}
</style>
