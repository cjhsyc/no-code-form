<template>
  <div class="setter-options">
    <VueDraggable class="options" v-model="options" item-key="id" handle=".drag">
      <template #item="{ index }">
        <div class="option">
          <div class="drag">:::</div>
          <div class="label">
            <el-input
              v-model.trim="options[index].label"
              @input="oninputLabel($event, index)"
              placeholder="选项名"
              clearable
            ></el-input>
          </div>
          <div class="value">
            <el-input
              v-model.trim="options[index].value"
              @input="oninputValue($event, index)"
              placeholder="选项值"
              clearable
            ></el-input>
          </div>
          <div class="remove" :class="{ empty: options.length < 2 }">
            <el-icon @click="remove(index)"><Remove /></el-icon>
          </div>
        </div>
      </template>
    </VueDraggable>
    <div class="add" @click="add">
      <el-icon><CirclePlus /></el-icon>
      <div class="text">添加选项</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SelectOption } from '@/types'
import VueDraggable from 'vuedraggable'
import { uuid } from '@/utils'

const props = defineProps({
  modelValue: {
    type: Array as PropType<SelectOption[]>,
    default: new Array()
  }
})

const emit = defineEmits(['update:modelValue'])

const options = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', newValue)
})

const oninputLabel = (label: string, index: number) => {
  const newOptions = options.value
  newOptions[index].label = label
  options.value = newOptions
}
const oninputValue = (value: string, index: number) => {
  const newOptions = options.value
  newOptions[index].value = value
  options.value = newOptions
}

// 新增一个选项
const add = () => {
  options.value.push({ value: '', id: uuid() })
}

// 移除一个选项
const remove = (index: number) => {
  options.value.splice(index, 1)
}
</script>

<style scoped lang="scss">
.setter-options {
  .options {
    .option {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .drag {
        padding-left: 6px;
        font-size: large;
        transform: rotate(90deg);
        user-select: none;
        cursor: move;
      }
      .label,
      .value {
        width: 110px;
      }

      .remove {
        cursor: pointer;
        color: var(--color-danger);
        &.empty {
          opacity: 0;
          pointer-events: none;
        }
      }
      & + .option {
        margin-top: 4px;
      }
    }
  }
  .add {
    margin-left: 12px;
    margin-top: 8px;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    color: var(--color-primary);
    .el-icon {
      margin-right: 6px;
    }
    .text {
      font-size: smaller;
    }
  }
}
</style>
