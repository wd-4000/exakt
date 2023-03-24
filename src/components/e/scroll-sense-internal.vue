<template>
  <div ref="sense"><slot /></div>
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
const emit = defineEmits(["input"]);

const sense = ref<HTMLDivElement>();
let observer;

const handleIntersect = (entries) => {
  emit("input", entries[0].isIntersecting);
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
