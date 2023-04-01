<template>
  <div class="select-icon">
    <el-input v-model.trim="selectedIcon" :suffix-icon="selectedIcon" clearable v-bind="$attrs">
      <template #append>
        <el-button @click="selectIcon">点击选择</el-button>
      </template>
    </el-input>
    <el-dialog v-model="showDialog" width="70%" top="10vh" class="search-dialog">
      <template #header="{ titleClass }">
        <div class="header">
          <div class="title" :class="titleClass">选择图标</div>
          <el-input v-model.trim="searchValue" placeholder="请输入图标名" prefix-icon="Search" clearable/>
        </div>
      </template>
      <div class="icon-list">
        <div class="icon" v-for="icon in iconList" :key="icon" @click="clickIcon(icon)">
          <el-icon :size="28">
            <component :is="icon"></component>
          </el-icon>
          <div class="name">{{ icon }}</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const prop = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

// 选中的图标
const selectedIcon = computed({
  get: () => prop.modelValue,
  set: (newValue) => emit('update:modelValue', newValue)
})
const showDialog = ref(false)
const searchValue = ref('')

const iconList = computed(() => {
  return Object.keys(ElementPlusIconsVue).filter(
    (icon) => icon.toLowerCase().indexOf(searchValue.value.toLowerCase()) > -1
  )
})

// 打开图标选择对话框
const selectIcon = () => {
  showDialog.value = true
}

// 选中图标
const clickIcon = (icon: string) => {
  selectedIcon.value = icon
  showDialog.value = false
}
</script>

<style scoped lang="scss">
@use '@/styles/mixin.scss' as *;

.search-dialog {
  :deep(.el-dialog__body) {
    padding: 10px;
    height: calc(65vh + 20px);
    box-sizing: border-box;
  }
  .header {
    display: inline-flex;
    align-items: center;
    .title {
      width: 120px;
    }
  }
  .icon-list {
    display: flex;
    flex-wrap: wrap;
    max-height: 65vh;
    overflow: auto;
    @include scrollbar();
    .icon {
      flex-basis: 20%;
      height: 100px;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &:hover {
        background-color: var(--color-background-soft);
      }
      .name {
        margin-top: 10px;
      }
    }
  }
}
</style>
