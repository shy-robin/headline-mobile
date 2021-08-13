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
      validate-trigger="onSubmit"
      :validate-first="true"
      :show-error-message="false"
      :show-error="false"
      @submit="onLogin"
      @fail="onFail"
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
            native-type="button"
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
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3|4|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
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
