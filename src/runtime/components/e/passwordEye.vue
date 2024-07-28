<template>
  <e-icon-button
    class="rounded pa-1"
    size="20"
    :icon="modelValue ? 'visibility' : 'visibility_off'"
    @click.stop="emit('update:modelValue', !modelValue)"
  />
</template>
<script setup lang="ts">
const emit = defineEmits(["update:modelValue"]);

withDefaults(
  defineProps<{
    modelValue: boolean;
  }>(),
  {
    modelValue: false,
  }
);
</script>
