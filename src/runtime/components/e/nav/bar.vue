<template>
  <nav class="d-flex flex-align-center" :class="{ fixed }">

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
.nav-content {
  display: flex;
  align-items: stretch;
  height: 100%;
}

nav {
  z-index: 5;
  min-height: 3.5rem;
  border-radius: var(--e-rounded-border-radius);
  background: var(--e-color-bg);
overflow-y: scroll;
 // position: sticky;
  top: 0;
  left: 0;
}

nav.fixed {
  position: fixed;
  width: 100%;
}

/*
@media screen and (max-width: $e-md-screen-breakpoint) {
  nav {
    position: fixed;
    bottom: 0;
    top: unset;
    border-radius: 0;
    width: 100%;
    background: var(--e-color-elev);
  }
}
  */
</style>
