<template>
  <div>
    <div
      v-if="label"
      class="pb-2"
    >
      <label
        :for="id"
        class="text-secondary"
      >{{ label }}</label>
    </div>
    <input
      :id="id"
      :class="{ error: props.error }"
      v-model="currentText"
      v-bind="{ required, disabled, type, name }"
      class="py-3 px-4"
    >
    <p
      v-if="error || hint"
      :id="id + '-subtext'"
      class="text-secondary pt-3"
      :class="{ 'subtext-error': !!error }"
    >
      {{ typeof error === 'string' ? error : hint }}
    </p>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, useId, onMounted } from "#imports";

const props = withDefaults(
  defineProps<{
    label?: string;
    name?: string;
    modelValue?: string;
    defaultValue?: string;
    disabled?: boolean;
    required?: boolean;
    error?: string | boolean;
    hint?: string;
    type?: string;
  }>(),
  {
    label: "",
    modelValue: "",
    name: undefined,
    type: "datetime-local",
    defaultValue: undefined,
    hint: undefined,
    error: undefined,
  },
);

const id = useId();

const internalText = ref<string | null>(null);
const emit = defineEmits(["update:modelValue"]);

const currentText = computed({
  get: () => {
    const setValue =
      props.modelValue === undefined ? internalText.value : props.modelValue;

    if (!setValue || !setValue.length) {
      return props.defaultValue || "";
    }

    return setValue;
  },
  set: (value) => {
    if (props.modelValue === undefined) {
      internalText.value = value;
    } else {
      emit("update:modelValue", value);
    }
  },
});

onMounted(() => {
  if (props.defaultValue) {
    currentText.value = props.defaultValue;
  }
});
</script>
<style lang="scss" scoped>
input[type="datetime-local"],
input[type="date"] {
  border-radius: var(--e-rounded-border-radius);
  border: none;
  outline: var(--e-color-i-outline) solid 0.1rem;
  background-color: var(--e-color-i-depressed);
  font-family: var(--e-font-family);

  transition:
    outline ease-in-out 0.15s,
    background-color ease-in-out 0.15s;

  &:active {
    background-color: var(--e-color-i-depressed-2) !important;
    outline: var(--e-color-primary) solid 0.2rem !important;
  }

  &.error {
    background-color: color-mix(in srgb, var(--e-color-red) 5%, var(--e-color-i-depressed));
    outline:  color-mix(in srgb, var(--e-color-red) 50%, var(--e-color-i-outline)) solid 0.125rem;

    &:has(:focus) {
      outline: var(--e-color-red) solid 0.125rem;
      background-color: color-mix(in srgb, var(--e-color-red) 12%, var(--e-color-i-depressed-active));
    }

    &:active {
      outline: var(--e-color-red) solid 0.2rem !important;
      background-color: color-mix(in srgb, var(--e-color-red) 12%, var(--e-color-i-depressed-2));

    }
  }

  &:focus-within {
    outline: var(--e-color-primary) solid 0.125rem;
    //box-shadow: 0 0 0 0.125rem  var(--e-color-primary);
    background-color: var(--e-color-i-depressed-active);
  }
}

::-webkit-datetime-edit,
::-webkit-date-edit {
  font-family: var(--e-font-family);
}

.subtext-error {
  color: var(--e-color-red);
  opacity: 1;
}

</style>
