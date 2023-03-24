<template>
  <div ref="sense"></div>
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
const { $scrollSense } = useNuxtApp();
const props = defineProps<{ group: string; id: string }>();

const sense = ref<HTMLDivElement>();
let observer;

const handleIntersect = (entries) => {
  $scrollSense.update(props.group, props.id, entries[0].isIntersecting);
};

onMounted(() => {
  try {
    let options = {
      root: null,
      rootMargin: "0px",
    };

    observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(sense.value);
  } catch (e) {
    console.log(e);
  }
});

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>
