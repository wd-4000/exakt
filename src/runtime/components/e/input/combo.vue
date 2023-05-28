<template>
  <e-dropdown
    v-model="dropdownActive"
    :items="items"
    width="100%"
    :center="false"
    :visible="dropdownVisible"
    padding-y="0.25rem"
    @update:visible="dropdownVisible = $event"
  >
    <e-input-text
      v-model="searchField"
      label="Input"
      solid
    />
  </e-dropdown>
</template>
<script setup lang="ts">
import { ref, watch } from "#imports";
const items = [{ name: "test" }, { name: "test2" }, { name: "test3" }];
const dropdownActive = ref<undefined | number>(undefined);
const dropdownVisible = ref<boolean>(false);

const searchField = ref("");

watch(searchField, (value) => {
  if (value.length > 0) {
    //dropdownActive.value = 0;
    dropdownVisible.value = true;
  } else {
    dropdownActive.value = undefined;
    dropdownVisible.value = false;
  }
});

watch(dropdownActive, (value) => {
  if (value == undefined) {
    searchField.value = "";
  } else {
    searchField.value = items[value].name;
  }
});
</script>
