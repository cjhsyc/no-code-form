<template>
  <el-button type="danger" @click="onclick" :disabled="designerStore.componentList.length === 0">
    清空
  </el-button>
</template>

<script setup lang="ts">
import { useDesignerStore } from '@/stores'
import { ElMessageBox } from 'element-plus'

const designerStore = useDesignerStore()

const onclick = () => {
  ElMessageBox.confirm('确认要删除吗？', '提示', { type: 'warning' })
    .then(() => {
      designerStore.clearCanvas()
    })
    .catch(() => {})
}
</script>

<style scoped></style>
