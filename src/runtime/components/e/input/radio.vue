<template>
  <label
    v-for="(item, i) in items"
    :key="i"
    class="label mb-5"
  >
    {{ item[useKey] }}
    <div
      v-if="useSecondaryKey && item[useSecondaryKey]"
      class="text-secondary"
    >{{ item[useSecondaryKey] }}</div>
    <input
      v-model="selected"
      type="radio"
      name="radio"
      :value="i"
    >
    <span class="checkmark" />
  </label>
</template>
<script lang="ts" setup>
import {computed} from '#imports';
const props = defineProps<{
  items: { [key: string]: string }[];
  modelValue?: number;
  useKey: string;
  useSecondaryKey?:string;
}>();

const emit = defineEmits(["update:modelValue"]);

const selected = computed({
  get() {
    return props.modelValue;
  },
  set(v) {
    emit("update:modelValue", v);
  },
});
</script>
<style scoped lang="scss">
* {
  box-sizing: border-box;
}

/* The label */
.label {
  display: block;
  position: relative;
  padding-left: 35px;
  cursor: pointer;
  font-size: 1.1rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default radio button */
.label input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* Create a custom radio button */
.checkmark {
  --size: 1.5rem;

  position: absolute;
  top: 0;
  left: 0;
  height: var(--size);
  width: var(--size);
  background-color: var(--e-color-i-inactive);
  outline: var(--e-color-i-outline) solid 0.1rem; 

  border-radius: 50%;
  transition: background-color 0.15s, transform 0.25s;
}

/* Hover */
.label:hover input~.checkmark {
  background-color: var(--e-color-elev-2);
}

.label:active input {
  &~.checkmark {
    transform: scale(0.85);
  }

  &~.checkmark::after {
    transform: scale(1) !important;
    background-color: var(--e-color-primary);
  }


}

/* Checked */
.label input:checked~.checkmark {
  background-color: var(--e-color-primary);
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.label input:checked~.checkmark:after {
  transform: scale(1);
}

/* Style the indicator (dot/circle) */
.label .checkmark:after {
  --size: 0.6rem;

  display: block;
  top: 50%;
  left: 50%;
  margin-top: calc(var(--size) * -0.5);
  margin-left: calc(var(--size) * -0.5);
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background: var(--e-color-i-active);
  transform: scale(0);
  transition: transform 0.25s;
  box-sizing: border-box;


}
</style>
