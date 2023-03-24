<template>
  <div class="flex-center color-red">
    <e-icon :icon="mdiAlert" size="19" class="mr-2"></e-icon
    ><small><slot /></small>
  </div>
</template>
<script setup lang="ts">
import { mdiAlert } from "@mdi/js";
</script>
