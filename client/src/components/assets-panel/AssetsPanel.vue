<template>
  <div class="assets-panel">
    <div class="header">
      <el-input
        class="search"
        v-model.trim="searchValue"
        placeholder="搜索组件"
        prefix-icon="Search"
        size="large"
        clearable
      ></el-input>
      <div class="close-button" @click="closeMainLeft">
        <el-icon :size="30">
          <fold />
        </el-icon>
      </div>
    </div>
    <el-collapse v-model="activeNames" class="category">
      <el-collapse-item name="basic" v-show="basicComponents.length">
        <template #title>
          <div class="category-title">基础组件</div>
        </template>
        <Assets :metadata-list="basicComponents"></Assets>
      </el-collapse-item>
      <el-collapse-item name="input" v-show="inputComponents.length">
        <template #title>
          <div class="category-title">输入型组件</div>
        </template>
        <Assets :metadata-list="inputComponents"></Assets>
      </el-collapse-item>
    </el-collapse>
    <el-empty v-show="searchedComponents.length === 0" description="未找到相关组件" />
  </div>
</template>

<script setup lang="ts">
import type { CloseMainLeft, Metadata } from '@/types'
import Assets from './Assets.vue'
import { useDesignerStore } from '@/stores'

const props = defineProps({
  metadataList: {
    type: Object as PropType<Metadata[]>,
    default: new Object()
  }
})

const designerStore = useDesignerStore()
// 搜索词
const searchValue = ref('')
// 关闭素材面板
const closeMainLeft = inject<CloseMainLeft>('closeMainLeft')!
// 展开的组件分类
const activeNames = ref<string[]>(['input', 'basic'])
// 搜索过滤后的组件列表
const searchedComponents = computed(() => {
  return props.metadataList.filter((item) => item.name.indexOf(searchValue.value) > -1)
})
// 过滤已拖入画布的唯一组件后的组件列表
const notOnlyComponents = computed(() => {
  return searchedComponents.value.filter((item) => {
    if (item.only) {
      return !designerStore.componentList.find((component) => component.component === item.component)
    }
    return true
  })
})
// 表单组件列表
const inputComponents = computed(() => {
  return notOnlyComponents.value.filter((item) => item.category === 'input')
})
// 基础组件列表
const basicComponents = computed(() => {
  return notOnlyComponents.value.filter((item) => item.category === 'basic')
})
</script>

<style scoped lang="scss">
.assets-panel {
  width: 300px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    .search {
      margin-right: 12px;
    }
    .close-button {
      height: 38px;
      cursor: pointer;
      padding: 4px;
      border-radius: 4px;
      &:hover {
        background-color: var(--color-background-blue);
      }
    }
  }
  .category {
    .category-title {
      user-select: none;
      padding-left: 20px;
      font-weight: bolder;
      font-size: 16px;
    }
  }
}
</style>
