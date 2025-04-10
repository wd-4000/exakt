<template>
  <div>
    <e-dropdown
      v-model="dropdownActive"
      :items="items"
      :visible="disabled ? false : dropdownVisible"
      v-bind="{ width, hint }"
      @update:visible="dropdownVisible = $event"
      @update:model-value="updateSelection"
    >
      <e-input-text
        v-model="searchFieldComputed"
        v-bind="{ label, placeholder, icon }"
        solid
        @input="inputHandler"
        :disabled="disabled"
        :class="{ 'e-disabled': props.disabled }"
      >
        <slot />
      </e-input-text>
    </e-dropdown>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, computed } from "#imports";
const dropdownActive = ref<undefined | number>(undefined);
const dropdownVisible = ref<boolean>(false);
const props = defineProps<{
  label?: string;
  placeholder?: string;
  width?: string;
  items: { name: string; id: string | number }[];
  modelValue?: number | string;
  value?: string;
  hint?: string;
  icon?: string;
  disabled?: boolean;
}>();
const searchField = ref("");
const emit = defineEmits(["update:modelValue", "update:searchValue"]);
const modified = ref(false);
const updateSelection = ($event: number) => {
  emit("update:modelValue", props.items[$event]?.id);
};

const inputHandler = () => {
  emit("update:searchValue", searchField.value);
  modified.value = true;
  if (searchField.value.length > 0) {
    //dropdownActive.value = 0;
    dropdownVisible.value = true;
    return;
  }
  if (props.hint) {
    dropdownVisible.value = true;
  } else {
    dropdownVisible.value = false;
  }
  dropdownActive.value = undefined;
};

watch(
  () => props.modelValue,
  (modelValue) => {
    if (modelValue) {
      const foundItem = props.items.find(({ id }) => id == modelValue);
      searchField.value = foundItem?.name || "";
    } else {
      searchField.value = "";
    }
  },
);

const searchFieldComputed = computed({
  get: () => {
    if (modified.value) {
      return searchField.value;
    }
    return searchField.value || props.value || "";
  },
  set: (newValue) => {
    searchField.value = newValue;
  },
});

watch(dropdownActive, (value) => {
  if (value == undefined) {
    searchField.value = "";
  } else {
    searchField.value = props.items[value].name;
  }
});
</script>
