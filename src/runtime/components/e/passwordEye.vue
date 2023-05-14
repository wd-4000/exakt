<template>
  <e-icon-button
    class="rounded pa-1"
    size="20"
    :icon="modelValue ? mdiEye : mdiEyeOff"
    @click.stop="emit('update:modelValue', !modelValue)"
  />
</template>
<script setup lang="ts">
import { mdiEye, mdiEyeOff } from "@mdi/js";
const emit = defineEmits(["update:modelValue"]);
defineProps(["modelValue"]);
</script>
