<template>
  <el-form-item
    v-bind="$attrs"
    :label="showLabel ? label : ''"
    :label-width="showLabel ? labelWidth : 0"
  >
    <template v-for="(slot, name) in $slots" #[name]>
      <slot :name="name"></slot>
    </template>
  </el-form-item>
</template>

<script setup lang="ts">
defineProps({
  showLabel: {
    type: Boolean,
    default: true
  },
  label: {
    type: String,
    default: ''
  },
  labelWidth: {
    type: Number,
    default: 100
  }
})
</script>

<style scoped></style>
