<template>
  <e-nav-sidebar collapsed-width="3.5rem">
    <template #app>
      <div>Sidebar example</div>
    </template><template>
      <e-nav-sidebar-btn
        title="John Pork"
        subtitle="hi i'm john pork"
        :icon="mdiHome"
      />
    </template>
  </e-nav-sidebar>
</template>
<script setup lang="ts">
import  { mdiHome } from '@mdi/js';

</script>
