<template>
  <div class="flex-stretch t-dropdown">
    <!-- class="flex-stretch fullwidth" -->
    <div
      ref="activator"
      @click="onActivatorClick"
    >
      <slot />
    </div>
    <e-focus-sheet v-model="visibleComputed" />
    <e-tr-scale>
      <div
        v-if="visibleComputed"
        ref="list"
        class="list bg-elev-2 rounded"
        :style="{position:(fixed?'fixed':undefined)}"
      >
        <component
          :is="item.href ? 'a' : 'div'"
          v-for="(item, i) in items"
          :key="i"
          class="fullwidth"
          :href="item.href ? item.href : undefined"
        >
          <e-btn
            justify="start"
            class="item fullwidth"
            :color="item.color"
            :solid="false"
            :background="item.background || 'transparent'"
            :class="{
              'rounded-top': i === 0,
              'rounded-bottom': i === items.length - 1,
              active: currentItem === i,
            }"
            @click="select(i)"
          >
            <e-icon
              v-if="item.icon"
              :size="20"
              class="mr-2"
            >
              {{ item.icon }}
            </e-icon>
            {{ item.name }}
          </e-btn>
        </component>
      </div>
    </e-tr-scale>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, reactive, watch/*, nextTick*/ } from "#imports";
import  _ from "lodash-es";

interface DropdownItem {
  name: string;
  icon?: string;
  href?: string;
  callback?: () => void;
  color?: string;
  background?: string;
}

const props = withDefaults(
  defineProps<{
    modelValue?: number;
    width: string | number | "100%";
    center?: boolean;
    items: DropdownItem[];
    visible?: boolean | null;
    paddingY?: string;
    position?: { x: number, y: number }
    fixed?:boolean;
  }>(),
  { center: false, visible: null, paddingY: "", modelValue: undefined }
);

const activator = ref<HTMLDivElement>();
const list = ref<HTMLDivElement>();

const state = reactive({
  visibleInternal: false,
  x: 0,
  y: 0,
  width: 0,
});

// Visibility computed variable. We use the state unless we have a variable from the parent.
const visibleComputed = computed<boolean>({
  get: () => {
    if (props.visible != null) {
      return props.visible;
    }
    return state.visibleInternal;
  },
  set: (value) => {
    if (props.visible != null) {
      emit("update:visible", value);
    } else {
      state.visibleInternal = value;
    }
  },
});

function computeWidth(input: string | number) {
  const div = document.createElement("div");
  document.body.appendChild(div);
  div.style.width = String(input);
  const c = getComputedStyle(div).width as any;
  // const res = c.match(/[.\d]+/g).map(Number);

  div.remove();
  return parseInt(c, 10);
}

const updatePosition = async () => {

  if (!visibleComputed.value) {
    window.removeEventListener("resize", debouncedUpdatePosition);
    return;
  }

  if (activator.value) {
    const activatorRect = activator.value.getBoundingClientRect();

    if (props.width === "100%") {
      state.width = activatorRect.width;
    } else {
      state.width = computeWidth(props.width);
    }

    state.y = activatorRect.height;
    state.x = 0;

  } else {
    state.width = computeWidth(props.width);


  }
  if (props.position) {
      state.x = props.position.x;
      state.y = props.position.y;
      return;
    }
  state.x = 0;
  state.y = 0;

  /* await nextTick();
  if (!list.value) return;

  const listRect = list.value.getBoundingClientRect();
  if (window.innerHeight < listRect.bottom) {
    // The list is too low.
    // We can just render the list on top of the button.
    state.y = 0 - listRect.height;
  } */
};

const debouncedUpdatePosition = _.debounce(updatePosition, 200);

watch(visibleComputed, (value) => {
  if (value) {
    updatePosition();
    window.addEventListener("resize", debouncedUpdatePosition);
  } else {
    window.removeEventListener("resize", debouncedUpdatePosition);
  }
});

const emit = defineEmits(["update:modelValue", "update:visible"]);

const currentItem = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const select = (i: number) => {
  visibleComputed.value = false;
  currentItem.value = i;
  if(props.items[i].callback){
    props.items[i].callback();
  }
};

const onActivatorClick = () => {
  visibleComputed.value = !visibleComputed.value;
};
</script>
<style scoped lang="scss">
.t-dropdown {
  position: relative;
}

.list {
  position: absolute;
  left: v-bind('(state.x) + `px`');
  top: v-bind('(state.y) + `px`');
  width: v-bind('state.width + `px`');
  display: flex;

  z-index: 6;

  flex-shrink: 1;
  flex-direction: column;
  overflow: clip;
  justify-items: stretch;
  margin-top: v-bind("props.paddingY");

  .item {
    // color: var(--e-color-text);
    font-size: 1rem;
    padding: 0.7rem;
    text-transform: capitalize;
    position: relative;

    &:hover {
      background-color: rgba(var(--e-color-fg-rgb), 0.5);
    }

    &:focus {}

    &.active {
      background-color: rgba(var(--e-color-primary-rgb), 0.2);

      &:hover {
        background-color: rgba(var(--e-color-primary-rgb), 0.4);
      }
    }
  }
}

@media screen and (max-width: $e-md-screen-breakpoint) {
  .list {
    position: fixed;
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
