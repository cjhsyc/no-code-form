<template>
  <el-drawer
    v-model="showPreview"
    direction="btt"
    size="100%"
    :destroy-on-close="true"
    class="preview-drawer"
  >
    <template #header="{ titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass">预览</h4>
      <el-radio-group v-model="port">
        <el-radio-button label="pc">PC端</el-radio-button>
        <el-radio-button label="mobile">移动端</el-radio-button>
      </el-radio-group>
    </template>
    <div class="container" :class="[port === 'pc' ? 'pc-container' : 'mobile-container']">
      <div class="wrapper" :class="[port === 'pc' ? 'pc-wrapper' : 'mobile-wrapper']">
        <form-render
          :componentList="renderData.componentList"
          :formProps="renderData.formProps"
          :width="renderData.width"
          :port="port"
        ></form-render>
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import type { FormData } from '@/types'
import defaultFormProps from '@/data/form-props'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  renderData: {
    type: Object as PropType<FormData['renderData']>,
    default: () => ({
      componentList: [],
      formProps: defaultFormProps,
      width: 'auto'
    })
  }
})

const emit = defineEmits(['update:modelValue'])

const showPreview = computed({
  get: () => props.modelValue,
  set: (newValue) => {
    emit('update:modelValue', newValue)
  }
})

const port = ref<'pc' | 'mobile'>('pc')
</script>

<style lang="scss">
@use '@/styles/mixin.scss' as *;
.preview-drawer {
  .el-drawer__header {
    margin: 0;
    padding: 20px;
    border-bottom: 1px solid var(--color-border);
    justify-content: space-between;
    .el-drawer__title {
      flex: none;
    }
  }
  .el-drawer__body {
    padding: 0;
    overflow: auto;
    height: 100%;
    background-color: var(--color-background-blue);
    @include scrollbar();
    .container {
      height: 100%;
      &.mobile-container {
        margin: 10px auto;
        z-index: 1;
        width: 421px;
        height: 852px;
        padding: 108px 24px 20px;
        background-image: url(/mobile.png);
        background-size: 100% 100%;
      }
      .wrapper {
        height: 100%;
        &.mobile-wrapper {
          overflow: auto;
          border-radius: 0 0 40px 40px;
          background-color: var(--color-background);
          @include scrollbar();
        }
      }
    }
  }
}
</style>
