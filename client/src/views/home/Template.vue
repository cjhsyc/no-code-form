<template>
  <div>我的模板</div>
</template>

<script setup lang="ts">
import { reqGetForms } from '@/api'
import { useUserStore } from '@/stores'
import type { FormInfo, FormData } from '@/types'

const userStore = useUserStore()

const formList = ref<FormInfo[]>([])
const formDataList = computed<FormData[]>(() => {
  return formList.value.map((form) => {
    return {
      ...form,
      renderData: JSON.parse(form.renderData)
    }
  })
})

// 获取我的表单列表
onBeforeMount(() => {
  reqGetForms(userStore.id).then((result) => {
    formList.value = result.data
  })
})
</script>

<style scoped></style>
