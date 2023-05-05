<template>
  <div class="setter-rule">
    <el-input :modelValue="ruleName" v-bind="$attrs" readonly>
      <template #append>
        <el-button @click="editRule">编辑规则</el-button>
      </template>
    </el-input>
    <el-dialog
      v-model="showDialog"
      title="编辑规则"
      width="800px"
      :close-on-click-modal="false"
      top="10vh"
    >
      <div class="content">
        <el-form
          :model="newRule"
          label-position="top"
          :rules="rules"
          require-asterisk-position="right"
          ref="formRef"
          class="rule-form"
        >
          <el-form-item prop="name" label="规则名称">
            <el-input v-model="newRule.name"></el-input>
          </el-form-item>
          <el-form-item prop="rule" label="校验规则">
            <el-input v-model="newRule.rule" type="textarea" :rows="3" resize="none"></el-input>
          </el-form-item>
          <el-form-item prop="message" label="校验错误提示信息">
            <el-input
              v-model="newRule.message"
              type="textarea"
              :rows="3"
              resize="none"
              placeholder="不填则自动生成（请输入正确的{规则名称}）"
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
        <div class="rule-list">
          <div class="header">
            <div class="title">规则模板</div>
            <el-input v-model="searchStr" placeholder="搜索规则名称" clearable></el-input>
          </div>
          <el-scrollbar class="list">
            <div class="rule" v-for="rule in ruleList" :key="rule.code" @click="selectRule(rule)">
              {{ rule.name }}
            </div>
          </el-scrollbar>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showDialog = false">取消</el-button>
          <el-button type="primary" @click="onSave">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { useHomeStore } from '@/stores'
import type { Rule, RuleData } from '@/types'
import type { FormRules } from 'element-plus'
import { ElMessageBox } from 'element-plus'
import { stringToRegExp } from '@/utils'

const props = defineProps({
  modelValue: {
    type: Object as PropType<Rule>,
    default: null
  }
})

const emit = defineEmits(['update:modelValue'])

const homeStore = useHomeStore()
const formRef = ref()
const ruleName = computed(() => props.modelValue?.name)
const showDialog = ref(false)
const newRule = ref({
  name: '',
  rule: '',
  message: ''
})
const testText = ref('')
const testResult = computed(
  () => newRule.value.rule && stringToRegExp(newRule.value.rule).test(testText.value)
)
const rules = ref<FormRules>({
  name: [{ required: true, message: '请输入规则名称', trigger: 'change' }],
  rule: [{ required: true, message: '请输入校验规则', trigger: 'change' }]
})
const searchStr = ref('')

// 搜索过滤后的规则列表
const ruleList = computed(() =>
  homeStore.ruleList.filter((rule) => rule.name.indexOf(searchStr.value) >= 0)
)

const editRule = () => {
  newRule.value = props.modelValue
    ? { ...props.modelValue }
    : {
        name: '',
        rule: '',
        message: ''
      }
  showDialog.value = true
  formRef.value?.resetFields()
  testText.value = ''
}

const selectRule = (ruleData: RuleData) => {
  ElMessageBox.confirm('确定使用此校验规则吗？将覆盖已输入的规则内容。', '提示', {
    type: 'warning'
  })
    .then(() => {
      newRule.value = { name: ruleData.name, rule: ruleData.rule, message: ruleData.message }
    })
    .catch(() => {})
}

const onSave = () => {
  formRef.value
    .validate()
    .then(() => {
      emit('update:modelValue', { ...newRule.value })
      showDialog.value = false
    })
    .catch(() => {})
}
</script>

<style scoped lang="scss">
.setter-rule {
  :deep(.el-dialog__body) {
    padding: 10px 20px;
  }
  .content {
    display: flex;
    justify-content: space-between;
    .rule-form {
      width: 500px;
    }
    .rule-list {
      border: 1px solid var(--color-border);
      border-radius: 6px;
      padding: 10px;
      width: calc(100% - 510px);
      .header {
        .title {
          font-size: 18px;
          font-weight: bolder;
          padding-bottom: 5px;
        }
        padding-bottom: 5px;
      }
      .list {
        height: 430px;
        .rule {
          height: 32px;
          line-height: 32px;
          cursor: pointer;
          border-radius: 6px;
          padding-left: 10px;
          &:hover {
            background-color: var(--color-background-soft);
          }
        }
      }
    }
  }
}
</style>
