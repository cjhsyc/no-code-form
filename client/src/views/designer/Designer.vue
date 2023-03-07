<template>
  <skeleton ref="skeletonRef">
    <template #mainLeft>
      <AssetsPanel :metadataList="metadataList"></AssetsPanel>
    </template>
    <template #mainCenter>
      <FormCanvas></FormCanvas>
    </template>
    <template #mainRight> </template>
  </skeleton>
</template>

<script setup lang="ts">
import AssetsPanel from '@/components/assets-panel/AssetsPanel.vue'
import FormCanvas from '@/components/canvas/FormCanvas.vue'
import widgets from '@/components/widgets'
import { metadataList } from '@/data/metadataList'

const { appContext } = getCurrentInstance()!
// 注册所有二次封装的素材组件
appContext.app.use(widgets)
</script>

<style scoped lang="scss"></style>
