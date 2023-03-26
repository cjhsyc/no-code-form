<template>
  <el-time-picker
    :key="key"
    v-bind="{ ...$attrs, ...$props }"
    @update:modelValue="emit('update:modelValue', $event)"
    value-format="HH:mm:ss"
  ></el-time-picker>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: [String, Array] as PropType<String | Date[] | undefined>
  },
  isRange: {
    type: Boolean,
    default: false
  },
  arrowControl: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])
const key = ref(0) // key值改变时，会触发组件的重新渲染

watch(
  () => props.arrowControl,
  () => key.value++
)

watch(
  () => props.isRange,
  (range) => {
    if (range && typeof props.modelValue === 'string') {
      emit('update:modelValue', props.modelValue ? ['00:00:00', props.modelValue] : [])
    } else if (!range && Array.isArray(props.modelValue)) {
      emit('update:modelValue', props.modelValue[1])
    }
    key.value++
  }
)
</script>

<style scoped lang="scss"></style>
