<template>
  <nav
    class="nav bg-elev e-blur"
    :class="{ fixed }"
  >
    <e-container
      :no-btn-padding="true"
      :force-full-width="true"
    >
      <div class="nav-content">
        <slot />
      </div>
    </e-container>
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

.nav {
  z-index: 5;
  height: 3.5rem;
  box-shadow: 0 0 0 0.06rem rgba(0, 0, 0, 0.12) !important;

  position: sticky;
  top: 0;
}

.nav.fixed {
  position: fixed;
  width: 100%;
}
</style>
