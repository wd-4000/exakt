<template>
  <e-btn
    :solid="false"
    justify="stretch"
    block
    background="transparent"
    class="pa-0 ma-0 btn"
  >
    <div class="icon">
      <e-icon
        v-if="icon"
        :icon="icon"
        size="22"
      /><slot
        v-else
        name="icon"
      />
    </div>
    <div class="ml-4 d-flex flex-column onhover">
      <slot />
    </div>
  </e-btn>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    icon?: string;
    iconWidth?: string;
  }>(),
  { icon: "" }
);
</script>
<style lang="scss" scoped>
.icon {
  width: calc(
   v-bind(iconWidth) - 0.1rem * 2
  ); // Compensate the btn's accessibility border
}



.btn {
  transition: all 0.25s ease-in-out;
  height: v-bind(iconWidth);
  width: v-bind(iconWidth);
}

.onhover{
    display: none;
}
</style>