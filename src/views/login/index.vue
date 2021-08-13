<template>
  <div class="login-container">
    <van-nav-bar
      title="登录"
      left-arrow
      @click-left="$router.back()"
      :border="false"
    />
    <van-form
      class="login-form"
      @submit="onSubmit"
    >
      <van-field
        class="form-mobile"
        v-model="user.mobile"
        placeholder="请输入手机号"
        :rules="formRules.mobile"
        left-icon="shouji"
        icon-prefix="iconfont"
      />
      <van-field
        v-model="user.code"
        placeholder="请输入验证码"
        :rules="formRules.code"
        left-icon="mima"
        icon-prefix="iconfont"
      >
        <template #button>
          <van-button
            class="code-button"
            size="small"
            round
            color="#ededed"
          >获取验证码</van-button>
        </template>
      </van-field>
      <div class="button-wrapper">
        <van-button
          class="login-button"
          block
          type="info"
          color="#6db4fb"
          @click="onLogin"
        >登录</van-button>
        <van-button
          class="test-button"
          block
          @click="onTest"
        >测试数据</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { userLogin } from '@/api/user'

export default {
  name: 'LoginIndex',
  data() {
    return {
      user: {
        mobile: '',
        code: ''
      },
      formRules: {
        mobile: [
          { required: true, message: '请填写用户名' }
        ],
        code: [
          { required: true, message: '请填写密码' }
        ]
      }
    }
  },
  methods: {
    onTest() {
      this.user.mobile = '13911111111'
      this.user.code = '246810'
    },
    async onLogin() {
      try {
        const res = await userLogin(this.user)
        console.log(res)
      } catch (ex) {
        console.log(ex)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  .code-button {
    .van-button__text {
      color: #666;
      font-size: 11px;
    }
  }
  .button-wrapper {
    padding: 0 14px;
    margin-top: 26px;
    .login-button, .test-button {
      border-radius: 5px;
      margin-bottom: 10px;
    }
  }
}
</style>
