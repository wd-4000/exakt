<template>
  <div>
    <div
      v-if="label"
      class="mb-3 mt-6"
    >
      <label :for="id">
        {{ label }} </label>
    </div>

    <div
      class="wrapper fullwidth"
      :style="inputState.overtakeStyle"
      :class="{ rounded: rounded == undefined ? solid : rounded, solid, compact }"
      @click="focus"
    >
      <e-icon
        v-if="icon"
        class="mr-2"
        size="19"
        fill="true"
      >
        {{ icon }}
      </e-icon>
      <textarea
        v-if="type === 'textarea'"
        ref="input"
        v-model="currentText"
        class="input"
        :name="name"
        :placeholder="placeholder"
        autocomplete="off"
        auto-grow
        rows="5"
        @focus="inputState.focused = true"
        @blur="inputState.focused = false"
      />
      <input
        v-else
        :id="id"
        ref="input"
        v-model="currentText"
        :disabled="disabled"
        :type="type"
        :name="name"
        :autocomplete="autocomplete"
        :spellcheck="spellcheck"
        class="input"
        :required="required"
        :placeholder="placeholder"
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
import { ref, watch, reactive, computed, useId, onMounted } from "#imports";

const inputState = reactive({
  overtakeStyle: "",
  autofilled: false,
  focused: false,
});

const id = useId();

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

const internalText = ref<string | null>(null)


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

const props = withDefaults(
  defineProps<{
    icon?: string;
    label?: string;
    placeholder?: string;
    name?: string;
    modelValue?: string;
    defaultValue?: string;
    solid?: boolean;
    rounded?: boolean;
    type?: string;
    autocomplete?: string;
    disabled?: boolean;
    required?: boolean;
    focus?: boolean;
    spellcheck?: boolean;
    height?: string;

    compact?: boolean;
  }>(),
  {
    icon: undefined,
    label: "",
    solid: true,
    type: "text",
    modelValue: "",
    autocomplete: "off",
    height: "unset",
    compact: false,
    rounded: undefined,
    placeholder: undefined,
    name: undefined,
    defaultValue: undefined
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
  if (input.value === undefined) return;
  const c = getComputedStyle(input.value).getPropertyValue(prop);
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
  color: var(--e-color-text);
  font-family: var(--e-font-family);
  height: v-bind(height);
  transition: outline ease-in-out 0.15s, background-color ease-in-out 0.15s;

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
  color: var(--e-color-text);
  padding: 10px;
  outline: var(--e-color-i-outline) solid 0.1rem;
  //box-shadow: 0 0 0 0.1rem  var(--e-color-i-outline);

  overflow: clip;
  transition: outline ease-in-out 0.15s, background-color ease-in-out 0.15s;
}

.wrapper.solid:has(:focus) {
  outline: var(--e-color-primary) solid 0.125rem;
  //box-shadow: 0 0 0 0.125rem  var(--e-color-primary);

  background-color: var(--e-color-i-depressed-active);

}

.wrapper.solid {
  padding: 0.8rem 1rem;
  background-color: var(--e-color-i-depressed);

  @media screen and (min-width: exakt.$e-md-screen-breakpoint) {
    &.compact {
      padding: 0.6rem 0.8rem;
    }
  }
}





.fullwidth {
  width: 100%;
}

.wrapper:active {
  background-color: var(--e-color-i-depressed-2) !important;
  outline: var(--e-color-primary) solid 0.2rem !important;
}

.input::-ms-reveal {
  display: none;
}
</style>
