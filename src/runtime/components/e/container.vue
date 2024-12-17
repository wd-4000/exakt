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

  }>(),
  {
    noBtnPadding: false,
    forceFullWidth:false
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
    width: calc(100% - $padding);
  }

  @media (min-width: exakt.$e-lg-screen-breakpoint) {
    width: calc(95% - $padding);
  }

  @media (min-width: exakt.$e-xl-screen-breakpoint) {
    width: calc(85% - $padding);
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
