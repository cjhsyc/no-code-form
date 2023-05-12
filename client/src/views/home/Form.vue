<template>
  <div class="form-manage">
    <div class="header">
      <div class="add-from">
        <el-button icon="plus" type="primary" @click="openAddFormDialog">新建</el-button>
      </div>
      <div class="toolbar">
        <div class="total">共 {{ formDataList.length }} 项</div>
      </div>
    </div>
    <div class="forms">
      <el-card
        v-for="(form, index) in filteredFormDataList"
        :key="form.code"
        class="form-card"
        shadow="hover"
        @mouseenter="hoverFormCode = form.code"
        @mouseleave="hoverFormCode = ''"
      >
        <div class="preview">
          <form-render
            v-bind="{ ...form.renderData }"
            port="pc"
            containerWidth="430px"
            type="thumbnail"
          ></form-render>
        </div>
        <div class="card-content">
          <div class="card-header">
            <div class="title">
              <div class="name" :title="designerStore.getFormName(form.renderData.componentList)">
                {{ designerStore.getFormName(form.renderData.componentList) }}
              </div>
              <el-badge
                :value="form.publish ? '已上线' : '未发布'"
                :type="form.publish ? 'success' : 'danger'"
              ></el-badge>
            </div>
            <el-button
              :class="{ hidden: form.code !== hoverFormCode }"
              size="small"
              type="primary"
              text
              @click="editForm(form.code)"
            >
              编辑
            </el-button>
          </div>
          <div class="footer">
            <div class="save-time">{{ getDateAgo(new Date(form.saveTime)) }} 保存</div>
            <el-dropdown>
              <div class="actions">
                <el-icon :size="14"><MoreFilled /></el-icon>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item icon="View" @click="preview(form.renderData)">
                    预览
                  </el-dropdown-item>
                  <el-dropdown-item icon="CopyDocument" @click="copyForm(form)">
                    复制
                  </el-dropdown-item>
                  <el-dropdown-item
                    :icon="form.publish ? 'CircleCloseFilled' : 'UploadFilled'"
                    @click="changePublish(form.code, !form.publish, index)"
                  >
                    {{ form.publish ? '下线' : '发布' }}
                  </el-dropdown-item>
                  <el-dropdown-item icon="Share" @click="shareForm(form.code)" v-if="form.publish">
                    分享
                  </el-dropdown-item>
                  <el-dropdown-item
                    icon="DocumentAdd"
                    @click="saveAsTemplate(JSON.stringify(form.renderData))"
                  >
                    保存为模板
                  </el-dropdown-item>
                  <el-dropdown-item icon="delete" @click="removeForm(form.code, index)">
                    删除
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </el-card>
      <el-empty
        v-if="!formDataList.length"
        description="暂无表单"
        :style="{ width: '100%' }"
      ></el-empty>
    </div>
    <el-dialog
      v-model="showAddFormDialog"
      width="970px"
      top="5vh"
      :show-close="false"
      class="add-form-dialog"
    >
      <template #header="{ titleClass }">
        <div class="dialog-header">
          <div class="title" :class="titleClass">新建表单</div>
          <el-input
            v-model.trim="searchValue"
            placeholder="搜索模板"
            prefix-icon="Search"
            clearable
          />
          <div class="close-dialog" @click="closeAddFormDialog">
            <el-icon><close /></el-icon>
          </div>
        </div>
      </template>
      <div class="dialog-content">
        <div class="template mine">
          <div class="title">我的模板</div>
          <div class="content">
            <el-card class="template-card empty" shadow="never" @click="addForm">
              <el-icon :size="50"><plus /></el-icon>
              <div class="text">新建空白表单</div>
            </el-card>
            <el-card
              v-for="template in filteredTemplateList"
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
                <div
                  v-show="hoverTemplateCode !== template.code"
                  class="name"
                  :title="designerStore.getFormName(template.renderData.componentList)"
                >
                  {{ designerStore.getFormName(template.renderData.componentList) }}
                </div>
                <div class="actions" v-show="hoverTemplateCode === template.code">
                  <el-button @click="preview(template.renderData)">预览</el-button>
                  <el-button type="primary" @click="createForm(template.code)">使用</el-button>
                </div>
              </div>
            </el-card>
          </div>
        </div>
        <div class="template recommend">
          <div class="title">推荐模板</div>
          <div class="content">
            <el-card
              v-for="template in filteredShareTemplateList"
              :key="template.code"
              class="template-card"
              shadow="hover"
              @mouseenter="hoverShareTemplateCode = template.code"
              @mouseleave="hoverShareTemplateCode = ''"
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
                <div
                  v-show="hoverShareTemplateCode !== template.code"
                  class="name"
                  :title="designerStore.getFormName(template.renderData.componentList)"
                >
                  {{ designerStore.getFormName(template.renderData.componentList) }}
                </div>
                <div class="actions" v-show="hoverShareTemplateCode === template.code">
                  <el-button @click="preview(template.renderData)">预览</el-button>
                  <el-button type="primary" @click="createForm(template.code)">使用</el-button>
                </div>
              </div>
            </el-card>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      v-model="showShareDialog"
      width="600px"
      top="30vh"
      title="分享链接"
      class="share-dialog"
    >
      <div class="link">
        <el-input :modelValue="shareAddress" readonly></el-input>
        <el-button type="primary" @click="copyLink">复制链接</el-button>
      </div>
    </el-dialog>
    <preview-drawer v-model="showPreview" :renderData="previewRenderData"></preview-drawer>
  </div>
