<template>
  <el-select v-bind="$attrs">
    <el-option
      v-for="option in options"
      :key="option.value"
      :label="option.label"
      :disable="option.disabled"
    ></el-option>
  </el-select>
</template>

<script setup lang="ts">
defineProps({
  options: {
    type: Array as PropType<SelectOption[]>
  }
})
</script>

<style scoped></style>
