<template>
  <div class="component-props">
    <div class="prop">
      <div class="label">表单项标签的位置</div>
      <div class="setter"></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.component-props {
  width: 300px;
  padding: 0 10px;
  .prop {
    & + .prop {
      margin-top: 8px;
    }
    .label {
      font-size: 14px;
    }
  }
}
</style>
