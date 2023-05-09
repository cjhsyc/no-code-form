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
import { useDesignerStore } from '@/stores'

const designerStore = useDesignerStore()

// 上一次自定义时的宽度
const lastWidth = ref(750)
const type = computed({
  get: () => (designerStore.width === 'auto' ? 'auto' : 'custom'),
  set: (newValue) => {
    if (newValue === 'auto' && designerStore.width !== 'auto') {
      lastWidth.value = designerStore.width
      designerStore.width = 'auto'
    }
    if (newValue === 'custom') {
      designerStore.width = lastWidth.value
    }
  }
})
const width = computed({
  get: () => (designerStore.width === 'auto' ? 750 : designerStore.width),
  set: (newValue) => {
    designerStore.width = newValue
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
