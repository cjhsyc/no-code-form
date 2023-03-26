<template>
  <div class="preview">
    <el-button type="success" @click="onclick">预览</el-button>
    <el-drawer v-model="showPreview" direction="btt" size="100%" title="预览">
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

<style scoped lang="scss">
@use '@/styles/mixin.scss' as *;
.preview {
  :deep(.el-drawer) {
    .el-drawer__header {
      margin: 0;
      padding: 20px;
    }
    .el-drawer__body {
      overflow: auto;
      @include scrollbar();
    }
  }
}
</style>
