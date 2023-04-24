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
      <el-card class="form-card flex-box" shadow="hover">
        <div class="card-header">
          <div class="icon">
            <el-icon :size="18"><list /></el-icon>
          </div>
          <div class="title">表单</div>
        </div>
        <div class="content"></div>
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
        <div class="template empty">
          <div class="title">空白表单</div>
          <div class="content">
            <div class="add-form flex-box" @click="addForm">
              <el-icon :size="30"><plus /></el-icon>
            </div>
          </div>
        </div>
        <div class="template mine">
          <div class="title">我的模板</div>
          <div class="content"></div>
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
const router = useRouter()

const showAddFormDialog = ref(false)
const searchValue = ref('')

const openAddFormDialog = () => {
  showAddFormDialog.value = true
}
const closeAddFormDialog = () => {
  showAddFormDialog.value = false
}

const addForm = () => {
  router.push('/designer')
}
</script>

<style scoped lang="scss">
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
    .flex-box {
      margin: 10px;
      height: 160px;
      width: 160px;
    }
    .form-card {
      &:deep(.el-card__body) {
        padding: 12px;
      }
      .card-header {
        display: flex;
        align-items: center;
        margin-bottom: 6px;
        .icon {
          height: 26px;
          padding-right: 6px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--color-deep);
        }
        .title {
          line-height: 26px;
        }
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
      .template {
        .title {
          padding: 10px;
          font-weight: bolder;
        }
        .content {
          min-height: 160px;
          padding: 0 10px;
        }
        &.empty {
          .flex-box {
            height: 160px;
            width: 160px;
          }
          .add-form {
            border-radius: 6px;
            border: 2px dashed var(--color-border);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: var(--color-text-2);
            &:hover {
              border-color: var(--color-border-hover);
            }
          }
        }
      }
    }
  }
}
</style>
