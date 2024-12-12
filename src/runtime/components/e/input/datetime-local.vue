<template>
    <div>
        <div class="pb-2" v-if="label"> <label :for="id" class="text-secondary">{{ label }}</label></div>
        <input :id="id" type="datetime-local" class="py-3 px-4" :name="name" v-model="currentText" :required="required"
            :disabled="disabled" />
    </div>
</template>
<script setup lang="ts">
import { ref, watch, reactive, computed, useId, onMounted } from "#imports";


const props = withDefaults(
    defineProps<{
        label?: string;
        name?: string;
        modelValue?: string;
        defaultValue?: string;
        disabled?: boolean;
        required?: boolean;
    }>(),
    {
        label: "",
        modelValue: "",
    }
);

const id = useId();

const internalText = ref<string | null>(null)
const emit = defineEmits(["update:modelValue"]);


const currentText = computed({
    get: () => {
        const setValue = props.modelValue == undefined ? internalText.value : props.modelValue

        if (!setValue || !setValue.length) {
            return props.defaultValue || ''
        }

        return setValue
    },
    set: (value) => { if (props.modelValue == undefined) { internalText.value = value } else { emit("update:modelValue", value) } },
});

onMounted(() => {
    if (props.defaultValue) {
        currentText.value = props.defaultValue
    }
})


</script>
<style lang="scss" scoped>

input[type=datetime-local] {
    border-radius: var(--e-rounded-border-radius);
    border: none;
    outline: var(--e-color-i-outline) solid 0.1rem;
    background-color: var(--e-color-i-depressed);

    transition: outline ease-in-out 0.15s, background-color ease-in-out 0.15s;

    &:active {
        background-color: var(--e-color-i-depressed-2) !important;
        outline: var(--e-color-primary) solid 0.2rem !important;
    }

    &:focus-within {
        outline: var(--e-color-primary) solid 0.125rem;
        //box-shadow: 0 0 0 0.125rem  var(--e-color-primary);
        background-color: var(--e-color-i-depressed-active);
    }

}


::-webkit-datetime-edit {
    font-family: var(--e-font-family);
}
</style>