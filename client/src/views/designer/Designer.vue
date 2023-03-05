<template>
  <skeleton ref="skeletonRef">
    <template #mainLeft>
      <test></test>
    </template>
    <template #mainCenter></template>
    <template #mainRight>
      <div class="close" @click="skeletonRef.closeMainRight">close</div>
    </template>
  </skeleton>
</template>

<script setup lang="ts">
import Test from './Test.vue'
const skeletonRef = ref()
</script>

<style scoped lang="scss">
.close {
  width: 300px;
}
</style>
