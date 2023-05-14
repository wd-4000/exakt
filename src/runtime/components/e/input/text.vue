<template>
  <div class="pos-wrap">
    <div
      class="wrapper fullwidth"
      :style="inputState.overtakeStyle"
      :class="{ rounded: solid, solid }"
      @click="focus"
    >
      <e-icon
        v-if="icon"
        :icon="icon"
        size="21"
      />
      <textarea
        v-if="type === 'textarea'"
        ref="input"
        v-model="currentText"
        class="input"
        :placeholder="label"
        autocomplete="off"
        auto-grow
        rows="5"
        @focus="inputState.focused = true"
        @blur="inputState.focused = false"
      />
      <input
        v-else
        ref="input"
        v-model="currentText"
        :disabled="disabled"
        :type="type"
        :autocomplete="autocomplete"
        :spellcheck="spellcheck"
        class="input"
        :required="required"
        :placeholder="label"
        @click.stop=""
        @focus="inputState.focused = true"
        @blur="inputState.focused = false"
        @transitionend="transitionEnd"
      >
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, reactive, computed } from "#imports";

const inputState = reactive({
  overtakeStyle: "",
  autofilled: false,
  focused: false,
});

const input = ref<HTMLInputElement>();
const emit = defineEmits(["update:modelValue"]);

const focus = () => {
  if (!input.value) {
    return;
  }
  const length = input.value.value.length;

  // Not all input types support setSelectionRange
  if (
    !inputState.focused &&
    ["text", "search", "URL", "tel", "password"].includes(props.type)
  ) {
    input.value.setSelectionRange(length, length);
  }
  input.value.focus();
};

const currentText = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const props = withDefaults(
  defineProps<{
    icon?: string | undefined;
    label: string;
    modelValue?: string;
    solid?: boolean;
    type?: string;
    autocomplete?: string;
    disabled?: boolean;
    required?: boolean;
    focus?: boolean;
    spellcheck?: boolean;
    height?: string;
  }>(),
  {
    icon: undefined,
    label: "Search",
    solid: false,
    type: "text",
    modelValue: "",
    autocomplete: "off",
    height: "unset",
  }
);

watch(
  () => props.focus,
  (value) => {
    if (value) {
      focus();
    }
  }
);

const getInputStyle = (prop: string) => {
  const c = getComputedStyle(input.value)[prop] as any;
  return c;
};

const transitionEnd = () => {
  inputState.autofilled = !inputState.autofilled;

  if (inputState.autofilled) {
    inputState.overtakeStyle = `color: ${getInputStyle(
      "color"
    )}; background-color: ${getInputStyle("background-color")};`;
    return;
  }
  inputState.overtakeStyle = "";
};
</script>
<style scoped lang="scss">
.pos-wrap {
  display: flex;
  align-content: stretch;
  align-items: stretch;
  justify-content: stretch;
  width: 100%;
  box-sizing: border-box;

  // padding: 0px var(--e-core-padding-x);
}
.input {
  border: none;
  box-sizing: border-box;
  background-color: transparent;
  width: 100%;
  outline: none;
  resize: none;
  margin: var(--e-core-padding-x) / 2;
  font-size: 1rem;
  color: var(--e-color-dark);
  font-family: var(--e-font-family);
  height: v-bind(height);

  &:-webkit-autofill {
    // Expose a hook for JavaScript when auto fill is shown.
    // JavaScript can capture 'animationstart' events
    animation-name: onAutoFillStart;
    //color: white !important;
    // Make the backgound color become yellow _really slowly_
    transition: background-color 0.1s ease-in-out 0s;
  }

  &:not(:-webkit-autofill) {
    // Expose a hook for JS onAutoFillCancel
    // JavaScript can capture 'animationstart' events
    animation-name: onAutoFillCancel;
    transition: background-color 0.1s ease-in-out 0s;
  }
}

.itemform.textarea {
  overflow-y: hidden;
}

.wrapper {
  transition: background-color 0.2s;
  box-sizing: border-box;
  display: flex;
  align-content: center;
  justify-content: stretch;
  align-items: center;
  justify-items: stretch;

  position: relative;

  background-color: transparent;
  color: var(--e-color-dark);
  padding: 10px;

  overflow: clip;
}

.wrapper.solid {
  padding: 15px;
  background-color: var(--e-color-elev);
}

.fullwidth {
  width: 100%;
}

.wrapper:active {
  background-color: rgba(var(--e-color-elev-2-rgb), 0.4);
}

.input::-ms-reveal {
  display: none;
}
</style>
