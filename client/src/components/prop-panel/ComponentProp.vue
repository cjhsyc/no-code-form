<template>
  <div class="component-props">
    <div v-if="designerStore.currentComponent">
      <div
        class="prop"
        v-for="(prop, key) in renderProps"
        :key="designerStore.currentComponent.id + key"
      >
        <div class="label">
          <div class="title">{{ prop.label }}</div>
          <div class="tips" v-if="prop.tips">
            <el-tooltip :content="prop.tips" placement="top">
              <el-icon :size="14">
                <Warning />
              </el-icon>
            </el-tooltip>
          </div>
        </div>
        <div class="setter">
          <component :is="prop.setter" v-model="prop.value" v-bind="prop.attrs"></component>
        </div>
      </div>
    </div>
    <el-empty v-show="!designerStore.currentComponent" description="暂无选中组件" />
  </div>
</template>

<script setup lang="ts">
import { useDesignerStore } from '@/stores/designer'
import { objectFilter } from '@/utils'

const designerStore = useDesignerStore()

// 需显示的所有属性配置
const renderProps = computed<Record<string, PropConfig<unknown>>>(() => {
  const span = designerStore.currentComponent?.span
  // 表单项属性配置
  const renderProps: Record<string, PropConfig<unknown>> = {
    ...designerStore.currentComponent?.formItemProps
  }
  // 栅格宽度配置
  if (span) {
    renderProps.span = span
  }
  // 组件属性配置，需过滤setter设置为none的属性
  Object.assign(
    renderProps,
    objectFilter(
      {
        ...designerStore.currentComponent?.props
      },
      (item: PropConfig<any>) => item.setter !== 'none'
    )
  )
  return renderProps
})
</script>

<style scoped lang="scss">
@use '@/styles/mixin.scss' as *;

.component-props {
  height: 100%;
  width: 300px;
  padding: 10px 14px 0;
  overflow: scroll;
  @include scrollbar();
  .title {
    .name {
      border-left: 4px solid var(--color-primary);
      padding-left: 10px;
      font-weight: bolder;
    }
  }
  .prop {
    & + .prop {
      margin-top: 8px;
    }
    .label {
      display: flex;
      align-items: center;
      .title {
        font-size: 14px;
      }
      .tips {
        margin-left: 4px;
        cursor: pointer;
      }
    }
  }
}
</style>
