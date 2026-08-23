<template>
  <nav :class="{ fixed }">
    <slot />
  </nav>
</template>
<script setup lang="ts">
defineProps<{
  fixed?: boolean;
}>();
</script>
<style lang="scss" scoped>
nav {
  z-index: 5;
  min-height: 3.5rem;
  border-radius: var(--e-rounded-border-radius);
  background: var(--e-color-bg);
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

nav.fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}

@media screen and (max-width: exakt.$e-md-screen-breakpoint) {
  nav {
    position: fixed;
    bottom: 0;
    top: unset;
    left: 0;
    border-radius: 0;
    width: 100%;
    justify-content: stretch;
    margin: 0 !important;
    padding: 0.2rem 0.6rem calc(0.2rem + env(safe-area-inset-bottom)) 0.6rem;
    gap: 0.2rem;
    background: var(--e-color-elev);
  }
}
</style>
