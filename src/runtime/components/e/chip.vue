<template>

    <div class="e-chip py-3 px-4 ma-1 d-flex flex-center" :class="{ active }" @click="active = !active"><e-icon
            icon-style="outlined" size="17" class="mr-1 icon">{{ icon }}</e-icon><e-icon size="17"
            class="mr-1 check">check</e-icon>
        <slot />
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from '#imports';
const props = defineProps<{
    icon: string;
    modelValue: boolean;

}>()
const emit = defineEmits(["update:modelValue"]);

const active = computed({
    get() {
        return props.modelValue;
    },
    set(v) {
        emit("update:modelValue", v);
    },
});
</script>
<style scoped lang="scss">
.e-chip {
    outline: var(--e-color-i-outline) solid 0.1rem;
    width: fit-content;
    background-color: var(--e-color-i-inactive);
    transition: background-color 0.15s;
    border-radius: 15rem;
    user-select: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    cursor: pointer;

    &>.check {
        display: none;
    }

    &.active {
        background-color: var(--e-color-i-active);
        outline: var(--e-color-primary) solid 0.1rem;

        &>.icon {
            display: none;
        }

        &>.check {
            display: inline-block;
        }
    }
}
</style>