<template>
  <nuxt-link to="/sidebar">
    <e-btn
      :solid="false"
      justify="center"
      :block="true"
      background="transparent"
      class="pa-0 ma-0 e-sidebar-icon"
    >   <e-icon
       
          size="22"
        >home</e-icon></e-btn>
   </nuxt-link>
</template>
<script lang="ts" setup>
</script>
<style lang="scss">

.router-link-active  .e-sidebar-icon, .router-link-exact-active  .e-sidebar-icon {
  background-color: rgba(var(--e-color-primary-rgb), 0.25);
}

.e-sidebar-icon {
  min-height: 5rem;
}
</style>