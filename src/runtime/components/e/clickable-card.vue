<template>
  <div class="rounded clickable-card py-4 my-2">
    <div class=" px-6">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts"></script>

<style lang="scss" scoped>
.clickable-card {
  background-color: var(--e-color-elev);
  cursor: pointer;
  transition: background 0.15s;
  & > * {
    transition: transform ease-in-out 0.15s;
  }
  &:hover {
    background: rgba(var(--e-color-elev-rgb), 0.85);
  }
  &:active {
    & > * {
      transform: scale(0.98);
    }
  }
}
</style>
