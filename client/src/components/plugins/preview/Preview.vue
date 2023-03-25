<template>
  <div class="preview">
    <el-button type="success" @click="onclick">预览</el-button>
    <el-drawer v-model="showPreview" direction="btt" size="100%">
      <form-render
        :componentList="designerStore.componentList"
        :formProps="designerStore.formProps"
        :width="designerStore.width"
      ></form-render>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { useDesignerStore } from '@/stores/designer'

const showPreview = ref(false)
const designerStore = useDesignerStore()

const onclick = () => {
  showPreview.value = true
}
</script>

<style scoped></style>
