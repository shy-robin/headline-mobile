<template>
  <div class="login-container">
    <van-nav-bar
      title="登录"
      left-arrow
      @click-left="$router.back()"
      :border="false"
    />
    <van-form
      ref="loginForm"
      class="login-form"
      validate-trigger="onSubmit"
      :validate-first="true"
      :show-error-message="false"
      :show-error="false"
      @submit="onLogin"
      @failed="onFail"
    >
      <van-field
        class="form-mobile"
        v-model="user.mobile"
        placeholder="请输入手机号"
        :rules="formRules.mobile"
        left-icon="shouji"
        icon-prefix="iconfont"
        name="mobile"
      />
      <van-field
        v-model="user.code"
        placeholder="请输入验证码"
        :rules="formRules.code"
        left-icon="mima"
        icon-prefix="iconfont"
        center
      >
        <template #button>
          <van-count-down
            v-if="isShowCountdown"
            :time="1000 * 60"
            format="ss s"
            @finish="isShowCountdown = false"
          />
          <van-button
            v-else
            class="code-button"
            size="mini"
            color="#ededed"
            block
            round
            native-type="button"
            @click="onSendSms"
            :loading="isSendSmsLoading"
            loading-text="发送中"
          >获取验证码</van-button>
        </template>
      </van-field>
      <div class="button-wrapper">
        <van-button
          class="login-button"
          block
          type="info"
          color="#6db4fb"
        >登录</van-button>
        <van-button
          class="test-button"
          block
          @click="onTest"
          native-type="button"
        >测试数据</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { userLogin, getSmsCode } from '@/api/user'

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
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3|4|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isSendSmsLoading: false,
      isShowCountdown: false
    }
  },
  methods: {
    onTest() {
      this.user.mobile = '13911111111'
      this.user.code = '246810'
    },
    async onLogin() {
      try {
        this.$toast.loading({
          message: '登录中...',
          forbidClick: true,
          duratioin: 0
        })
        const res = await userLogin(this.user)
        console.log(res)
        this.$toast.success('登录成功！')
      } catch (ex) {
        console.log(ex)
        this.$toast.fail('登录失败！')
      }
    },
    onFail(error) {
      this.$toast({
        message: error.errors[0].message,
        position: 'top'
      })
    },
    async onSendSms() {
      this.isSendSmsLoading = true
      try {
        // 1. 校验手机号表单项
        await this.$refs.loginForm.validate('mobile')
        // 2. 发送短信请求
        const res = await getSmsCode(this.user.mobile)
        console.log(res)
        this.isSendSmsLoading = false
        this.isShowCountdown = true
      } catch (ex) {
        // 3. 处理错误请求
        let message
        if (ex.response) {
          if (ex.response.status === 429) {
            message = '发送太频繁了，请稍后重试'
          } else if (ex.response.status === 404) {
            message = '手机号不正确'
          } else if (ex.response.status === 507) {
            message = '服务器数据库异常'
          }
        } else if (ex.name === 'mobile') {
          message = ex.message
        } else {
          // 未知错误
          message = '发送失败，请稍后重试'
        }
        this.$toast({
          message,
          position: 'top'
        })
        this.isSendSmsLoading = false
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
