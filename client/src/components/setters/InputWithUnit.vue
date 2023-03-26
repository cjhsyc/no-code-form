<template>
  <el-input v-model.number="value" v-bind="$attrs">
    <template #suffix>
      <div class="unit">{{ unit }}</div>
    </template>
  </el-input>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: [Number, String],
    default: 0
  },
  unit: {
    type: String,
    default: ''
  },
  min: {
    type: Number
  },
  max: {
    type: Number
  },
  stringValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get: () => {
    return typeof props.modelValue === 'number' ? props.modelValue : parseFloat(props.modelValue) || 0
  },
  set: (newValue: number) => {
    if (props.min && newValue < props.min) {
      emit('update:modelValue', props.stringValue ? props.min + props.unit : props.min)
    } else if (props.max && newValue > props.max) {
      emit('update:modelValue', props.stringValue ? props.max + props.unit : props.max)
    } else {
      emit('update:modelValue', props.stringValue ? newValue + props.unit : newValue)
    }
  }
})
</script>

<style scoped>
.unit {
  user-select: none;
}
</style>
