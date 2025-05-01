<template>
  <div v-if="label" class="my-3">
    <label> {{ label }} </label>
  </div>
  <e-dropdown
    :items="items"
    :visible="focus"
    :model-value="props.modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    @update:visible="focus = $event"
    :use-ids="useIds"
    v-slot="{ currentItem }"
  >
    <div :class="{ focus }" class="btn rounded">
      <div class="d-flex justify-space-between">
        <div v-if="currentItem" class="flex-center">
          <e-icon size="20">
            {{ currentItem?.icon }}
          </e-icon>
          <div class="ml-2 md-and-over">
            {{ currentItem?.name }}
          </div>
        </div>
        <div v-else />
        <e-icon class="text-secondary ml-1" size="20"> arrow_drop_down </e-icon>
      </div>
    </div>
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
    label?: string;
    useIds?: boolean;
    modelValue: number | undefined;
  }>(),
  {
    items: () => [],
    modelValue: undefined,
    label: undefined,
    useIds: false,
  },
);
</script>
<style lang="scss" scoped>
.btn {
  outline: var(--e-color-i-outline) solid 0.1rem;
  transition:
    outline ease-in-out 0.15s,
    background-color ease-in-out 0.15s;
  margin: 0.125rem;
  user-select: none;
  cursor: pointer;
  padding: 0.7rem 0.9rem;
  background-color: var(--e-color-i-depressed);
  &.focus {
    outline: var(--e-color-primary) solid 0.125rem;
  }
}
</style>
