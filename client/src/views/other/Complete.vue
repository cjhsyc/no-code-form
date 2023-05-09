<template>
  <el-result icon="success" title="提交成功">
    <template #extra>
      <el-button type="primary" @click="again">再填一份</el-button>
    </template>
  </el-result>
</template>

<script setup lang="ts">
const router = useRouter()

const again = () => {
  router.go(-1)
}
</script>

<style scoped></style>
