<template>
  <div class="canvas">
    <el-card class="form-card">
      <el-form v-bind="designerStore.formProps" class="form">
        <el-row :gutter="10">
          <VueDraggable
            class="draggable-panel"
            v-model="designerStore.componentList"
            :group="{ name: 'form-item', pull: false, put: ['assets'] }"
            animation="500"
            item-key="id"
            @change="onchange"
          >
            <template #item="{ element }">
              <el-col
                :span="(element as ComponentData).span || 12"
                class="item-col"
                :class="{ hover: hasHover }"
                @dragstart="ondragstart"
                @dragend="ondragend"
                @click="onclick(element)"
              >
                <el-form-item v-bind="(element as ComponentData).formItemProps" class="form-item">
                  <component
                    :is="(element as ComponentData).component"
                    v-bind="toRealProps((element as ComponentData).props)"
                  ></component>
                </el-form-item>
              </el-col>
            </template>
          </VueDraggable>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import VueDraggable from 'vuedraggable'
import { toRealProps } from '@/utils'

import { useDesignerStore } from '@/stores/designer'

const designerStore = useDesignerStore()
const hasHover = ref(true) // 是否显示hover样式
const ondragstart = () => {
  hasHover.value = false
}
const ondragend = () => {
  hasHover.value = true
}
// 设置当前选中组件
const onclick = (component: ComponentData) => {
  designerStore.currentComponent = component
}
const onchange = () => {

}
</script>

<style scoped lang="scss">
@use '@/styles/mixin.scss' as *;

.canvas {
  height: 100%;
  padding: 10px;
  background-color: var(--color-background-blue);
  overflow: auto;
  @include scrollbar();
  .form-card {
    min-height: 100%;
    .form {
      outline: 2px dashed var(--color-border);
      outline-offset: 12px;
      .draggable-panel {
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        min-height: 200px;
        width: 100%;
        .item-col {
          border-radius: 4px;
          height: min-content;
          cursor: pointer;
          &.hover:hover {
            outline: 2px dashed var(--el-color-primary);
          }
          .form-item {
            margin: 10px 0;
            pointer-events: none;
          }
        }
      }
    }
  }
}
</style>
