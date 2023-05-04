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
      <el-button class="draggable" plain size="large">{{ element.name }}</el-button>
    </template>
  </VueDraggable>
</template>

<script setup lang="ts">
import { getFormItemProps } from '@/data/form-item-props'
import type { ComponentData, Metadata } from '@/types'
import { deepClone, uuid } from '@/utils'
import VueDraggable from 'vuedraggable'
import { useDesignerStore } from '@/stores'

const props = defineProps({
  metadataList: {
    type: Object as PropType<Metadata[]>,
    default: new Object()
  }
})

const designerStore = useDesignerStore()
const metadataList = computed(() => props.metadataList)

// 拖入新组件时添加id和表单项属性并深拷贝
const onClone = (original: Metadata): ComponentData => {
  return {
    id: uuid(original.component),
    ...deepClone(original),
    props: getFormItemProps(original)
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
    border-color: transparent;
    background-color: var(--color-background-blue);
    &:hover {
      border-color: unset;
      border-style: dashed;
      border-width: 2px;
    }
  }
}
</style>
