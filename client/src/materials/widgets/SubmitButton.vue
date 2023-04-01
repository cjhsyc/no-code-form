<template>
  <div class="submit-button">
    <el-button v-bind="$attrs" :style="{ width: width + 'px' }" @click="onSubmit">
      {{ content }}
    </el-button>
  </div>
</template>

<script setup lang="ts">
defineProps({
  content: {
    type: String,
    default: '提交'
  },
  width: {
    type: [Number, String],
    default: 120
  }
})

const emit = defineEmits(['submit'])

const onSubmit = () => {
  emit('submit')
}
</script>

<style scoped lang="scss">
.submit-button {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
