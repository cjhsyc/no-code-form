<template>
  <el-button type="primary" @click="onclick"> 保存 </el-button>
</template>

<script setup lang="ts">
import { useDesignerStore, useUserStore } from '@/stores'
import { reqSaveForm } from '@/api'
import { ElMessage } from 'element-plus'

const designerStore = useDesignerStore()
const userStore = useUserStore()
const route = useRoute()

const onclick = () => {
  const { componentList, formProps, width, publish } = designerStore
  reqSaveForm({
    userId: userStore.id,
    renderData: JSON.stringify({ componentList, formProps, width }),
    saveTime: new Date().toLocaleString(),
    publish,
    code: route.params.code as string
  }).then((result) => {
    ElMessage({
      type: result.type,
      message: result.message
    })
  })
}
</script>

<style scoped></style>
