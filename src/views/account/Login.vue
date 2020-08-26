<template>
  <div class="login">
    <div class="login-container">
      <el-row type="flex" justify="center">
        <h2>后台管理系统</h2>
      </el-row>
      <el-row>
        <el-col :span="12">
          <img src="../../assets/images/login.jpg" width="100%" />
        </el-col>
        <el-col :span="12" class="form">
          <el-input
            placeholder="请输入手机号"
            v-model="account">
            <i slot="prefix" class="el-input__icon el-icon-mobile-phone"></i>
          </el-input>
          <!-- <el-input
            placeholder="请输入密码"
            v-model="password">
            <i slot="prefix" class="el-input__icon el-icon-unlock"></i>
          </el-input> -->
          <div class="auth_code">
            <el-input
              placeholder="请输入验证码"
              v-model="authCode">
              <i slot="prefix" class="el-input__icon el-icon-message"></i>
            </el-input>
            <el-button type="primary" round>获取验证码</el-button>
          </div>
          <div class="login-btn">
            <el-button type="primary" round>立即登录</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      account: '',
      authCode: ''
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #67C23A;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-container {
    max-width: 560px;
    max-height: 400px;
    background-color: #ffffff;
    border-radius: 12px;
    padding: 0 40px 15px 15px;
    .form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-top: 20px;
      .el-input, .el-button {
        margin-bottom: 30px;
      }
      .auth_code {
        display: flex;
        align-items: center;
        .el-button {
          margin-left: 20px;
        }
      }
      .login-btn {
        text-align: center;
        .el-button {
          width: 80%;
        }
      }
    }
  }
}
</style>
