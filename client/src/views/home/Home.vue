<template>
  <skeleton ref="skeletonRef" :border="false">
    <template #mainLeft>
      <div class="menu">
        <div class="menu-header">
          <div class="switch-collapse" @click="onClick">
            <el-icon :size="24">
              <component :is="isCollapse ? 'expand' : 'fold'"></component>
            </el-icon>
          </div>
          <Transition name="title">
            <div class="title" v-show="!isCollapse">零代码表单</div>
          </Transition>
        </div>
        <el-menu
          :default-active="homeStore.activeMenu"
          :collapse="isCollapse"
          router
          @select="onSelectMenu"
        >
          <el-menu-item index="form">
            <el-icon><icon-menu /></el-icon>
            <template #title>我的表单</template>
          </el-menu-item>
          <el-menu-item index="template">
            <el-icon><Tickets /></el-icon>
            <template #title>我的模板</template>
          </el-menu-item>
          <el-menu-item index="dict">
            <el-icon><Coin /></el-icon>
            <template #title>字典管理</template>
          </el-menu-item>
          <el-menu-item index="rule">
            <el-icon><setting /></el-icon>
            <template #title>规则管理</template>
          </el-menu-item>
          <el-menu-item index="data">
            <el-icon><DataAnalysis /></el-icon>
            <template #title>数据看板</template>
          </el-menu-item>
        </el-menu>
      </div>
    </template>
    <template #mainCenter>
      <div class="content">
        <div class="content-header">
          <div class="search">
            <el-input
              v-if="homeStore.activeMenu !== 'data'"
              v-model.trim="homeStore.search"
              prefix-icon="Search"
              :placeholder="homeStore.searchPlaceholder"
              clearable
            ></el-input>
            <el-select
              v-else
              v-model="homeStore.search"
              placeholder="请选择表单"
              @change="onChange"
              filterable
            >
              <el-option
                v-for="item in homeStore.submitFormList"
                :key="item.code"
                :value="item.code"
                :label="designerStore.getFormName(item.renderData.componentList)"
              >
                <span style="float: left">
                  {{ designerStore.getFormName(item.renderData.componentList) }}
                </span>
                <span style="float: right; color: var(--el-text-color-secondary); font-size: 13px"
                  >已收集 {{ item.submitCount }} 条</span
                >
              </el-option>
            </el-select>
          </div>
          <div class="avatar">
            <el-dropdown trigger="click" popper-class="avatar-dropdown">
              <el-avatar :src="avatarUrl" fit="cover" />
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item class="username" disabled>
                    用户名：<span>{{ userStore.username }}</span>
                  </el-dropdown-item>
                  <el-dropdown-item divided @click="updatePwd">修改密码</el-dropdown-item>
                  <el-dropdown-item @click="uploadAvatar">上传头像</el-dropdown-item>
                  <el-dropdown-item divided @click="signOut">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
        <RouterView />
        <el-dialog v-model="showAvatarDialog" title="上传头像" width="500px">
          <el-upload
            drag
            :action="getUploadUrl()"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            method="put"
          >
            <el-icon class="el-icon--upload">
              <upload-filled />
            </el-icon>
            <div class="el-upload__text">将文件拖到此处或点击上传</div>
            <template #tip>
              <p class="el-upload__tip">只能上传 {{ uploadTypes.join('、') }} 文件, 且不超过3M</p>
            </template>
          </el-upload>
        </el-dialog>
        <el-dialog v-model="showPwdDialog" title="上传头像" width="500px">
          <el-form
            :model="updatePwdData"
            label-position="top"
            :rules="rules"
            require-asterisk-position="right"
            ref="formRef"
          >
            <el-form-item label="请输入旧密码" prop="oldPassword">
              <el-input v-model="updatePwdData.oldPassword"></el-input>
            </el-form-item>
            <el-form-item label="请输入新密码" prop="password">
              <el-input v-model="updatePwdData.password"></el-input>
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="showPwdDialog = false">取消</el-button>
              <el-button type="primary" @click="onSavePwd">保存</el-button>
            </span>
          </template>
        </el-dialog>
      </div>
    </template>
  </skeleton>
</template>

<script setup lang="ts">
import { useDesignerStore, useHomeStore, useUserStore } from '@/stores'
import type { ResponseData, SelectOption } from '@/types'
import { Menu as IconMenu } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox, type FormRules } from 'element-plus'
import { reqUpdatePassword } from '@/api'

const router = useRouter()

const designerStore = useDesignerStore()
const homeStore = useHomeStore()
const userStore = useUserStore()
const isCollapse = ref(false)
const avatarUrl = computed(() => {
  if (userStore.avatar) {
    return import.meta.env.VITE_REQUEST_BASE_URL + '/img/avatar/' + userStore.avatar
  } else {
    return ''
  }
})

