<template>
  <Transition name="fade">
    <div
      v-if="modelValue"
      class="e-progress-linear bg-elev"
      :class="posClass"
      role="progressbar"
    />
  </Transition>
</template>
<script setup lang="ts">
import { computed } from "vue";
const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    position?: "top" | "bottom" | null;
  }>(),
  {
    position: "bottom",
  }
);

const posClass = computed(() => {
  if (props.position === "top") {
    return "pos-top";
  } else if (props.position === "bottom") {
    return "pos-bottom";
  }

  return null;
});
</script>
<style scoped lang="scss">
.pos-top,
.pos-bottom {
  position: absolute !important;
  left: 0px;
}

.pos-top {
  top: 0px;
}

.pos-bottom {
  bottom: 0px;
}

.e-progress-linear {
  position: relative;

  width: 100%;
  height: 0.2rem;
  overflow: clip;

}

.e-progress-linear:before {
  position: absolute;
  left: -50%;
  height: 100%;
  width: 100%;
  content: "";

  background-color: var(--e-color-primary);
  animation: progressLinear 1.8s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .e-progress-linear:before {
    left: 0;
    animation: progressPulse 2s ease-in-out infinite;
  }
}

@keyframes progressPulse {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.3;
  }
}

@keyframes progressLinear {
  0% {
    transform: translateX(-40%) scaleX(40%);
  }

  50% {
    transform: translateX(40%) scaleX(80%);
  }

  100% {
    transform: translateX(200%) scaleX(100%);
  }
}
</style>
