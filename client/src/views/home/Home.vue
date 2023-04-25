<template>
  <skeleton ref="skeletonRef" :border="false">
    <template #mainLeft>
      <div class="menu">
        <div class="menu-header">
          <div class="switch-collapse" @click="onClick">
            <el-icon :size="24">
              <component :is="isCollapse ? 'expand' : 'fold'"></component>
            </el-icon>
          </div>
          <Transition name="title">
            <div class="title" v-show="!isCollapse">零代码表单</div>
          </Transition>
        </div>
        <el-menu default-active="form" :collapse="isCollapse" router>
          <el-menu-item index="form">
            <el-icon><icon-menu /></el-icon>
            <template #title>我的表单</template>
          </el-menu-item>
          <el-menu-item index="dict">
            <el-icon><document /></el-icon>
            <template #title>字典管理</template>
          </el-menu-item>
          <el-menu-item index="rule">
            <el-icon><setting /></el-icon>
            <template #title>规则管理</template>
          </el-menu-item>
          <el-menu-item index="data">
            <el-icon><DataAnalysis /></el-icon>
            <template #title>数据看板</template>
          </el-menu-item>
        </el-menu>
      </div>
    </template>
    <template #mainCenter>
      <div class="content">
        <div class="content-header">
          <div class="search">
            <el-input
              v-model.trim="homeStore.search"
              prefix-icon="Search"
              placeholder="搜索"
              clearable
            ></el-input>
          </div>
          <div class="avatar">
            <el-avatar :src="avatarUrl"  />
          </div>
        </div>
        <RouterView />
      </div>
    </template>
  </skeleton>
</template>

<script setup lang="ts">
import { Menu as IconMenu } from '@element-plus/icons-vue'
import { useHomeStore } from '@/stores'
import { useUserStore } from '@/stores'

const homeStore = useHomeStore()
const userStore = useUserStore()
const isCollapse = ref(false)
const avatarUrl = computed(() => {
  if (userStore.avatar) {
    return import.meta.env.VITE_REQUEST_BASE_URL + '/img/avatar/' + userStore.avatar
  } else {
    return ''
  }
})

const onClick = () => {
  isCollapse.value = !isCollapse.value
  console.log(userStore)
}
</script>

<style scoped lang="scss">
.menu {
  height: 100%;
  background-color: var(--color-background-soft);
  .menu-header {
    display: flex;
    padding: 30px 17px;
    align-items: center;
    .switch-collapse {
      height: 30px;
      width: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      cursor: pointer;
      &:hover {
        background-color: var(--color-background-hover);
      }
    }
    .title {
      padding-left: 16px;
      font-size: 18px;
      font-weight: bolder;
      white-space: nowrap;
    }
    .title-enter-active {
      animation: title-show 0.2s ease-in-out;
    }
    .title-leave-active {
      animation: title-show 0.2s ease-in-out reverse;
    }
    @keyframes title-show {
      from {
        width: 0;
      }
      to {
        width: 106px;
      }
    }
  }
  .el-menu {
    background-color: transparent;
    border: none;
    --el-menu-hover-bg-color: var(--color-background-hover);
    &:not(.el-menu--collapse) {
      width: 240px;
    }
  }
}
.content {
  min-width: 500px;
  height: 100%;
  padding: 10px 16px;
  .content-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;
    .avatar {
      .el-avatar {
        cursor: pointer;
      }
    }
  }
}
</style>