</template>

<script setup lang="ts">
import {
  reqGetForms,
  reqGetShareTemplates,
  reqGetTemplates,
  reqPublishForm,
  reqRemoveForm,
  reqSaveForm,
  reqSaveTemplate
} from '@/api'
import { useDesignerStore, useHomeStore, useUserStore } from '@/stores'
import type { FormData, FormInfo, TemplateData, TemplateInfo } from '@/types'
import { getDateAgo, uuid } from '@/utils'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()
const designerStore = useDesignerStore()
const homeStore = useHomeStore()

const hoverFormCode = ref('')
const hoverTemplateCode = ref('')
const hoverShareTemplateCode = ref('')
const showAddFormDialog = ref(false)
const showShareDialog = ref(false)
const showPreview = ref(false)
const previewRenderData = ref<FormData['renderData']>()
const searchValue = ref('')
const shareAddress = ref('')
const formList = ref<FormInfo[]>([])
const formDataList = computed<FormData[]>(() => {
  return formList.value.map((form) => {
    return {
      ...form,
      renderData: JSON.parse(form.renderData)
    }
  })
})
const filteredFormDataList = computed(() => {
  return formDataList.value.filter((form) => {
    return designerStore.getFormName(form.renderData.componentList).indexOf(homeStore.search) >= 0
  })
})

const templateList = ref<TemplateData[]>([])
const filteredTemplateList = computed<TemplateData[]>(() => {
  return templateList.value.filter((template) => {
    return (
      designerStore.getFormName(template.renderData.componentList).indexOf(searchValue.value) >= 0
    )
  })
})
const shareTemplateList = ref<TemplateData[]>([])
const filteredShareTemplateList = computed<TemplateData[]>(() => {
  return shareTemplateList.value.filter((template) => {
    return (
      designerStore.getFormName(template.renderData.componentList).indexOf(searchValue.value) >= 0
    )
  })
})
const openAddFormDialog = () => {
  reqGetTemplates(userStore.id).then((result) => {
    templateList.value = result.data.map((template: TemplateInfo) => {
      return {
        ...template,
        renderData: JSON.parse(template.renderData)
      }
    })
  })
  reqGetShareTemplates().then((result) => {
    shareTemplateList.value = result.data.map((template: TemplateInfo) => {
      return {
        ...template,
        renderData: JSON.parse(template.renderData)
      }
    })
  })
  showAddFormDialog.value = true
}
const closeAddFormDialog = () => {
  showAddFormDialog.value = false
}

// 新增表单，进入表单设计器
const addForm = () => {
  router.push({ name: 'designer', params: { code: uuid() } })
}

// 编辑表单，进入表单设计器
const editForm = (code: string) => {
  router.push({ name: 'designer', params: { code } })
}

// 预览表单
const preview = (renderData: FormData['renderData']) => {
  previewRenderData.value = renderData
  showPreview.value = true
}

