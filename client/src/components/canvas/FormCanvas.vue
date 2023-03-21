<template>
  <div class="canvas">
    <el-card class="form-card" :style="style">
      <el-form
        v-bind="designerStore.formProps"
        class="form"
        :class="{ hover: formHover && !hoverId }"
        @mouseover="onmouseenter"
        @mouseout="onmouseleave"
        @click="onClickForm"
        @submit.prevent
      >
        <el-row :gutter="10">
          <VueDraggable
            class="draggable-panel"
            v-model="designerStore.componentList"
            :group="{ name: 'form-item', pull: false, put: ['assets'] }"
            animation="500"
            item-key="id"
            @change="onchange"
          >
            <template #item="{ element, index }">
              <el-col
                :span="(element as ComponentData).span.value || 24"
                class="item-col"
                :class="{
                  hover: hoverId === element.id,
                  activated: element.id === designerStore.currentComponent?.id
                }"
                @dragstart="ondragstart(element)"
                @dragend="hasMouseEvent = true"
                @mouseenter="hasMouseEvent && (hoverId = element.id)"
                @mouseleave="hasMouseEvent && (hoverId = '')"
                @click.stop="onclick(element)"
              >
                <el-form-item
                  v-bind="toRealProps((element as ComponentData).formItemProps as Record<string, PropConfig<any>>)"
                  class="form-item"
                >
                  <component
                    :is="(element as ComponentData).component"
                    v-bind="toRealProps((element as ComponentData).props)"
                    @update:modelValue="(newValue: any) => element.props.modelValue.value = newValue"
                  ></component>
                </el-form-item>
                <div class="toolbar" v-show="hoverId === element.id">
                  <el-button
                    icon="CopyDocument"
                    size="small"
                    circle
                    plain
                    title="复制"
                    type="primary"
                    @click.stop="copyComponent(index)"
                  />
                  <el-button
                    icon="Delete"
                    size="small"
                    circle
                    plain
                    title="删除"
                    type="danger"
                    @click.stop="removeComponent(index)"
                  />
                </div>
              </el-col>
            </template>
          </VueDraggable>
        </el-row>
        <div class="empty-tips" v-show="!designerStore.componentList.length">
          从左侧拖入组件进行表单设计
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import VueDraggable from 'vuedraggable'
import { toRealProps, deepClone, uuid } from '@/utils'

import { useDesignerStore } from '@/stores/designer'

const designerStore = useDesignerStore()
const hoverId = ref('') // hover时显示轮廓的组件id
const hasMouseEvent = ref(true) // 表单项是否具有鼠标进入和离开事件
const formHover = ref(false)

const style = computed(() => {
  return {
    maxWidth: designerStore.width === 'auto' ? 'unset' : designerStore.width
  }
})

// 鼠标进入和离开表单
const onmouseenter = () => {
  formHover.value = true
}
const onmouseleave = () => {
  formHover.value = false
}

// 点击表单时显示表单属性配置
const onClickForm = () => {
  designerStore.propPanelTab = 'form'
  designerStore.currentComponent = null
}

// 开始拖动时设置为当前选中组件
const ondragstart = (component: ComponentData) => {
  hoverId.value = component.id
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

// 删除组件
const removeComponent = (index: number) => {
  if (designerStore.componentList[index].id === designerStore.currentComponent?.id) {
    designerStore.currentComponent = null
  }
  designerStore.componentList.splice(index, 1)
  // 添加历史记录
  designerStore.pushHistory()
}

// 复制组件
const copyComponent = (index: number) => {
  const newComponent = {
    ...deepClone(designerStore.componentList[index]),
    id: uuid(designerStore.componentList[index].component)
  }
  designerStore.componentList.splice(index + 1, 0, newComponent)
  // 添加历史记录
  designerStore.pushHistory()
}

onMounted(() => {
  // 清空历史记录
  designerStore.clearHistory()
})
</script>

<style scoped lang="scss">
@use '@/styles/mixin.scss' as *;

.canvas {
  display: flex;
  justify-content: center;
  height: 100%;
  padding: 10px;
  background-color: var(--color-background-blue);
  overflow: auto;
  @include scrollbar();
  .form-card {
    width: 100%;
    min-height: 100%;
    .form {
      outline: 2px dashed var(--color-border);
      padding: 12px;
      &.hover {
        outline-color: var(--color-primary);
      }
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
            outline: 2px dashed var(--color-primary);
            outline-offset: -4px;
          }
          .form-item {
            margin: 10px 0;
          }
          .toolbar {
            position: absolute;
            right: 12px;
            top: -12px;
          }
        }
      }
    }
    .empty-tips {
      position: absolute;
      font-size: large;
      color: var(--color-text-primary);
      top: 80px;
      left: calc(50% - 117px);
    }
  }
}
</style>
