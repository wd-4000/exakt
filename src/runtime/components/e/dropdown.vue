<template>
  <div class="flex-stretch">
    <!-- class="flex-stretch fullwidth" -->
    <div @click="onClick" ref="activator">
      <slot />
    </div>
    <e-focus-sheet v-model="state.active" />
    <e-tr-scale>
      <div class="list rounded" v-if="state.active">
        <component v-for="(item, i) in items" :key="i" class="fullwidth" :is="item.href ? 'a' : 'div'"
          :href="item.href ? item.href : undefined">
          <e-btn justify="start" @click="select(i)" class="item fullwidth" :color="item.color" :solid="false" 
            :background="item.background || 'transparent'" :class="{ active: currentItem === i }"><e-icon v-if="item.icon"
              :size="20" :icon="item.icon" class="mr-2" />
            {{ item.name }}</e-btn>
        </component>
      </div>
    </e-tr-scale>
  </div>
</template>
<script setup lang="ts">

import _ from "lodash";

const { $platform } = useNuxtApp();

function parseWidth(input: string | number) {
  const div = document.createElement("div");
  document.body.appendChild(div);
  div.style.width = String(input);
  const c = getComputedStyle(div).width as any;
  // const res = c.match(/[.\d]+/g).map(Number);

  div.remove();
  return parseInt(c, 10);
}

const updatePosition = () => {
  if (!state.active) {
    window.removeEventListener("resize", debouncedUpdatePosition);
    return;
  }
  const rect = activator.value.getBoundingClientRect();

  const dropdownWidth = parseWidth(props.width);

  state.y = rect.top + rect.height / 2;

  const expectedDropdownRight = window.innerWidth - rect.left - dropdownWidth;

  if (expectedDropdownRight - 50 >= 0) {
    // All is well.
    state.x = rect.left + rect.width / 2;
  } else {
    // We're going to overflow, gah!
    console.log("Overflow");
    state.x = rect.left + rect.width / 2 + expectedDropdownRight - 47;
  }
};

const debouncedUpdatePosition = _.debounce(updatePosition, 200);

const onClick = ({ pageX, pageY }:MouseEvent) => {
  state.active = !state.active;

  if (state.active) {
    updatePosition();
    window.addEventListener("resize", debouncedUpdatePosition);
  } else {
    window.removeEventListener("resize", debouncedUpdatePosition);
  }
};

interface DropdownItem {
  name: string;
  icon?: string;
  href?: string;
  callback?: () => void;
  color?: string;
  background?: string;
}

const props = defineProps<{
  modelValue?: number;
  width: string | number;
  items: DropdownItem[];
}>();

const emit = defineEmits(["update:modelValue"]);

const activator = ref();

const state = reactive({
  active: false,
  x: 0,
  y: 0,
});

const currentItem = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});



const select = (i: number) => {
  state.active = false;
  currentItem.value = i;
};
</script>
<style scoped lang="scss">
.list {
  position: fixed;
  left: v-bind('state.x + "px"');
  top: v-bind('state.y + "px"');
  width: v-bind(width);
  display: flex;


  background-color: var(--e-color-elev-2);
  color: var(--e-color-dark);
  z-index: 4;

  flex-shrink: 1;
  flex-direction: column;
  overflow: clip;
  justify-items: stretch;

  .item {
    // color: var(--e-color-dark);
    font-size: 1rem;
    padding: 0.7rem;
    text-transform: capitalize;

    &.active {
      background-color: rgba(var(--e-color-primary-rgb), 0.2);

    }
  }
}



@media screen and (max-width: $e-md-screen-breakpoint) {
  .list {
    top: unset;
    bottom: 0px;
    left: 0px;
    width: 100vw;
    flex-shrink: 0;

    .item {
      padding: 1rem;
      font-size: 1.1rem;
    }
  }
}

.main-btn {
  font-size: 1rem;
}
</style>
