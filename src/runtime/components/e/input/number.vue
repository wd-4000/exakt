<template>
  <e-input-text
     type="text" inputmode="numeric" pattern="[0-9]*"
    :model-value="props.modelValue?.toString()"
    @update:model-value="updateNum($event)"
  ><slot /></e-input-text>
</template>
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    modelValue?: number | null;
  }>(),
  {
    modelValue: undefined,
  },
);

const emit = defineEmits(["update:model-value", "update:validity"]);
const updateNum = (newValue: string) => {
  const parsed = Number.parseInt(newValue);
  if (Number.isNaN(parsed)) {
    emit("update:validity", false);
    return;
  }

  emit("update:validity", true);
  emit("update:model-value", parsed);
};
</script>
