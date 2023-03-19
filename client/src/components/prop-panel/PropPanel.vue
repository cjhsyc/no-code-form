<template>
  <div class="prop-panel">
    <el-tabs v-model="designerStore.propPanelTab" stretch class="panel-tabs">
      <el-tab-pane label="组件配置" name="component">
        <ComponentProp />
      </el-tab-pane>
      <el-tab-pane label="表单配置" name="form">
        <FormProp />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import setters from '../setters'
import { useDesignerStore } from '@/stores/designer'

const designerStore = useDesignerStore()

const { appContext } = getCurrentInstance()!
// 注册所有属性设置器组件
appContext.app.use(setters)

// 选中组件变化时，自动显示组件配置
watch(
  () => designerStore.currentComponent,
  (newComponent) => {
    if (newComponent !== null) {
      designerStore.propPanelTab = 'component'
    }
  }
)
</script>

<style scoped lang="scss">
.prop-panel {
  height: 100%;
  .panel-tabs {
    height: 100%;
    &:deep(.el-tabs__content) {
      height: calc(100% - 40px);
    }
    :deep(.el-tabs__header.is-top) {
      margin: 0;
    }
    .el-tab-pane {
      height: 100%;
    }
  }
}
</style>
