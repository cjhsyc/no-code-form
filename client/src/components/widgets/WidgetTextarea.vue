<template>
  <el-input type="textarea" v-bind="$attrs" :resize="resize ? 'vertical' : 'none'"></el-input>
</template>

<script setup lang="ts">
defineProps({
  // 是否能被用户缩放
  resize: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped></style>
