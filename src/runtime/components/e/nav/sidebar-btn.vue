<template>
  <nuxt-link :to="to">
    <e-btn
      :solid="false"
      justify="start"
      :block="true"
      background="transparent"
      class="pa-0 ma-0 e-sidebar-btn"
    >
      <div
        v-if="icon"
        class="e-sidebar-btn-icon"
      >
        <e-icon
      
          size="22"
        >
          {{ icon }}
        </e-icon>
      </div>
      <div class="ml-4 d-flex flex-column e-sidebar-btn-text">
        <div class="mb-1">
          {{ title }}
        </div>
        <div
          v-if="subtitle"
          class="text-secondary"
        >
          {{ subtitle }}
        </div>
      </div>
    </e-btn>
  </nuxt-link>
</template>
<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
  icon?: string;
  to: string;
}>();
</script>
<style lang="scss" scoped>
.e-sidebar-btn-text {
  text-align: left;
  max-width: calc(var(--expansion-amount) - 0.1rem * 2);

  display: block;
  flex-grow: 0;
  flex-shrink: 0;
  position: relative;
}
.e-sidebar-btn {
  min-height: 5rem;
}

.e-sidebar-btn-icon {
  min-width: calc(
    var(--collapsed-sidebar-width) - 0.1rem * 2
  ); // Compensate the btn's accessibility border

  display: block;
}

.router-link-active  .e-sidebar-btn, .router-link-exact-active  .e-sidebar-btn {
  background-color: rgba(var(--e-color-primary-rgb), 0.25);
}
</style>
