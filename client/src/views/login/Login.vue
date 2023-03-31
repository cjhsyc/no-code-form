<template>
  <div class="login-page">
    <div class="left"></div>
    <div class="right">
      <div class="login-box">
        <el-tabs v-model="activeName" class="tabs">
          <el-tab-pane label="登录" name="login"></el-tab-pane>
          <el-tab-pane label="注册" name="signup"></el-tab-pane>
        </el-tabs>
        <el-form class="login" label-position="top">
          <el-form-item label="账号">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input></el-input>
          </el-form-item>
          <Transition name="confirm">
            <el-form-item label="确认密码" v-show="activeName === 'signup'" class="confirm">
              <el-input></el-input>
            </el-form-item>
          </Transition>
        </el-form>
        <el-button v-show="activeName === 'login'" class="button" type="success">登录</el-button>
        <el-button v-show="activeName === 'signup'" class="button" type="success">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const activeName = ref('login')
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
    width: 600px;
    display: flex;
    padding-top: 20%;
    justify-content: center;
    .login-box {
      width: 400px;
      .login {
        .confirm {
          overflow: hidden;
        }
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
