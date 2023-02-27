<template>
  <VueDraggable
    v-model="metadataList"
    :sort="false"
    :group="{ name: 'assets', pull: 'clone', put: false }"
    @clone="onClone"
  >
    <template #item="{ element }">
      <div>{{ element.name }}</div>
    </template>
  </VueDraggable>
</template>

<script setup lang="ts">
import VueDraggable from 'vuedraggable'
import { uuid,deepClone } from '@/utils'

const props = defineProps({
  metadataList: {
    type: Object as PropType<Metadata[]>,
    default: new Object()
  }
})

const metadataList = ref(props.metadataList)

// 拖入新组件时添加id并深拷贝
const onClone = (original: Metadata): ComponentData => {
  return {
    id: uuid(original.name),
    ...deepClone(original)
  }
}
</script>

<style scoped></style>
