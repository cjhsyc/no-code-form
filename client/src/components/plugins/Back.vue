<template>
  <el-page-header @back="goBack">
    <template #content>
      <span class="title"> {{ title }} </span>
    </template>
  </el-page-header>
</template>

<script setup lang="ts">
const props = defineProps({
  path: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  }
})

const router = useRouter()

const goBack = () => {
  router.go(-1)
}
</script>

<style scoped lang="scss">
.title {
  font-size: 16px;
  font-weight: bolder;
  width: 160px;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-top: 3px;
}
</style>
