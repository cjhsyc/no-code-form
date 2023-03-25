<template>
  <div class="size">
    <div class="text">宽度：</div>
    <el-radio-group v-model="type">
      <el-radio-button label="auto">自适应</el-radio-button>
      <el-radio-button label="custom">自定义</el-radio-button>
    </el-radio-group>
    <el-input-number
      v-model="width"
      :class="{ empty: type === 'auto' }"
      :min="0"
      :max="9999"
      controls-position="right"
    >
    </el-input-number>
  </div>
</template>

<script setup lang="ts">
import { useDesignerStore } from '@/stores/designer'

const designerStore = useDesignerStore()

const type = ref('auto')
const width = ref<number>(390)

watch(type, (type) => {
  if (type === 'auto') {
    designerStore.width = 'auto'
  } else {
    designerStore.width = width.value + 'px'
  }
})

watch(width, (width) => {
  if (type.value === 'custom') {
    designerStore.width = width + 'px'
  }
})
</script>

<style scoped lang="scss">
.size {
  display: flex;
  align-items: center;
  .el-input-number {
    margin-left: 10px;
    width: 90px;
    &.empty {
      opacity: 0;
      pointer-events: none;
    }
  }
}
</style>
