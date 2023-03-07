<template>
  <VueDraggable
    class="assets"
    v-model="metadataList"
    :sort="false"
    :group="{ name: 'assets', pull: 'clone', put: false }"
    :clone="onClone"
    item-key="component"
  >
    <template #item="{ element }">
      <el-button class="draggable" plain type="primary">{{ element.name }}</el-button>
    </template>
  </VueDraggable>
</template>

<script setup lang="ts">
import { deepClone, uuid } from '@/utils'
import VueDraggable from 'vuedraggable'

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
    ...deepClone(original),
    span: 24,
    formItemProps: {
      label: original.name,
      labelWidth: 100
    }
  }
}
</script>

<style scoped lang="scss">
.assets {
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px;
  .draggable {
    width: 120px;
    margin: 10px 10px 0;
  }
}
</style>
