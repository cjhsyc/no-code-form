<template>
  <div class="submit-data">
    <el-table :data="tableData" height="100%">
      <el-table-column
        v-for="item in homeStore.formInputItemList"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :formatter="item.formatter"
      />
      <el-table-column prop="submitTime" label="提交时间" sortable fixed="right"></el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { reqGetSubmitFormList, reqGetSubmitData } from '@/api'
import { useUserStore, useHomeStore } from '@/stores'
import type { SubmitData } from '@/types'

const userStore = useUserStore()
const homeStore = useHomeStore()

const submitDataList = ref<SubmitData[]>([])
const tableData = computed(() => {
  return submitDataList.value.map((item) => {
    return {
      ...item.formData,
      submitTime: item.submitTime
    }
  })
})

watch(
  () => homeStore.search,
  () => {
    if (homeStore.search) {
      reqGetSubmitData(homeStore.search).then((result) => {
        submitDataList.value = result.data.map((item: any) => {
          return {
            ...item,
            formData: JSON.parse(item.formData)
          }
        })
      })
    }
  }
)

onBeforeMount(() => {
  reqGetSubmitFormList(userStore.id).then((result) => {
    homeStore.submitFormList = result.data.map((item: any) => {
      return {
        ...item,
        renderData: JSON.parse(item.renderData)
      }
    })
  })
})
</script>

<style scoped lang="scss">
.submit-data {
  height: calc(100% - 66px);
}
</style>
