<template>
  <div
    class="e-chip py-3 px-4 ma-1 flex-center"
    :class="{ active, 'bg-i-active':active, 'bg-i-inactive':!active }"
    @click="active = !active"
  >
    <e-icon
      :fill="false"
      size="17"
      class="mr-2 icon"
    >
      {{ icon }}
    </e-icon><e-icon
      size="17"
      class="mr-2 check"
    >
      check
    </e-icon>
    <slot />
  </div>
</template>
<script setup lang="ts">
import { computed } from '#imports';
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
    transition: background-color 0.15s;
    border-radius: 15rem;
    user-select: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    cursor: pointer;
    display: inline-flex;

    &>.check {
        display: none;
    }

    &.active {
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