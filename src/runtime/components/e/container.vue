<template>
  <div
    class="container"
    :class="{ 'no-btn-padding': noBtnPadding }"
  >
    <div
      class="content"
      :class="{ forceFullWidth }"
    >
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
withDefaults(
  defineProps<{
    noBtnPadding?: boolean;
    forceFullWidth?: boolean;
    sizes?: number[],
  }>(),
  {
    noBtnPadding: false,
    forceFullWidth:false,
    sizes: () => [100, 95, 85]
  }
);
</script>
<style lang="scss" scoped>
.content {
  word-wrap: break-word;

  width: 95%;

  @media (max-width: exakt.$e-md-screen-breakpoint) {
    &.forceFullWidth {
      width: 100%;
    }
  }

  $padding: 0rem;

  @media (min-width: exakt.$e-md-screen-breakpoint) {
    width: calc(v-bind('`${sizes[0]}vw`') - $padding);
  }

  @media (min-width: exakt.$e-lg-screen-breakpoint) {
    width: calc(v-bind('`${sizes[1]}vw`') - $padding);
  }

  @media (min-width: exakt.$e-xl-screen-breakpoint) {
    width: calc(v-bind('`${sizes[2]}vw`') - $padding);
  }
}

.container.no-btn-padding {
  padding: 0px 0px;
  .content {
    margin: 0px 0px;
  }
}

.container {
  width: 100%;
  display: flex;
  height: 100%;
  justify-content: center;
  word-wrap: break-word;
  box-sizing: border-box; /* Opera/IE 8+ */

  padding: 0px var(--e-core-padding-x);
}
</style>
