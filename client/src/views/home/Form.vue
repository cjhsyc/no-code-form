<template>
  <div class="form-manage">
    <div class="header">
      <div class="add-from">
        <el-button icon="plus" type="primary" @click="openAddFormDialog">新建</el-button>
      </div>
      <div class="toolbar">
        <div class="total">共 2 项</div>
      </div>
    </div>
    <div class="forms">
      <el-card v-for="form in formList" :key="form.code" class="form-card" shadow="hover">
        <div class="card-header"></div>
        <div class="content">{{ form.saveTime }}</div>
        <div class="footer"></div>
      </el-card>
    </div>
    <el-dialog v-model="showAddFormDialog" width="80%" top="5vh" :show-close="false">
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
              <div class="text">从空白模板创建</div>
            </el-card>
            <el-card class="template-card" shadow="hover">
              <div class="card-header"></div>
              <div class="content"></div>
              <div class="footer"></div>
            </el-card>
          </div>
        </div>
        <div class="template recommend">
          <div class="title">推荐模板</div>
          <div class="content"></div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { uuid } from '@/utils'
import { reqGetForms } from '@/api'
import { useUserStore } from '@/stores'
import type { FormInfo } from '@/types'

const router = useRouter()
const userStore = useUserStore()

const showAddFormDialog = ref(false)
const searchValue = ref('')
const formList = ref<FormInfo[]>([])

const openAddFormDialog = () => {
  showAddFormDialog.value = true
}
const closeAddFormDialog = () => {
  showAddFormDialog.value = false
}

const addForm = () => {
  router.push({ name: 'designer', params: { code: uuid() } })
}

onBeforeMount(() => {
  console.log(userStore.id)
  reqGetForms(userStore.id).then((result) => {
    formList.value = result.data
  })
})
</script>

<style scoped lang="scss">
@use '@/styles/mixin.scss' as *;

.form-manage {
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
    .form-card {
      margin: 10px;
      height: 275px;
      width: 215px;
      cursor: pointer;
      &:deep(.el-card__body) {
        padding: 12px;
      }
    }
  }
  :deep(.el-dialog) {
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
          .template-card {
            margin: 10px;
            height: 275px;
            width: 215px;
            &:hover {
              transform: translateY(-4px);
            }
            .el-card__body {
              padding: 12px;
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
          }
        }
      }
    }
  }
}
</style>
