<template>
  <el-button v-bind="$attrs">{{ content }}</el-button>
</template>

<script setup lang="ts">
defineProps({
  content: {
    type: String,
    default: '按钮'
  }
})
</script>

<style scoped></style>
