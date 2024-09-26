<template>
  <div>
    <h1>Colors</h1>
    <h2>Background</h2>
    <div
      v-for="color in colors"
      :key="color"
      :class="['bg-' + color]"
    >
      {{ color }}
    </div>
    <h2>Text</h2>
    <div
      v-for="color in colors"
      :key="color"
      :class="['color-' + color]"
    >
      {{ color }}
    </div>
  </div>
</template>
<script setup lang="ts">
const colors = ['primary', 'text', 'red', 'blue', 'yellow', 'green', 'bg', 'fg']
</script>