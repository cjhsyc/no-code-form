<template>
  <div class="col-span">
    <el-button-group class="col-number">
      <el-button
        v-for="item in spanNum"
        :key="item"
        class="col-item"
        :class="{ active: item <= activeNum, hover: item <= hoverNum && item > activeNum }"
        @click="changeColNum(item)"
        @mouseenter="hoverNum = item"
        @mouseleave="hoverNum = 0"
      ></el-button>
    </el-button-group>
    <el-button class="span-number" icon="refresh" @click="changeSpanNum">{{
      spanNum === 4 ? '四栏' : '三栏'
    }}</el-button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Number as PropType<6 | 8 | 12 | 16 | 18 | 24>,
    default: 12
  }
})

const emit = defineEmits(['update:modelValue'])

const spanNum = ref(props.modelValue % 6 === 0 ? 4 : 3)
const itemNum = ref(24 / spanNum.value)
const itemWidth = computed(() => `${100 / spanNum.value}%`)
const activeNum = computed({
  get: () => props.modelValue / itemNum.value,
  set: (newValue) => {
    emit('update:modelValue', newValue * (24 / spanNum.value))
  }
})
const hoverNum = ref(0)

const changeColNum = (num: number) => {
  activeNum.value = num
}

const changeSpanNum = () => {
  spanNum.value = spanNum.value === 4 ? 3 : 4
  activeNum.value = Math.min(activeNum.value, spanNum.value)
  itemNum.value = 24 / spanNum.value
}
</script>

<style scoped lang="scss">
.col-span {
  display: flex;
  justify-content: space-between;
  .col-number {
    width: calc(100% - 80px);
    display: flex;
    overflow: hidden;
    .col-item {
      width: v-bind(itemWidth);
      & + .col-item {
        height: 100%;
        border-left: var(--el-border);
      }
      &.active {
        background-color: var(--color-primary);
      }
      &.hover,
      &:hover {
        background-color: var(--el-color-primary-light-3);
      }
    }
  }
  .span-number {
    width: 70px;
  }
}
</style>