const saveAsTemplate = (renderData: string) => {
  reqSaveTemplate({
    userId: userStore.id,
    code: uuid(),
    renderData: renderData,
    share: false,
    saveTime: new Date().toLocaleString()
  }).then((result) => {
    ElMessage({
      type: result.type,
      message: result.message
    })
  })
}

// 分享已发布的表单
const shareForm = (code: string) => {
  shareAddress.value = `http://127.0.0.1:5173/publish/${code}`
  showShareDialog.value = true
}

// 复制表单
const copyForm = (form: FormData) => {
  const newForm: FormInfo = {
    userId: form.userId,
    code: uuid(),
    renderData: JSON.stringify(form.renderData),
    saveTime: new Date().toLocaleString(),
    publish: false
  }
  reqSaveForm(newForm).then((result) => {
    ElMessage({
      type: result.type,
      message: result.message.replace('保存', '复制')
    })
    if (result.success) {
      formList.value.push(newForm)
    }
  })
}

// 删除表单
const removeForm = (code: string, index: number) => {
  ElMessageBox.confirm('确认要删除吗？', '提示', { type: 'warning' })
    .then(() => {
      reqRemoveForm(code).then((result) => {
        ElMessage({
          type: result.type,
          message: result.message
        })
        if (result.success) {
          formList.value.splice(index, 1)
        }
      })
    })
    .catch(() => {})
}

// 发布或下线表单
const changePublish = (code: string, publish: boolean, index: number) => {
  reqPublishForm(code, publish).then((result) => {
    ElMessage({
      type: result.type,
      message: result.message
    })
    if (result.success) {
      formList.value[index].publish = publish
    }
  })
}

// 复制链接
const copyLink = () => {
  navigator.clipboard
    .writeText(shareAddress.value)
    .then(() => {
      ElMessage({
        type: 'success',
        message: '复制成功'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'error',
        message: '复制失败'
      })
    })
}

const createForm = (code: string) => {
  router.push({ name: 'designer', params: { code: uuid(), templateCode: code } })
}

// 获取我的表单列表
onBeforeMount(() => {
  reqGetForms(userStore.id).then((result) => {
    formList.value = result.data
  })
})
</script>

<style scoped lang="scss">
@use '@/styles/mixin.scss' as *;

.form-manage {
  height: calc(100% - 66px);
  .header {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .toolbar {
      .total {
        color: var(--color-text-gray);
      }
    }
  }
  .forms {
    display: flex;
    margin: -10px;
    flex-wrap: wrap;
    max-height: calc(100% - 48px);
    overflow: auto;
    @include scrollbar();
    .form-card {
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
  :deep(.el-dialog.add-form-dialog) {
    .el-dialog__header,
    .el-dialog__body {
      margin: 0;
      padding: 0;
    }
    .dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      border-bottom: 1px solid var(--color-border);
      .title {
        width: 120px;
      }
      .el-input {
        width: 400px;
      }
      .close-dialog {
        height: 20px;
        width: 20px;
        cursor: pointer;
        &:hover {
          color: var(--color-primary);
        }
      }
    }
    .dialog-content {
      height: 75vh;
      padding: 10px;
      overflow: auto;
      @include scrollbar();
      .template {
        .title {
          padding: 10px;
          font-weight: bolder;
        }
        .content {
          min-height: 160px;
          padding: 0 10px;
          margin: -10px;
          display: flex;
          flex-wrap: wrap;
          .template-card {
            margin: 10px;
            height: 275px;
            width: 215px;
            .el-card__body {
              padding: 0;
            }
            &.empty {
              cursor: pointer;
              .el-card__body {
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                .el-icon {
                  color: var(--color-primary);
                  padding-bottom: 20px;
                }
                .text {
                  font-weight: bolder;
                  color: var(--color-text-2);
                }
              }
            }
            &:hover {
              transform: translateY(-4px);
            }
            .preview {
              height: 220px;
              overflow: hidden;
              pointer-events: none;
              user-select: none;
              background-color: var(--color-background-blue);
              .render-form {
                transform: scale(0.5);
                transform-origin: left top;
              }
            }
            .card-content {
              padding: 10px;
              .name {
                font-size: larger;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .actions {
                .el-button {
                  width: 90px;
                }
              }
            }
          }
        }
      }
    }
  }
  :deep(.share-dialog) {
    .link {
      display: flex;
      .el-button {
        margin-left: 10px;
      }
    }
  }
}
</style>
