<template>
  <el-dropdown trigger="click">
    <div class="actions">
      <el-icon :size="18"><MoreFilled /></el-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item icon="RefreshLeft" @click="reset">重做</el-dropdown-item>
        <el-dropdown-item
          :icon="designerStore.publish ? 'CircleCloseFilled' : 'UploadFilled'"
          @click="changePublish(route.params.code as string, !designerStore.publish)"
        >
          {{ designerStore.publish ? '下线' : '发布' }}
        </el-dropdown-item>
        <el-dropdown-item icon="DocumentAdd">保存为模板</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useDesignerStore } from '@/stores'
import { reqPublishForm } from '@/api'
import { ElMessage, ElMessageBox } from 'element-plus'

const designerStore = useDesignerStore()
const route = useRoute()

// 发布或下线表单
const changePublish = (code: string, publish: boolean) => {
  reqPublishForm(code, publish).then((result) => {
    ElMessage({
      type: result.type,
      message: result.message
    })
    if (result.success) {
      designerStore.publish = publish
    }
  })
}

// 重做表单
const reset = () => {
  ElMessageBox.confirm('确认要重做吗？', '提示', { type: 'warning' })
    .then(() => {
      designerStore.reset()
    })
    .catch(() => {})
}
</script>

<style scoped lang="scss">
.actions {
  transform: rotate(90deg);
  cursor: pointer;
  border-radius: 50%;
  height: 32px;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: var(--color-background-hover);
  }
}
</style>
