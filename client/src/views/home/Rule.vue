<template>
  <div class="rule-mange">
    <div class="header">
      <div class="add-dict">
        <el-button icon="plus" type="primary" @click="addRule">新建</el-button>
      </div>
      <div class="toolbar"></div>
    </div>
    <div class="content">
      <el-table
        class="rule-table"
        :data="filteredRuleList"
        height="100%"
        size="large"
        @cell-mouse-enter="onMouseenter"
        @cell-mouse-leave="onMouseleave"
      >
        <el-table-column prop="name" label="规则名称" width="180" />
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
            <div :style="{ lineHeight: '32px' }">
              {{ row.userId === 3 ? '系统' : userStore.username }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="校验规则">
          <template #default="{ row }">
            {{ row.rule }}
          </template>
        </el-table-column>
        <el-table-column label="校验错误提示信息">
          <template #default="{ row }">
            {{ row.message || `请输入正确的${row.name}` }}
          </template>
        </el-table-column>
        <el-table-column width="180">
          <template #default="{ row, $index }">
            <div v-show="row.code === hoverRowCode">
              <el-button @click="editRule(row, $index)">
                {{ userStore.id !== row.userId ? '详情' : '编辑' }}
              </el-button>
              <el-button
                v-show="userStore.id === row.userId"
                type="danger"
                @click="removeRule(row.code, $index)"
              >
                删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      v-model="showDialog"
      :title="title"
      width="800px"
      :close-on-click-modal="false"
      top="10vh"
    >
      <el-form
        :model="newRule"
        label-position="top"
        :rules="rules"
        require-asterisk-position="right"
        ref="formRef"
      >
        <el-form-item prop="name" label="规则名称">
          <el-input v-model="newRule.name" :readonly="!editable"></el-input>
        </el-form-item>
        <el-form-item prop="rule" label="校验规则">
          <el-input
            v-model="newRule.rule"
            type="textarea"
            :rows="3"
            resize="none"
            :readonly="!editable"
          ></el-input>
        </el-form-item>
        <el-form-item prop="message" label="校验错误提示信息">
          <el-input
            v-model="newRule.message"
            type="textarea"
            :rows="3"
            resize="none"
            placeholder="不填则自动生成（请输入正确的{规则名称}）"
            :readonly="!editable"
          ></el-input>
        </el-form-item>
        <el-form-item label="测试文本">
          <el-input v-model="testText" type="textarea" :rows="3" resize="none"></el-input>
        </el-form-item>
        <el-form-item label="匹配结果">
          <el-tag :type="testResult ? 'success' : 'danger'" size="large">
            {{ testResult ? '匹配成功' : '不匹配' }}
          </el-tag>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showDialog = false">取消</el-button>
          <el-button v-show="editable" type="primary" @click="onSave">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reqGetRules, reqSaveRule, reqRemoveRule } from '@/api'
import { useHomeStore, useUserStore } from '@/stores'
import type { RuleData } from '@/types'
import { uuid } from '@/utils'
import { ElMessage, ElMessageBox, type FormRules } from 'element-plus'
import { stringToRegExp } from '@/utils'

const userStore = useUserStore()
const homeStore = useHomeStore()
const hoverRowCode = ref('')
const showDialog = ref(false)
const title = ref('')
const editable = ref(true)
const formRef = ref()
const editingId = ref(-1)
const testText = ref('')
const testResult = computed(
  () => newRule.value.rule && stringToRegExp(newRule.value.rule).test(testText.value)
)
const filteredRuleList = computed(() => {
  return homeStore.ruleList.filter((rule) => {
    return rule.name.indexOf(homeStore.search) >= 0
  })
})

const newRule = ref({
  code: '',
  name: '',
  rule: '',
  message: ''
})

const rules = ref<FormRules>({
  name: [{ required: true, message: '请输入规则名称', trigger: 'change' }],
  rule: [{ required: true, message: '请输入校验规则', trigger: 'change' }]
})

const onMouseenter = (row: RuleData) => {
  hoverRowCode.value = row.code
}
const onMouseleave = () => {
  hoverRowCode.value = ''
}

const addRule = () => {
  newRule.value = {
    code: uuid(),
    name: '',
    rule: '',
    message: ''
  }
  title.value = '新增规则'
  editable.value = true
  showDialog.value = true
  editingId.value = -1
  testText.value = ''
  formRef.value?.resetFields()
}

const filterHandler = (value: string, row: RuleData) => {
  if (value === 'admin') {
    return row.userId === 3
  } else {
    return row.userId === userStore.id
  }
}

const editRule = (ruleData: RuleData, index: number) => {
  newRule.value = {
    code: ruleData.code,
    name: ruleData.name,
    rule: ruleData.rule,
    message: ruleData.message
  }
  editable.value = userStore.id === ruleData.userId
  title.value = userStore.id !== ruleData.userId ? '规则详情' : '编辑规则'
  showDialog.value = true
  editingId.value = index
  testText.value = ''
}

const removeRule = (code: string, index: number) => {
  ElMessageBox.confirm('确认要删除吗？', '提示', { type: 'warning' })
    .then(() => {
      reqRemoveRule(code).then((result) => {
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

const onSave = () => {
  formRef.value
    .validate()
    .then(() => {
      const rule = {
        ...newRule.value,
        userId: userStore.id
      }
      reqSaveRule(rule).then((result) => {
        ElMessage({
          type: result.type,
          message: result.message
        })
        if (result.success) {
          if (editingId.value === -1) {
            homeStore.ruleList.push(rule)
          } else {
            homeStore.ruleList[editingId.value] = rule
          }
          showDialog.value = false
        }
      })
    })
    .catch(() => {})
}

onBeforeMount(() => {
  reqGetRules(userStore.id).then((result) => {
    homeStore.ruleList = result.data
  })
})
</script>

<style scoped lang="scss">
.rule-mange {
  height: calc(100% - 66px);
  .header {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .content {
    height: calc(100% - 48px);
  }
  :deep(.el-dialog__body) {
    padding: 10px 20px;
  }
}
</style>
