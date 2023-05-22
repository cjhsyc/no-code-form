<template>
  <div class="publish">
    <form-render
      v-if="renderData"
      :componentList="renderData?.componentList"
      :formProps="renderData?.formProps"
      :width="renderData?.width"
      :port="port"
      type="publish"
    ></form-render>
  </div>
</template>

<script setup lang="ts">
import { reqGetPublishInfo } from '@/api'
import type { FormData } from '@/types'

const route = useRoute()
const router = useRouter()

const port = ref<'pc' | 'mobile'>('pc')
const renderData = ref<FormData['renderData']>()

onBeforeMount(() => {
  if (window.innerWidth < 600) {
    port.value = 'mobile'
  }
  reqGetPublishInfo(route.params.code as string).then((result) => {
    if (result.success) {
      renderData.value = JSON.parse(result.data.renderData)
    } else {
      router.push({
        name: 'notFound',
        params: { pathMatch: ['publish', route.params.code as string] }
      })
    }
  })
})
</script>

<style scoped lang="scss">
@use '@/styles/mixin.scss' as *;

.publish {
  height: 100vh;
  overflow: auto;
  @include scrollbar();
}
</style>
