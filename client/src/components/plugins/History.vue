<template>
  <div class="history">
    <el-button
      round
      plain
      @click="designerStore.lastHistory()"
      :disabled="designerStore.oldestHistory"
      icon="Back"
    >
      后退
    </el-button>
    <el-button
      round
      plain
      @click="designerStore.nextHistory()"
      :disabled="designerStore.latestHistory"
    >
      前进<el-icon :size="16" class="el-icon--right"><Right /></el-icon>
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { useDesignerStore } from '@/stores'

const designerStore = useDesignerStore()
</script>

<style scoped></style>
