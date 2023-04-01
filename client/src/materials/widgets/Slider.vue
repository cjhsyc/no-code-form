<template>
  <el-slider
    v-bind="{ ...$attrs, ...$props }"
    @update:modelValue="emit('update:modelValue', $event)"
  ></el-slider>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: [Number, Array] as PropType<number | number[]>,
    default: 0
  },
  range: {
    type: Boolean,
    default: false
  },
  min: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['update:modelValue'])

watch(
  () => props.range,
  (range) => {
    if (range && typeof props.modelValue === 'number') {
      emit('update:modelValue', [props.min, props.modelValue])
    } else if (!range && Array.isArray(props.modelValue)) {
      emit('update:modelValue', props.modelValue[1])
    }
  },
  {
    immediate: true
  }
)
</script>

<style scoped></style>
