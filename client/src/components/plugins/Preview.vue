<template>
  <div class="preview">
    <el-button type="success" @click="onclick">预览</el-button>
    <el-drawer v-model="showPreview" direction="btt" size="100%">
      <template #header="{ titleId, titleClass }">
        <h4 :id="titleId" :class="titleClass">预览</h4>
        <el-radio-group v-model="port">
          <el-radio-button label="pc">PC端</el-radio-button>
          <el-radio-button label="mobile">移动端</el-radio-button>
        </el-radio-group>
      </template>
      <div class="container" :class="[port === 'pc' ? 'pc-container' : 'mobile-container']">
        <div class="wrapper" :class="[port === 'pc' ? 'pc-wrapper' : 'mobile-wrapper']">
          <form-render
            :componentList="designerStore.componentList"
            :formProps="designerStore.formProps"
            :width="designerStore.width"
            :port="port"
          ></form-render>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { useDesignerStore } from '@/stores'

const showPreview = ref(false)
const designerStore = useDesignerStore()
const port = ref<'pc' | 'mobile'>('pc')

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
      border-bottom: 1px solid var(--color-border);
      justify-content: space-between;
      .el-drawer__title {
        flex: none;
      }
    }
    .el-drawer__body {
      padding: 0;
      overflow: auto;
      height: 100%;
      background-color: var(--color-background-blue);
      @include scrollbar();
      .container {
        height: 100%;
        &.mobile-container {
          margin: 10px auto;
          z-index: 1;
          width: 421px;
          height: 852px;
          padding: 108px 24px 20px;
          background-image: url(/mobile.png);
          background-size: 100% 100%;
        }
        .wrapper {
          height: 100%;
          &.mobile-wrapper {
            overflow: auto;
            border-radius: 0 0 40px 40px;
            background-color: var(--color-background);
            @include scrollbar();
          }
        }
      }
    }
  }
}
</style>
