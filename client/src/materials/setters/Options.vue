<template>
  <div class="setter-options">
    <VueDraggable class="options" v-model="options" item-key="id" handle=".drag">
      <template #item="{ index }">
        <div class="option">
          <div class="drag">:::</div>
          <div class="label">
            <el-input
              v-model.trim="options[index].label"
              @input="oninputLabel($event, index)"
              placeholder="选项名"
              clearable
            ></el-input>
          </div>
          <div class="value">
            <el-input
              v-model.trim="options[index].value"
              @input="oninputValue($event, index)"
              placeholder="选项值"
              clearable
            ></el-input>
          </div>
          <div class="remove" :class="{ empty: options.length < 2 }">
            <el-icon @click="remove(index)"><Remove /></el-icon>
          </div>
        </div>
      </template>
    </VueDraggable>
    <div class="actions">
      <div class="add" @click="add">
        <el-icon><CirclePlus /></el-icon>
        <div class="text">添加选项</div>
      </div>
      <div class="edit" @click="edit">批量编辑</div>
    </div>
    <el-dialog
      v-model="showOptionsDialog"
      title="编辑选项"
      width="730px"
      class="options-dialog"
      :close-on-click-modal="false"
    >
      <div class="content">
        <el-scrollbar class="tem-options">
          <dict-options v-model="temOptions"></dict-options>
        </el-scrollbar>
        <div class="dict-list">
          <div class="header">
            <div class="title">选项字典</div>
            <el-icon @click="addDict"><plus></plus></el-icon>
          </div>
          <el-scrollbar class="list">
            <div
              class="dict"
              v-for="(dict, index) in dictList"
              :key="dict.code"
              @mouseenter="hoverDictCode = dict.code"
              @mouseleave="hoverDictCode = ''"
              @click.self="selectDict(dict.options)"
            >
              <div class="name">{{ dict.name }}</div>
              <div class="option" v-for="option in dict.options.slice(0, 2)" :key="option.id">
                {{ option.label || option.value }}
              </div>
              <div class="more-options option" v-show="dict.options.length > 2">...</div>
              <el-dropdown
                trigger="click"
                class="actions-dropdown"
                :class="{ hidden: hoverDictCode !== dict.code }"
              >
                <div class="actions">
                  <el-icon :size="14"><MoreFilled /></el-icon>
                </div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="editDict(dict, index)">
                      {{ userStore.id === dict.userId ? '编辑' : '详情' }}
                    </el-dropdown-item>
                    <el-dropdown-item
                      @click="removeDict(dict.code, index)"
                      v-if="userStore.id === dict.userId"
                    >
                      删除
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </el-scrollbar>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showOptionsDialog = false">取消</el-button>
          <el-button @click="confirm" type="primary">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <EditDictDialog
      v-model="newDict"
      v-model:showDialog="showDictDialog"
      :title="dialogTitle"
      :editable="editable"
      @save="onSave"
      @close="showOptionsDialog = true"
    />
  </div>
</template>

<script setup lang="ts">
import { reqRemoveDict, reqSaveDict } from '@/api'
import { useHomeStore, useUserStore } from '@/stores'
import type { DictData, SelectOption } from '@/types'
import { deepClone, uuid } from '@/utils'
import { ElMessage, ElMessageBox } from 'element-plus'
import VueDraggable from 'vuedraggable'

const props = defineProps({
  modelValue: {
    type: Array as PropType<SelectOption[]>,
    default: new Array()
  }
})

const emit = defineEmits(['update:modelValue'])

const userStore = useUserStore()
const homeStore = useHomeStore()
const showOptionsDialog = ref(false)
const hoverDictCode = ref('')
const dialogTitle = ref('')
const newDict = ref({
  code: '',
  name: '',
  options: [] as SelectOption[]
})
const showDictDialog = ref(false)
const editable = ref(false)
const editingId = ref(-1)

const options = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', newValue)
})
const temOptions = ref<SelectOption[]>([])

const dictList = computed<DictData[]>(() => {
  return homeStore.dictList.map((dict) => {
    return {
      ...dict,
      options: JSON.parse(dict.options)
    }
  })
})

const oninputLabel = (label: string, index: number) => {
  const newOptions = options.value
  newOptions[index].label = label
  options.value = newOptions
}
const oninputValue = (value: string, index: number) => {
  const newOptions = options.value
  newOptions[index].value = value
  options.value = newOptions
}

// 新增一个选项
const add = () => {
  options.value.push({ value: '', id: uuid() })
}

