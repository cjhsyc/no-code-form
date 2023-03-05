<template>
  <skeleton ref="skeletonRef">
    <template #mainLeft>
      <AssetsPanel :metadataList="metadataList"></AssetsPanel>
    </template>
    <template #mainCenter>
      <FormCanvas></FormCanvas>
    </template>
    <template #mainRight>
      <div class="close" @click="skeletonRef.closeMainRight">close</div>
    </template>
  </skeleton>
</template>

<script setup lang="ts">
import AssetsPanel from '@/components/assets-panel/AssetsPanel.vue'
import FormCanvas from '@/components/canvas/FormCanvas.vue'
import { metadataList } from '@/data/metadataList'

const skeletonRef = ref()
</script>

<style scoped lang="scss">
.close {
  width: 300px;
}
</style>
