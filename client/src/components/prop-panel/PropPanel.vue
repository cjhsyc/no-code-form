<template>
  <div class="prop-panel">
    <el-tabs v-model="activeName" stretch>
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
import setters from './setters'
import { useDesignerStore } from '@/stores/designer'

const designerStore = useDesignerStore()
const activeName = ref('component')

const { appContext } = getCurrentInstance()!
// 注册所有属性设置器组件
appContext.app.use(setters)

// 选中组件变化时，自动显示组件配置
watch(
  () => designerStore.currentComponent,
  (newComponent) => {
    if (newComponent !== null) {
      activeName.value = 'component'
    }
  }
)
</script>

<style scoped></style>