// 移除一个选项
const remove = (index: number) => {
  options.value.splice(index, 1)
}

// 批量编辑
const edit = () => {
  temOptions.value = deepClone(options.value)
  showOptionsDialog.value = true
}

const addDict = () => {
  dialogTitle.value = '新增字典'
  newDict.value = {
    code: uuid(),
    name: '',
    options: []
  }
  showDictDialog.value = true
  editable.value = true
  editingId.value = -1
  showOptionsDialog.value = false
}

const selectDict = (options: SelectOption[]) => {
  ElMessageBox.confirm('确定使用此选项字典吗？将覆盖已输入的选项内容。', '提示', {
    type: 'warning'
  })
    .then(() => {
      temOptions.value = deepClone(options)
    })
    .catch(() => {})
}

// 批量修改确定
const confirm = () => {
  options.value = temOptions.value
  showOptionsDialog.value = false
}

const editDict = (dictData: DictData, index: number) => {
  newDict.value = { code: dictData.code, name: dictData.name, options: dictData.options }
  editable.value = userStore.id === dictData.userId
  dialogTitle.value = userStore.id !== dictData.userId ? '字典详情' : '编辑字典'
  showDictDialog.value = true
  editingId.value = index
  showOptionsDialog.value = false
}

const removeDict = (code: string, index: number) => {
  ElMessageBox.confirm('确认要删除吗？', '提示', { type: 'warning' })
    .then(() => {
      reqRemoveDict(code).then((result) => {
        ElMessage({
          type: result.type,
          message: result.message
        })
        if (result.success) {
          homeStore.dictList.splice(index, 1)
        }
      })
    })
    .catch(() => {})
}

const onSave = (newValue: typeof newDict.value) => {
  const newDictInfo = {
    userId: userStore.id,
    name: newValue.name,
    code: newValue.code,
    options: JSON.stringify(newValue.options)
  }
  reqSaveDict(newDictInfo).then((result) => {
    ElMessage({
      type: result.type,
      message: result.message
    })
    if (result.success) {
      if (editingId.value === -1) {
        homeStore.dictList.push(newDictInfo)
      } else {
        homeStore.dictList[editingId.value] = newDictInfo
      }
      showDictDialog.value = false
    }
  })
}
</script>

<style scoped lang="scss">
.setter-options {
  .options {
    .option {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .drag {
        padding-left: 6px;
        font-size: large;
        transform: rotate(90deg);
        user-select: none;
        cursor: move;
      }
      .label,
      .value {
        width: 110px;
      }

      .remove {
        cursor: pointer;
        color: var(--color-danger);
        &.empty {
          opacity: 0;
          pointer-events: none;
        }
      }
      & + .option {
        margin-top: 4px;
      }
    }
  }
  .actions {
    display: flex;
    margin-left: 12px;
    margin-top: 8px;
    .add {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      color: var(--color-primary);
      .el-icon {
        margin-right: 6px;
      }
      .text {
        font-size: smaller;
      }
    }
    .edit {
      cursor: pointer;
      margin-left: 30px;
      font-size: smaller;
      color: var(--color-primary);
    }
  }
  :deep(.el-dialog.options-dialog) {
    .el-dialog__body {
      padding: 10px 20px 20px;
    }
    .content {
      border: 1px solid var(--color-border);
      border-radius: 6px;
      display: flex;
      height: 50vh;
      .tem-options {
        padding: 10px 5px;
        padding-right: 10px;
        height: 100%;
        width: 560px;
        border-right: 1px solid var(--color-border);
      }
      .dict-list {
        width: calc(100% - 560px);
        .header {
          padding: 10px 16px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          border-bottom: 1px solid var(--color-border);
          .title {
            font-weight: bolder;
          }
          .el-icon {
            color: var(--color-primary);
            cursor: pointer;
          }
        }
        .list {
          padding: 10px;
          height: calc(100% - 43px);
          .dict {
            background-color: var(--color-background-blue);
            margin-bottom: 8px;
            padding: 8px;
            height: 100px;
            border-radius: 4px;
            cursor: pointer;
            position: relative;
            &:hover {
              background-color: var(--color-background-soft);
            }
            .name,
            .option {
              pointer-events: none;
            }
            .option {
              padding-left: 5px;
              color: var(--color-text-2);
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: smaller;
            }
            .actions-dropdown {
              position: absolute;
              top: 0;
              right: 8px;
              &.hidden {
                opacity: 0;
                pointer-events: none;
              }
              .actions {
                height: 24px;
                width: 24px;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: var(--color-background);
                border-radius: 4px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
