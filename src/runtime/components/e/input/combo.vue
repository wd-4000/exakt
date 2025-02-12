<template>
  <div>
    <e-dropdown v-model="dropdownActive" :items="items" :visible="disabled ? false : dropdownVisible" v-bind="{ width }"
      @update:visible="dropdownVisible = $event" @update:model-value="updateSelection">
      <e-input-text v-model="searchField" v-bind="{ label, placeholder, icon }" solid :disabled="disabled"
        :class="{ 'e-disabled': props.disabled }">
        <slot />
      </e-input-text>
    </e-dropdown>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "#imports";
const dropdownActive = ref<undefined | number>(undefined);
const dropdownVisible = ref<boolean>(false);
const props = defineProps<{ label?: string, placeholder?: string, width?: string, items: { name: string, id: string | number }[], modelValue?: number | string, icon?: string, disabled?: boolean }>()
const searchField = ref("");
const emit = defineEmits(["update:modelValue", "update:searchValue"]);

const updateSelection = ($event: number) => {
  emit('update:modelValue', props.items[$event]?.id)
}

watch(searchField, (value) => {
  emit("update:searchValue", value)
  if (value.length > 0) {
    //dropdownActive.value = 0;
    dropdownVisible.value = true;
  } else {
    dropdownActive.value = undefined;
    dropdownVisible.value = false;
  }
});

watch(() => props.modelValue, (value) => {
  if (!value) {
    searchField.value = "";

  }
  const foundItem = props.items.find(({ id }) => id == value);
  searchField.value = foundItem?.name || "";
})

watch(dropdownActive, (value) => {
  if (value == undefined) {
    searchField.value = "";
  } else {
    searchField.value = props.items[value].name;
  }
});
</script>
