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
    type: Number,
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
  }
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get: () => props.modelValue,
  set: (newValue: number) => {
    if(props.min && newValue < props.min) {
      emit('update:modelValue', props.min)
    } else if(props.max && newValue > props.max) {
      emit('update:modelValue', props.max)
    } else {
      emit('update:modelValue', newValue)
    }
  }
})
</script>

<style scoped>
.unit {
  user-select: none;
}
</style>