const showPwdDialog = ref(false)
const formRef = ref()
const updatePwdData = ref({
  oldPassword: '',
  password: ''
})
const rules = ref<FormRules>({
  oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'change' }],
  password: [{ required: true, message: '请输入新密码', trigger: 'change' }]
})
const showAvatarDialog = ref(false)
const uploadTypes = ref(['jpg', 'jpeg', 'png', 'gif'])

const onClick = () => {
  isCollapse.value = !isCollapse.value
}

const onSelectMenu = (index: string) => {
  homeStore.activeMenu = index
}

const signOut = () => {
  ElMessageBox.confirm('确认要退出登录吗？', '提示', { type: 'warning' })
    .then(() => {
      userStore.signOut()
      router.push('/login')
    })
    .catch(() => {})
}

// 数据看板中选中的表单改变时
const onChange = (code: string) => {
  const form = homeStore.submitFormList.find((item) => item.code === code)
  homeStore.formInputItemList =
    form?.renderData.componentList
      .filter((component) => component.category === 'input')
      .map((component) => {
        return {
          label: component.props.label.value,
          prop: component.id,
          formatter: (row: Record<string, any>) => {
            if (component.props.options) {
              const getLabel = (value: string) => {
                return (
                  component.props.options.value.find(
                    (option: SelectOption) => option.value === value
                  )?.label || value
                )
              }
              if (Array.isArray(row[component.id])) {
                return row[component.id].map((item: string) => getLabel(item)).join(', ')
              } else {
                return getLabel(row[component.id])
              }
            }
            if (Array.isArray(row[component.id]) && component.component === 'widget-time-picker') {
              return row[component.id].join(component.props.rangeSeparator.value)
            }
            return row[component.id]
          }
        }
      }) || []
}

const updatePwd = () => {
  updatePwdData.value = {
    oldPassword: '',
    password: ''
  }
  showPwdDialog.value = true
}

const onSavePwd = () => {
  formRef.value
    .validate()
    .then(() => {
      reqUpdatePassword({
        id: userStore.id,
        ...updatePwdData.value
      }).then((result) => {
        ElMessage({
          type: result.type,
          message: result.message
        })
        if (result.success) {
          showPwdDialog.value = false
        }
      })
    })
    .catch(() => {})
}

const uploadAvatar = () => {
  showAvatarDialog.value = true
}

const getUploadUrl = () => {
  return `${import.meta.env.VITE_REQUEST_BASE_URL}/user/avatar/${userStore.id}`
}

const beforeAvatarUpload = (file: File) => {
  const ltCode = 3
  const isLt3M = file.size / 1024 / 1024
  const isExistFileType = uploadTypes.value.includes(file.type.replace(/image\//, ''))

  if (isLt3M > ltCode || isLt3M <= 0) {
    ElMessage.error(`图片大小范围是 0~${ltCode}MB!`)
    return false
  }
  if (!isExistFileType) {
    ElMessage.error(`图片只支持 ${uploadTypes.value.join('、')} 格式!`)
    return false
  }

  return isLt3M && isExistFileType
}

const handleAvatarSuccess = (response: ResponseData) => {
  ElMessage({
    message: response.message,
    type: response.type
  })

  if (response.success) {
    userStore.avatar = response.data
    showAvatarDialog.value = false
  }
}
</script>

<style scoped lang="scss">
.menu {
  height: 100%;
  background-color: var(--color-background-soft);
  .menu-header {
    display: flex;
    padding: 30px 17px;
    align-items: center;
    .switch-collapse {
      height: 30px;
      width: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      cursor: pointer;
      &:hover {
        background-color: var(--color-background-hover);
      }
    }
    .title {
      padding-left: 16px;
      font-size: 18px;
      font-weight: bolder;
      white-space: nowrap;
    }
    .title-enter-active {
      animation: title-show 0.2s ease-in-out;
    }
    .title-leave-active {
      animation: title-show 0.2s ease-in-out reverse;
    }
    @keyframes title-show {
      from {
        width: 0;
      }
      to {
        width: 106px;
      }
    }
  }
  .el-menu {
    background-color: transparent;
    border: none;
    --el-menu-hover-bg-color: var(--color-background-hover);
    &:not(.el-menu--collapse) {
      width: 240px;
    }
  }
}
.content {
  min-width: 500px;
  height: 100%;
  padding: 10px 16px;
  .content-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;
    .avatar {
      .el-avatar {
        cursor: pointer;
        :deep(> img) {
          width: 100%;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.avatar-dropdown {
  .username {
    cursor: default;
    color: var(--color-text);
    span {
      font-weight: bolder;
    }
  }
}
</style>
