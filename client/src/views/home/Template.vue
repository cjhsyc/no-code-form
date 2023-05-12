<template>
  <div class="template-manage">
    <el-card
      v-for="(template, index) in filterTemplateDataList"
      :key="template.code"
      class="template-card"
      shadow="hover"
      @mouseenter="hoverTemplateCode = template.code"
      @mouseleave="hoverTemplateCode = ''"
    >
      <div class="preview">
        <form-render
          v-bind="{ ...template.renderData }"
          port="pc"
          containerWidth="430px"
          type="thumbnail"
        ></form-render>
      </div>
      <div class="card-content">
        <div class="card-header">
          <div class="title">
            <div class="name" :title="designerStore.getFormName(template.renderData.componentList)">
              {{ designerStore.getFormName(template.renderData.componentList) }}
            </div>
            <el-badge
              :value="template.share ? '已共享' : '未共享'"
              :type="template.share ? 'success' : 'danger'"
            ></el-badge>
          </div>
          <el-button
            :class="{ hidden: template.code !== hoverTemplateCode }"
            size="small"
            type="primary"
            text
            @click="createForm(template.code)"
          >
            使用
          </el-button>
        </div>
        <div class="footer">
          <div class="save-time">{{ getDateAgo(new Date(template.saveTime)) }} 保存</div>
          <el-dropdown>
            <div class="actions">
              <el-icon :size="14"><MoreFilled /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item icon="View" @click="preview(template.renderData)"
                  >预览</el-dropdown-item
                >
                <el-dropdown-item
                  :icon="template.share ? 'CircleCloseFilled' : 'UploadFilled'"
                  @click="changeShare(template.code, !template.share, index)"
                >
                  {{ template.share ? '取消共享' : '共享' }}
                </el-dropdown-item>
                <el-dropdown-item icon="delete" @click="removeTemplate(template.code, index)">
                  删除
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </el-card>
    <el-empty
      v-if="!templateList.length"
      description="暂无模板"
      :style="{ width: '100%' }"
    ></el-empty>
    <preview-drawer v-model="showPreview" :renderData="previewRenderData"></preview-drawer>
  </div>
</template>

<script setup lang="ts">
import { reqGetTemplates, reqRemoveTemplate, reqShareTemplate } from '@/api'
import { useDesignerStore, useHomeStore, useUserStore } from '@/stores'
import type { TemplateData, TemplateInfo } from '@/types'
import { getDateAgo, uuid } from '@/utils'
import { ElMessage, ElMessageBox } from 'element-plus'

const userStore = useUserStore()
const homeStore = useHomeStore()
const designerStore = useDesignerStore()
const router = useRouter()

const hoverTemplateCode = ref('')
const showPreview = ref(false)
const previewRenderData = ref<TemplateData['renderData']>()
const templateList = ref<TemplateInfo[]>([])
const templateDataList = computed<TemplateData[]>(() => {
  return templateList.value.map((template) => {
    return {
      ...template,
      renderData: JSON.parse(template.renderData)
    }
  })
})
const filterTemplateDataList = computed(() => {
  return templateDataList.value.filter((item) => {
    return designerStore.getFormName(item.renderData.componentList).indexOf(homeStore.search) >= 0
  })
})

const preview = (renderData: TemplateData['renderData']) => {
  previewRenderData.value = renderData
  showPreview.value = true
}

const createForm = (code: string) => {
  router.push({ name: 'designer', params: { code: uuid(), templateCode: code } })
}

const changeShare = (code: string, share: boolean, index: number) => {
  reqShareTemplate(code, share).then((result) => {
    ElMessage({
      type: result.type,
      message: result.message
    })
    if (result.success) {
      templateList.value[index].share = share
    }
  })
}

const removeTemplate = (code: string, index: number) => {
  ElMessageBox.confirm('确认要删除吗？', '提示', { type: 'warning' })
    .then(() => {
      reqRemoveTemplate(code).then((result) => {
        ElMessage({
          type: result.type,
          message: result.message
        })
        if (result.success) {
          templateList.value.splice(index, 1)
        }
      })
    })
    .catch(() => {})
}

// 获取我的表单列表
onBeforeMount(() => {
  reqGetTemplates(userStore.id).then((result) => {
    templateList.value = result.data
  })
})
</script>

<style scoped lang="scss">
@use '@/styles/mixin.scss' as *;

.template-manage {
  display: flex;
  margin: -10px;
  flex-wrap: wrap;
  max-height: calc(100% - 66px);
  overflow: auto;
  @include scrollbar();
  .template-card {
    margin: 10px;
    height: 275px;
    width: 215px;
    &:deep(.el-card__body) {
      padding: 0;
    }
    .preview {
      height: 200px;
      overflow: hidden;
      pointer-events: none;
      user-select: none;
      background-color: var(--color-background-blue);
      :deep(.render-form) {
        transform: scale(0.5);
        transform-origin: left top;
      }
    }
    .card-content {
      padding: 5px 8px;
      height: 70px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title {
          display: flex;
          align-items: center;
          max-width: 150px;
          .name {
            font-size: larger;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .el-button.hidden {
          opacity: 0;
          pointer-events: none;
        }
      }

      .footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .save-time {
          font-size: smaller;
          color: var(--color-text-2);
        }
        .actions {
          height: 20px;
          width: 20px;
          border-radius: 2px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 6px;
          cursor: pointer;
          &:hover {
            background-color: var(--color-background-blue);
          }
          &:focus-visible {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
