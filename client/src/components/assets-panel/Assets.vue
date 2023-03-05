<template>
  <VueDraggable
    class="assets"
    v-model="metadataList"
    :sort="false"
    :group="{ name: 'assets', pull: 'clone', put: false }"
    @clone="onClone"
    item-key="component"
  >
    <template #item="{ element }">
      <el-button class="draggable" plain>{{ element.name }}</el-button>
    </template>
  </VueDraggable>
</template>

<script setup lang="ts">
import VueDraggable from 'vuedraggable'
import { uuid, deepClone } from '@/utils'

const props = defineProps({
  metadataList: {
    type: Object as PropType<Metadata[]>,
    default: new Object()
  }
})

const metadataList = computed(() => props.metadataList)

// 拖入新组件时添加id并深拷贝
const onClone = (original: Metadata): ComponentData => {
  return {
    id: uuid(original.name),
    ...deepClone(original)
  }
}
</script>

<style scoped lang="scss">
.assets {
  display: flex;
  flex-wrap: wrap;
  padding: 0 20px;
  .draggable {
    width: 120px;
  }
}
</style>
