<template>
  <div class="dict-manage">
    <div class="header">
      <div class="add-dict">
        <el-button icon="plus" type="primary" @click="addDict">新建</el-button>
      </div>
      <div class="toolbar"></div>
    </div>
    <div class="content">
      <el-table
        class="dict-table"
        :data="dictList"
        height="100%"
        size="large"
        @cell-mouse-enter="onMouseenter"
        @cell-mouse-leave="onMouseleave"
      >
        <el-table-column prop="name" label="字典名称" width="140" />
        <el-table-column
          label="所属"
          width="140"
          :filters="[
            { text: '系统', value: 'admin' },
            { text: '我的', value: 'mine' }
          ]"
          :filter-method="filterHandler"
        >
          <template #default="{ row }">
            {{ row.userId === 3 ? '系统' : userStore.username }}
          </template>
        </el-table-column>
        <el-table-column className="options-col" label="选项">
          <template #default="{ row }">
            <el-tag
              v-for="option in row.options.slice(0, 3)"
              :key="(option as SelectOption).value"
              size="large"
            >
              {{ (option as SelectOption).label || (option as SelectOption).value }}
            </el-tag>
            <el-tag
              v-show="row.options.length - 3 > 0"
              size="large"
              :style="{ backgroundColor: 'unset' }"
            >
              +{{ row.options.length - 3 }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column width="180">
          <template #default="{ row, $index }">
            <div v-show="row.code === hoverRowCode">
              <el-button @click="editDict(row, $index)">
                {{ userStore.id !== row.userId ? '详情' : '编辑' }}
              </el-button>
              <el-button
                v-show="userStore.id === row.userId"
                type="danger"
                @click="removeDict(row.code, $index)"
              >
                删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <EditDictDialog
      v-model="newDict"
      v-model:showDialog="showDialog"
      :title="dialogTitle"
      :editable="editable"
      @save="onSave"
    />
  </div>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore, useHomeStore } from '@/stores'
import type { SelectOption, DictData } from '@/types'
import { reqGetDicts, reqSaveDict, reqRemoveDict } from '@/api'
import { uuid } from '@/utils'

const userStore = useUserStore()
const homeStore = useHomeStore()
const dictList = computed<DictData[]>(() => {
  return homeStore.dictList.map((dict) => {
    return { ...dict, options: JSON.parse(dict.options) }
  })
})

const hoverRowCode = ref('')
const showDialog = ref(false)
const dialogTitle = ref('新增字典')
const editable = ref(true)
const editingId = ref(-1)
const newDict = ref({
  code: '',
  name: '',
  options: [] as SelectOption[]
})

const filterHandler = (value: string, row: DictData) => {
  if (value === 'admin') {
    return row.userId === 3
  } else {
    return row.userId !== 3
  }
}

const addDict = () => {
  dialogTitle.value = '新增字典'
  newDict.value = {
    code: uuid(),
    name: '',
    options: []
  }
  showDialog.value = true
  editable.value = true
  editingId.value = -1
}

const editDict = (dictData: DictData, index: number) => {
  newDict.value = { code: dictData.code, name: dictData.name, options: dictData.options }
  editable.value = userStore.id === dictData.userId
  dialogTitle.value = userStore.id !== dictData.userId ? '字典详情' : '编辑字典'
  showDialog.value = true
  editingId.value = index
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

const onMouseenter = (row: DictData) => {
  hoverRowCode.value = row.code
}
const onMouseleave = () => {
  hoverRowCode.value = ''
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
      showDialog.value = false
    }
  })
}

onBeforeMount(() => {
  reqGetDicts(userStore.id).then((result) => {
    homeStore.dictList = result.data
  })
})
</script>

<style scoped lang="scss">
.dict-manage {
  height: calc(100% - 66px);
  .header {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .content {
    height: calc(100% - 48px);
    .dict-table {
      :deep(.options-col) {
        .cell {
          .el-tag + .el-tag {
            margin-left: 10px;
          }
        }
      }
    }
  }
}
</style>
