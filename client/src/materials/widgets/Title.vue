<template>
  <component :is="level" class="title">{{ content ? content : '请输入标题' }}</component>
</template>

<script setup lang="ts">
import type { Align } from '@/types'

const props = defineProps({
  level: {
    type: String,
    default: 'h1'
  },
  content: {
    type: String,
    default: ''
  },
  align: {
    type: String as PropType<Align>,
    default: ''
  }
})

const color = computed(() => {
  if (props.content === '') {
    return 'var(--color-text-2)'
  }
  return ''
})
</script>

<style scoped lang="scss">
.title {
  width: 100%;
  text-align: v-bind(align);
  color: v-bind(color);
}
</style>
