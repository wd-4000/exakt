<template>
  <div class="flex-center a-container">
    <slot />
    <e-image-lazy-view
      v-if="src"
      class="avatar bg-elev"
      :width="props.size"
      :height="props.size"
      :contain="true"
      :immediate-render="true"
      :src="src"
      border-radius="100%"
    />
    <div v-else>
      <e-icon
        :size="props.size"
      >
        account_circle
      </e-icon>
    </div>
  </div>
</template>
<script setup lang="ts">

const props = withDefaults(defineProps<{
  src?: string;
  size?: number;
}>(), { size: 120 });
</script>
<style lang="scss" scoped>
.avatar {
  border-radius: 100%;
  width: fit-content;
  height: fit-content;
}

.a-container {
  position: relative;
}
</style>
