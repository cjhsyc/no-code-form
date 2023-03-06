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
      <el-collapse-item name="form" v-show="formComponents.length">
        <template #title>
          <div class="category-title">表单组件</div>
        </template>
        <Assets :metadata-list="formComponents"></Assets>
      </el-collapse-item>
      <el-collapse-item name="basic" v-show="basicComponents.length">
        <template #title>
          <div class="category-title">基础组件</div>
        </template>
        <Assets :metadata-list="basicComponents"></Assets>
      </el-collapse-item>
    </el-collapse>
    <el-empty v-show="searchedComponents.length === 0" description="未找到相关组件"/>
  </div>
</template>

<script setup lang="ts">
import Assets from './Assets.vue'

const props = defineProps({
  metadataList: {
    type: Object as PropType<Metadata[]>,
    default: new Object()
  }
})

// 搜索词
const searchValue = ref('')
// 关闭素材面板
const closeMainLeft = inject<CloseMainLeft>('closeMainLeft')
// 展开的组件分类
const activeNames = ref<string[]>(['form', 'basic'])
// 搜索过滤后的组件列表
const searchedComponents = computed(() => {
  return props.metadataList.filter((item) => item.name.indexOf(searchValue.value) > -1)
})
// 表单组件列表
const formComponents = computed(() => {
  return searchedComponents.value.filter((item) => item.category === 'form')
})
// 基础组件列表
const basicComponents = computed(() => {
  return searchedComponents.value.filter((item) => item.category === 'basic')
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
      padding-left: 20px;
      font-weight: bolder;
      font-size: 16px;
    }
  }
}
</style>
