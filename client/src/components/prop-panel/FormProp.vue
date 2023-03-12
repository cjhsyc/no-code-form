<template>
  <div class="form-props">
    <div class="prop">
      <div class="label">表单项标签的位置</div>
      <div class="setter">
        <SetterRadioButton
          v-model="designerStore.formProps.labelPosition"
          :options="labelPositionOptions"
        />
      </div>
    </div>
    <div class="prop">
      <div class="label">组件的尺寸</div>
      <div class="setter">
        <SetterRadioButton v-model="designerStore.formProps.size" :options="sizeOptions" />
      </div>
    </div>
    <div class="prop">
      <div class="label">是否隐藏必填字段的星号</div>
      <div class="setter">
        <el-switch v-model="designerStore.formProps.hideRequiredAsterisk" />
      </div>
    </div>
    <div class="prop">
      <div class="label">星号的位置</div>
      <div class="setter">
        <SetterRadioButton
          v-model="designerStore.formProps.requireAsteriskPosition"
          :options="requireAsteriskPositionOptions"
        />
      </div>
    </div>
    <div class="prop">
      <div class="label">是否显示校验错误信息</div>
      <div class="setter">
        <el-switch v-model="designerStore.formProps.showMessage" />
      </div>
    </div>
    <div class="prop">
      <div class="label">是否以行内形式展示校验信息</div>
      <div class="setter">
        <el-switch v-model="designerStore.formProps.inlineMessage" />
      </div>
    </div>
    <div class="prop">
      <div class="label">是否在输入框中显示校验结果反馈图标</div>
      <div class="setter">
        <el-switch v-model="designerStore.formProps.statusIcon" />
      </div>
    </div>
    <div class="prop">
      <div class="label">当校验失败时，滚动到第一个错误表单项</div>
      <div class="setter">
        <el-switch v-model="designerStore.formProps.scrollToError" />
      </div>
    </div>
    <div class="prop">
      <div class="label">是否禁用所有组件</div>
      <div class="setter">
        <el-switch v-model="designerStore.formProps.disabled" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDesignerStore } from '@/stores/designer'

const designerStore = useDesignerStore()

const labelPositionOptions = ref<Option[]>([
  {
    value: 'left',
    name: '左对齐'
  },
  {
    value: 'right',
    name: '右对齐'
  },
  {
    value: 'top',
    name: '顶部对齐'
  }
])
const sizeOptions = ref<Option[]>([
  {
    value: 'large',
    name: '较大'
  },
  {
    value: 'default',
    name: '默认'
  },
  {
    value: 'small',
    name: '较小'
  }
])
const requireAsteriskPositionOptions = ref<Option[]>([
  {
    value: 'left',
    name: '标签左侧'
  },
  {
    value: 'right',
    name: '标签右侧'
  }
])
</script>

<style scoped lang="scss">
.form-props {
  width: 300px;
  padding: 0 10px;
  .prop {
    & + .prop {
      margin-top: 8px;
    }
    .label {
      font-size: 14px;
    }
  }
}
</style>
