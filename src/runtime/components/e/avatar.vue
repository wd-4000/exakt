<template>
  <div class="flex-center a-container">
    <slot />
    <e-image-lazy-view v-if="src" class="avatar" :width="props.size" :height="props.size" :contain="true"
      :immediate-render="true" :src="src" border-radius="100%" />
    <div v-else>
      <e-icon :size="props.size" :icon="mdiAccountCircle" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { mdiAccountCircle } from "@mdi/js";

const props = withDefaults(defineProps<{
  src?: string;
  size?: number;
}>(), { size: 120 });
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
