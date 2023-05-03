<template>
  <skeleton ref="skeletonRef">
    <template #headerLeft>
      <Back :path="'/home/form'" :title="designerStore.formName" />
    </template>
    <template #headerCenter>
      <div class="header-center">
        <Size />
      </div>
    </template>
    <template #headerRight>
      <div class="header-right">
        <Clear class="flexbox" />
        <Preview class="flexbox" />
        <Save class="flexbox" />
      </div>
    </template>
    <template #mainLeft>
      <AssetsPanel :metadataList="metadataList" />
    </template>
    <template #mainCenter>
      <FormCanvas />
    </template>
    <template #mainRight>
      <PropPanel />
    </template>
  </skeleton>
</template>

<script setup lang="ts">
import { metadataList } from '@/data/metadata-list'
import { useDesignerStore, useHomeStore, useUserStore } from '@/stores'
import { reqGetDicts } from '@/api'

const designerStore = useDesignerStore()
const homeStore = useHomeStore()
const userStore = useUserStore()

onMounted(() => {
  reqGetDicts(userStore.id).then((result) => {
    homeStore.dictList = result.data
  })
})
</script>

<style scoped lang="scss">
.header-right {
  display: flex;
  .flexbox + .flexbox {
    margin-left: 10px;
  }
}
</style>
