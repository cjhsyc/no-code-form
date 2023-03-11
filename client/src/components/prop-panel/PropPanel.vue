<template>
  <div class="prop-panel">
    <el-tabs v-model="activeName" stretch>
      <el-tab-pane label="组件配置" name="component">
        <ComponentProp />
      </el-tab-pane>
      <el-tab-pane label="表单配置" name="form">
        <FormProp />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
const activeName = ref('component')
</script>

<style scoped></style>
