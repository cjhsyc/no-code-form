<template>
  <el-scrollbar>
    <div class="canvas">
      <el-card class="form-card">
        <el-form
          v-bind="toRealProps(designerStore.formProps)"
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
                  :span="(element as ComponentData).props.span.value || 24"
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
                  <form-item
                    :label-width="designerStore.formProps.labelWidth.value"
                    :label="(element as ComponentData).props.label.value"
                    :show-label="(element as ComponentData).props.showLabel.value"
                    :required="(element as ComponentData).props.required.value"
                    class="form-item"
                  >
                    <component
                      :is="(element as ComponentData).component"
                      v-bind="toRealProps((element as ComponentData).props)"
                      @update:modelValue="(newValue: any) => element.props.modelValue.value = newValue"
                    ></component>
                  </form-item>
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
                  <div class="tip-icon">
                    <el-icon
                      class="hide-icon"
                      v-show="(element as ComponentData).props.hidden.value"
                      :size="12"
                    >
                      <Hide />
                    </el-icon>
                    <el-icon
                      class="link-icon"
                      v-show="(element as ComponentData).props.linkage?.value"
                      :size="12"
                    >
                      <Link />
                    </el-icon>
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
  </el-scrollbar>
</template>

<script setup lang="ts">
import type { ComponentData, Linkage } from '@/types'
import { deepClone, toRealProps, uuid } from '@/utils'
import { ElMessageBox } from 'element-plus'
import VueDraggable from 'vuedraggable'

import { useDesignerStore } from '@/stores'

const designerStore = useDesignerStore()
const hoverId = ref('') // hover时显示轮廓的组件id
const hasMouseEvent = ref(true) // 表单项是否具有鼠标进入和离开事件
const formHover = ref(false)

const maxWidth = computed(() =>
  designerStore.width === 'auto' ? 'unset' : `${designerStore.width}px`
)
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
}

// 删除组件
const removeComponent = (index: number) => {
  ElMessageBox.confirm('确认要删除吗？', '提示', { type: 'warning' })
    .then(() => {
      const id = designerStore.componentList[index].id
      if (id === designerStore.currentComponent?.id) {
        designerStore.currentComponent = null
      }
      designerStore.componentList.splice(index, 1)
      // 如果该组件是联动目标组件，删除其相关联动
      designerStore.componentList.forEach((component) => {
        const linkage: Linkage = component.props.linkage?.value
        if (linkage) {
          Object.keys(linkage).forEach((key) => {
            linkage[key] = linkage[key].filter((target) => target !== id)
            if (linkage[key].length === 0) {
              Reflect.deleteProperty(linkage, key)
            }
          })
          if (Object.keys(linkage).length === 0) {
            component.props.linkage.value = null
          }
        }
      })
      hoverId.value = ''
    })
    .catch(() => {})
}

// 复制组件
const copyComponent = (index: number) => {
  const newComponent = {
    ...deepClone(designerStore.componentList[index]),
    id: uuid(designerStore.componentList[index].component)
  }
  designerStore.componentList.splice(index + 1, 0, newComponent)
}
</script>

<style scoped lang="scss">
.canvas {
  display: flex;
  justify-content: center;
  padding: 10px 20px;
  background-color: var(--color-background-blue);
  .form-card {
    width: 100%;
    max-width: v-bind(maxWidth);
    height: min-content;
    min-height: calc(100vh - 73px);
    &:deep(.el-card__body) {
      padding: 6px;
    }
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
        width: 100%;
        min-height: 200px;
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
          .tip-icon {
            position: absolute;
            top: -4px;
            left: 6px;
            color: var(--el-color-info);
          }
        }
      }
    }
    .empty-tips {
      user-select: none;
      position: absolute;
      font-size: large;
      color: var(--color-text-primary);
      top: 90px;
      left: calc(50% - 117px);
    }
  }
}
</style>
