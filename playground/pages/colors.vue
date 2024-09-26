<template>
<h1>Colors</h1>
<h2>Background</h2>
    <div v-for="color in colors" :class="['bg-'+color]">{{ color }}</div>
<h2>Text</h2>
<div v-for="color in colors" :class="['color-'+color]">{{ color }}</div>

</template>
<script setup lang="ts">
const colors = ['primary', 'text', 'red', 'blue', 'yellow', 'green', 'bg', 'fg']
</script>