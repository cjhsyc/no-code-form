<template>
  <skeleton ref="skeletonRef">
    <template #headerCenter>
      <div class="header-center">
        <!-- <History /> -->
        <Size />
      </div>
    </template>
    <template #headerRight>
      <Preview />
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
import widgets from '@/materials/widgets'
import { metadataList } from '@/data/metadata-list'

const { appContext } = getCurrentInstance()!
// 注册所有二次封装的素材组件
appContext.app.use(widgets)
</script>

<style scoped lang="scss">
.header-center {
  display: flex;
  width: calc(100%);
}
</style>
