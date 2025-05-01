<template>
  <e-dropdown
    :items="items"
    :visible="focus"
    :model-value="props.modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    @update:visible="focus = $event"
  >
    <e-btn background="i-depressed" :class="{ focus }" class="btn">
      <div class="d-flex justify-space-between">
        <div
          v-if="modelValue != undefined && items[modelValue]"
          class="flex-center"
        >
          <e-icon size="20">
            {{ items[modelValue].icon }}
          </e-icon>
          <div class="ml-2 md-and-over">
            {{ items[modelValue].name }}
          </div>
        </div>
        <div v-else />
        <e-icon class="text-secondary ml-1" size="20"> arrow_drop_down </e-icon>
      </div>
    </e-btn>
  </e-dropdown>
</template>
<script setup lang="ts">
import { ref } from "#imports";
const focus = ref(false);

interface DropdownItem {
  name: string;
  icon?: string;
  href?: string;
  to?: string;
  callback?: () => void;
  color?: string;
  background?: string;
}

const emit = defineEmits(["update:modelValue"]);

const props = withDefaults(
  defineProps<{
    items: DropdownItem[] | [];
    modelValue: number | undefined;
  }>(),
  { items: () => [], modelValue: undefined },
);
</script>
<style lang="scss" scoped>
.btn {
  outline: var(--e-color-i-outline) solid 0.1rem;
  transition:
    outline ease-in-out 0.15s,
    background-color ease-in-out 0.15s;
  margin: 0.125rem;
  &.focus {
    outline: var(--e-color-primary) solid 0.125rem;
  }
}
</style>
