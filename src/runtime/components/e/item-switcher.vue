<template>
   <Transition name="slide-up">
                <div v-if="props.modelValue == 0"><slot  :value="0"/></div>
                <div v-for="n in 2" v-else-if="props.modelValue == n"><slot  :value="n"/> </div>

              </Transition>
</template>
<script lang="ts" setup>  
const props = withDefaults(
  defineProps<{
    modelValue: number;
    items: Object[];
  }>(),
  {
    modelValue: 0,
    max:1,
  }
);
</script>