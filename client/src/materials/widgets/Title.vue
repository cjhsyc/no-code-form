<template>
  <div class="title-box">
    <component :is="level" class="title">{{ content ? content : '请输入标题' }}</component>
    <div v-show="text" class="text">{{ text }}</div>
  </div>
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
  },
  text: {
    type: String,
    default: ''
  }
})

const color = computed(() => {
  if (props.content === '') {
    return 'var(--color-text-2)'
  }
  return ''
})

const lineHeight = computed(() => {
  if (props.level === 'h1') {
    return '30px'
  } else if (props.level === 'h2') {
    return '20px'
  } else {
    return '10px'
  }
})
</script>

<style scoped lang="scss">
.title-box {
  width: 100%;
  padding: 5px 0;
  .title {
    width: 100%;
    text-align: v-bind(align);
    color: v-bind(color);
    white-space: wrap;
    line-height: v-bind(lineHeight);
  }
  .text {
    padding-top: 10px;
    white-space: wrap;
    color: var(--color-text-2);
    text-align: v-bind(align);
    line-height: 16px;
  }
}
</style>
