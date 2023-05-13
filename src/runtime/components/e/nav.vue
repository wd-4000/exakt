<template>
  <nav class="nav e-blur" :class="{ fixed }">
    <e-container :noBtnPadding="true"
      ><div class="nav-content">
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

  background-color: var(--e-color-elev);
  position: sticky;
  top: 0;
}

.nav.fixed {
  position: fixed;
  width: 100%;
}
</style>
