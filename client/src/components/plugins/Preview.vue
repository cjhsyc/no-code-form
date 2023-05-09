<template>
  <div class="preview">
    <el-button type="success" @click="onclick">预览</el-button>
    <preview-drawer v-model="showPreview" :renderData="designerStore.renderData"></preview-drawer>
  </div>
</template>

<script setup lang="ts">
import { useDesignerStore } from '@/stores'

const showPreview = ref(false)
const designerStore = useDesignerStore()

const onclick = () => {
  showPreview.value = true
}
</script>

<style scoped lang="scss"></style>
