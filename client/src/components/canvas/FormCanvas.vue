<template>
  <div class="canvas">
    <el-card class="form-card">
      <el-form v-bind="designerStore.formProps">
        <el-form-item
          v-for="item in designerStore.componentList"
          :key="item.id"
          v-bind="item.formItemProps"
        >
          <component :is="item.component"></component>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useDesignerStore } from '@/stores/designer'

const designerStore = useDesignerStore()
</script>

<style scoped lang="scss">
.canvas {
  height: 100%;
  background-color: var(--color-background-blue);
}
</style>
