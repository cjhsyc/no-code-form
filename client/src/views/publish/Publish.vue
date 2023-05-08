<template>
  <div></div>
</template>

<script setup lang="ts">
const route = useRoute()

onBeforeMount(() => {
  console.log(route.params.code)
})
</script>

<style scoped></style>
