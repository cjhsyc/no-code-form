<template>
  <el-button type="danger" @click="onclick">清空</el-button>
</template>

<script setup lang="ts">
import { useDesignerStore } from '@/stores'

const designerStore = useDesignerStore()

const onclick = () => {
  designerStore.clearCanvas()
}
</script>

<style scoped></style>
