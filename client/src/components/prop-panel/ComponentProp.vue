<template>
  <div class="component-props">
    <div v-if="designerStore.currentComponent">
      <div
        class="prop"
        v-for="(prop, index) in designerStore.currentComponent.props"
        :key="designerStore.currentComponent.id + index"
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

const designerStore = useDesignerStore()
</script>

<style scoped lang="scss">
@use '@/styles/mixin.scss' as *;

.component-props {
  height: 100%;
  width: 300px;
  padding: 0 10px;
  overflow: scroll;
  @include scrollbar();
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
