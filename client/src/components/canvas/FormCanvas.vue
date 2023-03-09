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
                :span="(element as ComponentData).span || 24"
                class="item-col"
                :class="{
                  hover: isHover === element.id,
                  activated: element.id === designerStore.currentComponent?.id
                }"
                @dragstart="ondragstart(element)"
                @dragend="hasMouseEvent = true"
                @mouseenter="hasMouseEvent && (isHover = element.id)"
                @mouseleave="hasMouseEvent && (isHover = '')"
                @click="onclick(element)"
              >
                <el-form-item v-bind="(element as ComponentData).formItemProps" class="form-item">
                  <component
                    :is="(element as ComponentData).component"
                    v-bind="toRealProps((element as ComponentData).props)"
                  ></component>
                </el-form-item>
                <div class="toolbar" v-show="isHover === element.id">
                  <el-button icon="Edit" size="small" circle />
                </div>
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
const isHover = ref('')
const hasMouseEvent = ref(true)

// 开始拖动时设置为当前选中组件
const ondragstart = (component: ComponentData) => {
  isHover.value = component.id
  hasMouseEvent.value = false
}

// 设置当前选中组件
const onclick = (component: ComponentData) => {
  designerStore.currentComponent = component
}

const onchange = ({ added }: { added: { element: ComponentData } }) => {
  if (added) {
    // 将新增组件设置为当前选中组件
    designerStore.currentComponent = added.element
  }
  // 添加历史记录
  designerStore.pushHistory()
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
        padding-bottom: 30px;
        .item-col {
          border-radius: 6px;
          height: min-content;
          cursor: pointer;
          &.hover,
          &.activated {
            outline: 2px dashed var(--el-color-primary);
            outline-offset: -4px;
          }
          .form-item {
            margin: 10px 0;
            pointer-events: none;
          }
          .toolbar {
            position: absolute;
            right: 8px;
            top: 4px;
          }
        }
      }
    }
  }
}
</style>
