<template>
  <nav :class="{ fixed }">
    <slot />
  </nav>
</template>
<script setup lang="ts">
//const { $hello } = useNuxtApp();
defineProps<{
  fixed?: boolean | false;
}>();
//const colorFromScriptSetup = "green";
</script>
<style lang="scss" scoped>


nav {
  z-index: 5;
  min-height: 3.5rem;
  border-radius: var(--e-rounded-border-radius);
  background: var(--e-color-bg);
  overflow-y: none;
  display: flex;
  align-items: center;
 // position: sticky;
  top: 0;
  left: 0;
}

nav.fixed {
  position: fixed;
  width: 100%;
}


@media screen and (max-width: exakt.$e-md-screen-breakpoint) {
  nav {
    position: fixed;
    bottom: 0;
    top: unset;
    border-radius: 0;
    width: 100%;
    justify-content: stretch;
    margin: 0 !important;
    padding: 0.2rem 0.6rem calc(0.2rem + env(safe-area-inset-bottom)) 0.6rem ;
    background: var(--e-color-elev);
  }
}

</style>
