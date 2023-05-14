<template>
  <div class="flex-center a-container">
    <slot />
    <e-image-lazy-view
      v-if="src"
      class="avatar"
      :width="size"
      :height="size"
      :contain="true"
      :immediate-render="true"
      :src="src"
      border-radius="100%"
    />
    <div v-else>
      <e-icon
        :size="size"
        :icon="mdiAccountCircle"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { mdiAccountCircle } from "@mdi/js";
const size = 120;

defineProps<{
  src?: string;
}>();
</script>
<style lang="scss" scoped>
.avatar {
  border-radius: 100%;
  width: fie-content;
  height: fie-content;
  background-color: var(--e-color-elev);
}

.a-container {
  position: relative;
}
</style>
