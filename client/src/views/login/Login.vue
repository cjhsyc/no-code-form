<template>
  <div class="login-page">
    <div class="left"></div>
    <div class="right">
      <div class="login-box">
        <el-tabs v-model="activeName" class="tabs">
          <el-tab-pane label="登录" name="login"></el-tab-pane>
          <el-tab-pane label="注册" name="signup"></el-tab-pane>
        </el-tabs>
        <el-form
          :model="formData"
          :rules="rules"
          ref="formRef"
          class="login"
          label-position="top"
          hide-required-asterisk
        >
          <el-form-item label="账号" prop="username">
            <el-input v-model.trim="formData.username" prefix-icon="Avatar" clearable></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model.trim="formData.password"
              type="password"
              prefix-icon="Lock"
              show-password
              clearable
            ></el-input>
          </el-form-item>
          <Transition name="confirm" prop="confirm">
            <el-form-item label="确认密码" v-show="activeName === 'signup'" class="confirm">
              <el-input
                v-model.trim="formData.confirm"
                type="password"
                prefix-icon="Lock"
                show-password
                clearable
              ></el-input>
            </el-form-item>
          </Transition>
        </el-form>
        <el-button
          v-show="activeName === 'login'"
          class="button"
          type="success"
          @click="login"
          :loading="isLoading"
        >
          登录
        </el-button>
        <el-button
          v-show="activeName === 'signup'"
          class="button"
          type="success"
          @click="signup"
          :loading="isLoading"
        >
          注册
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reqLogin, reqSignup } from '@/api'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const activeName = ref('login')
const isLoading = ref(false)

const formData = ref({
  username: '',
  password: '',
  confirm: ''
})
const formRef = ref<FormInstance>()

const rules = computed<FormRules>(() => {
  const username = [{ required: true, message: '请输入账号', trigger: 'change' }]
  if (activeName.value === 'login') {
    return {
      username,
      password: [{ required: true, message: '请输入密码', trigger: 'change' }]
    }
  } else {
    return {
      username,
      password: [{ validator: validatePass, trigger: 'change' }],
      confirm: [{ validator: validateConfirm, trigger: 'change' }]
    }
  }
})

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (formData.value.confirm !== '') {
      if (!formRef.value) return
      formRef.value.validateField('confirm', () => null)
    }
    callback()
  }
}

const validateConfirm = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== formData.value.password) {
    callback(new Error('两次密码不一致'))
  } else {
    callback()
  }
}

// 切换登录和注册
watch(activeName, () => {
  setTimeout(() => {
    formRef.value?.resetFields()
  })
})

// 登录
const login = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      isLoading.value = true
      reqLogin({
        username: formData.value.username,
        password: formData.value.password
      }).then((result) => {
        isLoading.value = false
        userStore.setUserData(result.data)
        ElMessage({
          type: result.type,
          message: result.message
        })
        router.push('./home')
      })
    }
  })
}

// 注册
const signup = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      isLoading.value = true
      reqSignup({
        username: formData.value.username,
        password: formData.value.password
      }).then((result) => {
        isLoading.value = false
        ElMessage({
          type: result.type,
          message: result.message
        })
        activeName.value = 'login'
      })
    }
  })
}
</script>

<style scoped lang="scss">
.login-page {
  display: flex;
  height: 100vh;
  .left {
    flex: 1;
    height: 100%;
  }
  .right {
    height: 100%;
    display: flex;
    padding: 20vh 10vw 0;
    justify-content: center;
    .login-box {
      width: 400px;
      .login {
        .confirm-enter-active {
          animation: confirm 0.4s ease-in-out;
        }
        .confirm-leave-active {
          animation: confirm 0.4s ease-in-out reverse;
        }
        @keyframes confirm {
          0% {
            height: 0;
            margin: 0;
            overflow: hidden;
          }
          100% {
            height: 62px;
          }
        }
      }
      .button {
        width: 100%;
        margin: 0;
      }
    }
  }
}
</style>
