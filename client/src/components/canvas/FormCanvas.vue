<template>
  <div class="canvas">
    <el-card class="form-card">
      <el-form v-bind="designerStore.formProps" class="form">
        <el-row :gutter="10">
          <VueDraggable
            class="draggable-panel"
            v-model="designerStore.componentList"
            :group="{ name: 'form-item', pull: false, put: ['assets'] }"
            item-key="id"
          >
            <template #item="{ element }">
              <el-col :span="(element as ComponentData).span || 12">
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
</script>

<style scoped lang="scss">
.canvas {
  height: 100%;
  background-color: var(--color-background-blue);
  .form-card {
    .form {
      .draggable-panel {
        display: flex;
        flex-wrap: wrap;
        min-height: 120px;
        width: 100%;
      }
    }
  }
}
</style>
