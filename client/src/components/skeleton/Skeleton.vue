<!-- 布局框架组件 -->
<template>
  <div class="skeleton">
    <div class="header" v-if="showHeader">
      <div class="header-left" v-if="showHeaderLeft"><slot name="headerLeft" /></div>
      <div class="header-center" v-if="showHeaderCenter"><slot name="headerCenter" /></div>
      <div class="header-right" v-if="showHeaderRight"><slot name="headerRight" /></div>
    </div>
    <div class="main" v-if="showMain" ref="mainRef">
      <Transition name="main-left">
        <div
          class="main-left"
          :class="{ border }"
          v-if="showMainLeft"
          v-show="!isCloseMainLeft"
          ref="mainLeftRef"
        >
          <slot name="mainLeft" />
        </div>
      </Transition>
      <div class="main-center"><slot name="mainCenter" /></div>
      <Transition name="main-right">
        <div
          class="main-right"
          :class="{ border }"
          v-if="showMainRight"
          v-show="!isCloseMainRight"
          ref="mainRightRef"
        >
          <slot name="mainRight" />
        </div>
      </Transition>
      <Transition name="open-main-left">
        <div
          class="open-button open-main-left"
          @click="openMainLeft"
          v-if="showMainLeft"
          v-show="isCloseMainLeft"
        >
          <el-icon :size="12">
            <ArrowRightBold></ArrowRightBold>
          </el-icon>
        </div>
      </Transition>
      <Transition name="open-main-right">
        <div
          class="open-button open-main-right"
          @click="openMainRight"
          v-if="showMainRight"
          v-show="isCloseMainRight"
        >
          <el-icon :size="12">
            <ArrowLeftBold></ArrowLeftBold>
          </el-icon>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useElementBounding, useWindowSize } from '@vueuse/core'

defineProps({
  border: {
    type: Boolean,
    default: true
  }
})

const { proxy } = getCurrentInstance()!

const showHeaderCenter = computed(() => Boolean(proxy?.$slots.headerCenter))
const showHeaderLeft = computed(() => Boolean(proxy?.$slots.headerLeft) || showHeaderCenter.value)
const showHeaderRight = computed(() => Boolean(proxy?.$slots.headerRight) || showHeaderCenter.value)
const showHeader = computed(
  () => showHeaderCenter.value || showHeaderLeft.value || showHeaderRight.value
)
const showMainLeft = computed(() => Boolean(proxy?.$slots.mainLeft))
const showMainCenter = computed(() => Boolean(proxy?.$slots.mainCenter))
const showMainRight = computed(() => Boolean(proxy?.$slots.mainRight))
const showMain = computed(() => showMainLeft.value || showMainCenter.value || showMainRight.value)

const mainRef = ref<HTMLDivElement>()
const mainLeftRef = ref<HTMLDivElement>()
const mainRightRef = ref<HTMLDivElement>()
const { top } = useElementBounding(mainRef) // 主内容区顶部距离窗口顶部的距离
const mainLeftWidth = ref(0) // 左侧区域的宽度
const mainRightWidth = ref(0) // 右侧区域的宽度
const windowHeight = useWindowSize().height // 窗口高度

// 动态计算主内容区域的高度
const height = computed(() => `${windowHeight.value - top.value}px`)
const isCloseMainLeft = ref(false) // 是否关闭左侧区域
const isCloseMainRight = ref(false) // 是否关闭右侧区域

onMounted(() => {
  // 计算左侧和右侧区域的keyframes规则
  mainLeftWidth.value = mainLeftRef.value?.getBoundingClientRect().width!
  mainRightWidth.value = mainRightRef.value?.getBoundingClientRect().width!
  const openMainLeftKeyframes = `
    @keyframes open-main-left {
      0% {
        width: 0;
      }
      100% {
        width: ${mainLeftWidth.value}px;
      }
    }`
  const openMainRightKeyframes = `
    @keyframes open-main-right {
      0% {
        width: 0;
      }
      100% {
        width: ${mainRightWidth.value}px;
      }
    }`
  // 样式表对象
  const styleSheet = document.styleSheets[0]
  // 插入动画规则
  styleSheet.insertRule(openMainLeftKeyframes, styleSheet.cssRules.length)
  styleSheet.insertRule(openMainRightKeyframes, styleSheet.cssRules.length)
})

// 关闭左侧区域
const closeMainLeft = () => {
  isCloseMainLeft.value = true
}
// 打开左侧区域
const openMainLeft = () => {
  isCloseMainLeft.value = false
}
// 关闭右侧区域
const closeMainRight = () => {
  isCloseMainRight.value = true
}
// 打开右侧区域
const openMainRight = () => {
  isCloseMainRight.value = false
}

defineExpose({
  closeMainLeft,
  closeMainRight,
  openMainLeft,
  openMainRight
})

provide('closeMainLeft', closeMainLeft)
provide('closeMainRight', closeMainRight)
provide('openMainLeft', openMainLeft)
provide('openMainRight', openMainRight)
</script>

<style scoped lang="scss">
.skeleton {
  .header {
    border-bottom: 1px solid var(--color-border);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }
  .main {
    display: flex;
    position: relative;
    overflow: hidden;
    height: v-bind(height);
    .main-left {
      height: 100%;
      // 超出隐藏，防止收起动画时内部元素超出外边框
      overflow: hidden;
      &.border {
        border-right: 1px solid var(--color-border);
      }
    }
    .main-center {
      flex: 1;
      height: 100%;
      overflow: hidden;
    }
    .main-right {
      height: 100%;
      overflow: hidden;
      &.border {
        border-left: 1px solid var(--color-border);
      }
    }
    .open-button {
      position: absolute;
      top: 10px;
      padding: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      box-shadow: 0 8px 12px rgb(0 0 0 / 8%), 0 0 4px rgb(0 0 0 / 8%);
      background: var(--color-primary);
      color: white;
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
    }
    .open-main-left {
      border-radius: 0 8px 8px 0;
      left: -4px;
    }
    .open-main-right {
      border-radius: 8px 0 0 8px;
      right: -4px;
    }
  }
}

// 左侧区域动画
.main-left-enter-active {
  animation: open-main-left 0.6s ease-in-out;
}
.main-left-leave-active {
  animation: open-main-left 0.6s ease-in-out reverse;
}
// 右侧区域动画
.main-right-enter-active {
  animation: open-main-right 0.6s ease-in-out;
}
.main-right-leave-active {
  animation: open-main-right 0.6s ease-in-out reverse;
}

// 打开左侧区域按钮动画
.open-main-left-enter-active,
.open-main-left-leave-active {
  transition: transform 0.4s ease-in-out;
}
.open-main-left-enter-active {
  transition-delay: 0.4s;
}
.open-main-left-enter-from,
.open-main-left-leave-to {
  transform: translateX(-20px);
}
// 打开右侧区域按钮动画
.open-main-right-enter-active,
.open-main-right-leave-active {
  transition: transform 0.4s ease-in-out;
}
.open-main-right-enter-active {
  transition-delay: 0.4s;
}
.open-main-right-enter-from,
.open-main-right-leave-to {
  transform: translateX(20px);
}
</style>
