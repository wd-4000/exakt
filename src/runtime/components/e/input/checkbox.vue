<template>
  <label class="d-flex flex-align-center mt-3">
    <input
      v-bind="{ name }"
      v-model="selected"
      type="checkbox"
    >
    <slot />
  </label>
</template>
<script setup lang="ts">
import { computed } from '#imports';

const emit = defineEmits(["update:modelValue"]);
const props = defineProps<{ modelValue: boolean, name?: string }>();


const selected = computed({
    get() {
        return props.modelValue;
    },
    set(v) {
        emit("update:modelValue", v);
    },
});
</script>
<style lang="scss" scoped>
input[type="checkbox"] {
    -webkit-appearance: none;
    appearance: none;
    background-color: var(--e-color-i-inactive);

    margin: 0;
    outline: var(--e-color-i-outline) solid 0.1rem;

    font-family: 'Material Symbols Outlined';
    color: transparent;

    width: 1rem;
    margin-right: 0.6rem;
    height: 1rem;
    border-radius: 0.15em;

    display: flex;

    transition: background-color 0.15s, transform 0.15s;


    &:hover {
        background-color: var(--e-color-elev-2);
    }

    &::before {
        content: "check";
        background-color: var(--e-color-primary);
        border-radius: 0.15em;
        width: 100%;
        text-align: center;
        transform: scale(0);
        transition: transform 0.15s ease-in-out, color 0.15s;
    }

    &:checked::before {
        transform: scale(1);
        color: var(--e-color-i-inactive);

    }
}



input[type="checkbox"]:active {
    transform: scale(0.9);

    &::before {
        color: transparent;
        transform: scale(0.65);
    }
}









input[type="checkbox"]:focus {
    outline: var(--e-color-primary) solid 0.125rem;
    background-color: var(--e-color-i-depressed-active);
    &::before {
        opacity: 0.7;
    }
}

input[type="checkbox"]:disabled {
    --form-control-color: var(--form-control-disabled);

    color: var(--form-control-disabled);
    cursor: not-allowed;
}
</style>