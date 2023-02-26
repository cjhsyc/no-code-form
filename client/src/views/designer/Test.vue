<template><div class="close" @click="closeMainLeft">close</div></template>

<script setup lang="ts">
const closeMainLeft = inject<CloseMainLeft>('closeMainLeft')
</script>

<style scoped></style>
