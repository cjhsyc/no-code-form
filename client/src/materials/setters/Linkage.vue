<template>
  <div class="linkage">
    <div class="text" @click="edit">{{ modelValue ? '已设置，点击编辑' : '未设置，点击设置' }}</div>
    <el-icon @click="edit"><ArrowRight /></el-icon>
    <el-dialog
      v-model="showDialog"
      title="选项联动"
      width="800px"
      :close-on-click-modal="false"
      top="10vh"
    >
      <div class="tips">一个选项可以关联一个或多个组件，当填写者选中指定项时，被关联组件才会显示</div>
      <el-table :data="tableData" border style="width: 100%" height="55vh" class="linkage-table">
        <el-table-column label="选项">
          <template #default="{ row }">
            {{ row.label || row.value }}
          </template>
        </el-table-column>
        <el-table-column label="联动目标">
          <template #default="{ row }">
            <el-select
              v-model="linkageData[row.id]"
              :style="{ width: '100%' }"
              multiple
              placeholder="选择联动目标（可多选）"
              clearable
            >
              <el-option
                v-for="item in targets"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              />
            </el-select>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showDialog = false">取消</el-button>
          <el-button type="primary" @click="onSave">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import type { Linkage, SelectOption } from '@/types'
import { useDesignerStore } from '@/stores'
import { ElMessage } from 'element-plus'
import { deepClone } from '@/utils'

const props = defineProps({
  modelValue: {
    type: Object as PropType<Linkage>,
    default: null
  }
})

const emit = defineEmits(['update:modelValue'])

const designerStore = useDesignerStore()
const showDialog = ref(false)
const targets = computed(() => {
  return designerStore.componentList.reduce((targets, component) => {
    if (
      component.props.linkage?.value ||
      component.component === 'widget-title' ||
      component.id === designerStore.currentComponent?.id
    ) {
      return targets
    }
    return [...targets, { id: component.id, label: component.props.label?.value }]
  }, [] as { id: string; label: string }[])
})
const tableData = computed(() => {
  return (designerStore.currentComponent?.props.options?.value || []).filter(
    (option: SelectOption) => option.value
  )
})
const linkageData = ref<Linkage>({})

const edit = () => {
  if (targets.value.length === 0) {
    ElMessage({
      type: 'warning',
      message: '无可选的联动目标'
    })
  } else {
    linkageData.value = deepClone(props.modelValue || {})
    showDialog.value = true
  }
}

const onSave = () => {
  const newLinkage: Linkage = {}
  for (const id in linkageData.value) {
    if (linkageData.value[id].length > 0) {
      newLinkage[id] = linkageData.value[id]
    }
  }
  if (Object.keys(newLinkage).length > 0) {
    emit('update:modelValue', newLinkage)
  } else {
    emit('update:modelValue', null)
  }
  showDialog.value = false
}
</script>

<style scoped lang="scss">
.linkage {
  display: flex;
  align-items: center;
  color: var(--color-primary);
  .text {
    font-size: 14px;
    padding-right: 5px;
    cursor: pointer;
  }
  .el-icon {
    cursor: pointer;
  }
  :deep(.el-dialog) {
    .el-dialog__body {
      padding: 0 20px 10px;
    }
    .tips {
      color: var(--color-text-2);
      padding-bottom: 20px;
    }
  }
}
</style>
