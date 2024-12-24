<template>
  <div
    class="flex-center"
    :class="{ [severityMatrix[severity].class]: true }"
  >
    <e-icon
      size="19"
      class="mr-2"
    >
      {{ severityMatrix[severity].icon }}
    </e-icon><small>
      <slot />
    </small>
  </div>
</template>
<script setup lang="ts">
withDefaults(defineProps<{ severity?: 0 | 1 | 2 }>(), { severity: 2 })

const severityMatrix = { 0: { icon: "info", class: "" }, 1: { icon: "warning", class: "color-yellow" }, 2: { icon: "warning", class: "color-red" } }
</script>
