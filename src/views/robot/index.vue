<template>
  <div class="robot-container">
    <van-nav-bar
      title="小智同学"
      left-arrow
      @click-left="$router.back()"
      :border="false"
    />
    <van-cell-group>
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
    </van-cell-group>
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
      messages: [
        {
          msg: 'hello',
          timestamp: dayjs(1629273492469).format('YYYY-MM-DD HH:mm'),
          id: 0
        },
        {
          msg: '你好',
          timestamp: dayjs(1629273493469).format('YYYY-MM-DD HH:mm'),
          id: 1
        },
        {
          msg: '吃了吗？',
          timestamp: dayjs(1629273494469).format('YYYY-MM-DD HH:mm'),
          id: 0
        },
        {
          msg: '吃了',
          timestamp: dayjs(1629273495469).format('YYYY-MM-DD HH:mm'),
          id: 1
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.robot-container {
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
