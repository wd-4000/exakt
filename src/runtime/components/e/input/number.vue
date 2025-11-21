<template>
  <e-input-text
    type="number"
    v-bind="{ ...props, modelValue: props.modelValue?.toString() }"
    @update:model-value="updateNum($event)"
  />
</template>
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    icon?: string;
    label?: string;
    placeholder?: string;
    name?: string;
    modelValue?: number;
    defaultValue?: string;
    solid?: boolean;
    rounded?: boolean;
    autocomplete?: string;
    disabled?: boolean;
    required?: boolean;
    focus?: boolean;
    spellcheck?: boolean;
    height?: string;
    width?: string;
    compact?: boolean;
  }>(),
  {
    icon: undefined,
    label: "",
    solid: true,
    modelValue: undefined,
    autocomplete: "off",
    height: "unset",
    width: "100%",
    compact: false,
    rounded: undefined,
    placeholder: undefined,
    name: undefined,
    defaultValue: undefined,
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
