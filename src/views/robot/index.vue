<template>
  <div class="robot-container">
    <van-nav-bar
      title="小智同学"
      left-arrow
      @click-left="$router.back()"
      :border="false"
    />
    <div
      class="list"
      ref="list"
    >
      <van-cell
        class="message"
        v-for="(item, index) in messages" :key="index"
      >
        <div slot="title">
          <van-image
            v-if="item.id === 0"
            width="40"
            height="40"
            fit="cover"
            round
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
          <span v-else>小智同学</span>
        </div>
        <div slot="label">
          {{ item.timestamp }}
        </div>
        <div>
          {{ item.msg }}
        </div>
      </van-cell>
    </div>
    <van-cell class="toolbar">
      <div slot="title">
        <van-field
          v-model="message"
          rows="1"
          autosize
          type="textarea"
          placeholder="请输入留言"
        />
      </div>
      <van-button
        type="primary"
        size="mini"
        @click="onSend"
      >发送</van-button>
    </van-cell>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'RobotIndex',
  data() {
    return {
      message: '',
      messages: []
    }
  },
  methods: {
    async onSend() {
      this.messages.push({
        msg: this.message,
        timestamp: dayjs().format('YYYY-MM-DD HH:mm'),
        id: 0
      })

      // 延时一段时间
      await this.delay(500)

      this.messages.push({
        msg: '接口出错，无法使用该功能！',
        timestamp: dayjs().format('YYYY-MM-DD HH:mm'),
        id: 1
      })

      this.scrollToBottom()
      this.message = ''
    },
    scrollToBottom() {
      // 数据更新到视图层触发
      this.$nextTick(() => {
        // 使列表一直处于底部
        this.$refs.list.scrollTop = this.$refs.list.scrollHeight
      })
    },
    delay(time) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, time)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.robot-container {
  .list {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 64px;
    overflow-y: auto;
  }
  .message {
    .van-cell__title {
      flex: unset;
    }
    .van-cell__value {
      text-align: left;
    }
  }
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    .van-cell__value {
      flex: unset;
      display: flex;
      align-items: center;
    }
  }
}
</style>
