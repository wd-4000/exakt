<template>
  <!--  v-intersect="onIntersect"-->
  <e-scroll-sense-internal @input="onIntersect">
    <div
      class="fullsize"
      :style="{
        width: finalWidth,
        height: finalHeight,
        aspectRatio: String(aspectRatio),
      }"
    >
      <div
        ref="wrapper"
        class="lv-image fullsize d-flex flex-shrink-1 flex-grow-1 justify-center align-center border-rad-custom"
        :style="{ backgroundImage }"
        :class="{
          contain,
          'sc-image-as-bg': slotContentPresent,
          rounded: !borderRadius,
        }"
      >
        <canvas
          v-if="state.renderBlur"
          ref="canvas"
          :width="state.blurWidth"
          :height="state.blurHeight"
          class="rounded lv-blur fullsize border-rad-custom"
          :class="{ hidden: state.loaded, rounded: !borderRadius }"
        />
        <!--     @transitionend.passive="transitionend" -->
      </div>

      <div
        v-if="slotContentPresent"
        class="sc-sloe-content fullsize"
      >
        <slot />
      </div>
    </div>
  </e-scroll-sense-internal>
</template>
<script setup lang="ts">
import { decode } from "blurhash";
import {
  computed,
  reactive,
  watch,
  onMounted,
  nextTick,
  ref,
  useSlots,
} from "vue";

const props = defineProps<{
  width?: number;
  height?: number;
  aspectRatio?: number;
  blur?: string;
  src?: string;
  contain?: Boolean;
  immediateRender?: Boolean;
  borderRadius?: string;
}>();

const slots = useSlots();
const wrapper = ref();
const canvas = ref();

const state = reactive({
  loaded: undefined,
  renderBlur: true,
  blurHeight: 32,
  blurWidth: 32,

  resizeListenerActive: false,

  intersected: false,
});

const finalWidth = computed(() => {
  return dimensionFix(props.width);
});
const finalHeight = computed(() => {
  return dimensionFix(props.height);
});
const slotContentPresent = computed(() => {
  return Boolean(slots.default);
});
const backgroundImage = computed(() => {
  return "url(".concat(props.src, ")");
});

watch(
  () => props.blur,
  (newBlur: string) => {
    if (!state.loaded) {
      initialize(newBlur);
    }
  }
);

watch(
  () => props.src,
  () => {
    state.loaded = false;
    state.renderBlur = true;

    nextTick(() => {
      initialize();
    });
  }
);

onMounted(() => {
  if (props.immediateRender) {
    initialize();
  }
});

const getAspectRatio = () => {
  if (props.aspectRatio) {
    return props.aspectRatio;
  }

  const givenAspectRatio = props.width / props.height;
  if (!isNaN(givenAspectRatio) && !Number.isNaN(givenAspectRatio)) {
    return givenAspectRatio;
  }

  if (wrapper.value) {
    const { width, height } = wrapper.value.getBoundingClientRect();
    return width / height;
  }

  return undefined;
};

const dimensionFix = (value) => {
  if (!value) {
    return undefined;
  }

  if (/^\d+$/.test(value)) {
    return value + "px";
  }
  return value;
};

const transitionend = () => {
  if (state.loaded) {
    state.renderBlur = false;
  }
};

const onIntersect = (intersecting) => {
  if (intersecting && !state.intersected) {
    initialize();
    state.intersected = true;
  }
};

const initialize = (blur = props.blur) => {
  //  const wrapper = state.$refs.wrapper
  const aspectRatio = getAspectRatio();

  if (blur && canvas && aspectRatio) {
    const blurHeight = state.blurHeight;

    state.blurWidth = Math.floor(state.blurHeight * aspectRatio);
    const blurWidth = state.blurWidth;

    const ctx = canvas.value.getContext("2d");

    const pixels = decode(blur, blurWidth, blurHeight);

    const imageData = ctx.createImageData(blurWidth, blurHeight);
    imageData.data.set(pixels);
    ctx.putImageData(imageData, 0, 0);
  }

  if (props.src) {
    const img = new Image();
    img.onload = () => {
      state.loaded = true;
    };
    img.src = props.src;
  }
};
</script>

<style lang="scss" scoped>
.border-rad-custom {
  border-radius: v-bind(borderRadius);
}
.lv-wrapper {
  position: relative;
}

.lv-image {
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

.lv-image.contain {
  background-size: contain;
}

.lv-blur {
  opacity: 1;
  width: 100%;
  height: 100%;
  transition: opacity 0.5s;
}

.lv-blur.hidden {
  opacity: 0;
}

.sc-sloe-content {
  position: relative;
}

.sc-image-as-bg {
  position: absolute;
  height: 100%;
  width: 100%;
}

.fullsize {
  width: 100%;
  height: 100%;
  overflow: clip;
}
</style>
