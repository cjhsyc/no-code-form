<template>
  <div class="edit-dict">
    <el-dialog
      v-model="showDialog"
      :title="title"
      width="600px"
      class="dict-dialog"
      :close-on-click-modal="false"
      @close="emit('close')"
    >
      <div class="dict-name form-item">
        <div class="label">字典名称</div>
        <div class="setter" :class="{ empty: isEmpty }">
          <el-input v-model="modelValue.name" @input="onInput" :readonly="!editable"></el-input>
          <div class="tips" v-show="isEmpty">请输入字典名称</div>
        </div>
      </div>
      <div class="dict-options form-item">
        <div class="label">选项内容</div>
        <el-scrollbar class="setter">
          <dict-options v-model="modelValue.options" :editable="editable"></dict-options>
        </el-scrollbar>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="emit('update:showDialog', false)">取消</el-button>
          <el-button v-show="editable" type="primary" @click="onSave">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import type { DictEdit } from '@/types'
import { deepClone } from '@/utils'
import { ElMessage } from 'element-plus'

const props = defineProps({
  showDialog: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '编辑字典'
  },
  modelValue: {
    type: Object as PropType<DictEdit>,
    default: null
  },
  editable: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:showDialog', 'update:modelValue', 'save', 'close'])

const showDialog = computed({
  get: () => props.showDialog,
  set: (newValue) => emit('update:showDialog', newValue)
})

const modelValue = ref(deepClone(props.modelValue))

const isEmpty = ref(false)

const onInput = () => {
  if (modelValue.value.name) {
    isEmpty.value = false
  } else {
    isEmpty.value = true
  }
}

const onSave = () => {
  if (modelValue.value.name) {
    if (modelValue.value.options.find((item) => !item.value)) {
      ElMessage({
        type: 'warning',
        message: '选项值不能为空'
      })
    } else {
      emit('save', {
        ...modelValue.value,
        options: modelValue.value.options
      })
    }
  } else {
    isEmpty.value = true
  }
}

watch(
  () => props.modelValue,
  (newValue) => {
    modelValue.value = deepClone(newValue)
  }
)

watch(
  () => props.showDialog,
  () => {
    isEmpty.value = false
  }
)
</script>

<style scoped lang="scss">
.edit-dict {
  :deep(.dict-dialog .el-dialog__body) {
    padding: 10px 20px 0;
  }
  .form-item {
    .label {
      font-weight: bolder;
      margin-bottom: 4px;
    }
    &:first-child {
      margin-bottom: 16px;
    }
  }
  .dict-name {
    .label::after {
      content: '*';
      color: var(--el-color-danger);
      margin-left: 4px;
    }
    .setter {
      .tips {
        position: absolute;
        bottom: -20px;
        font-size: smaller;
        color: var(--el-color-danger);
      }
      &.empty {
        :deep(.el-input__wrapper) {
          box-shadow: 0 0 0 1px var(--el-color-danger) inset;
        }
      }
    }
  }
  .dict-options {
    .setter {
      height: 40vh;
      padding-right: 16px;
      overflow: auto;
    }
  }
}
</style>
