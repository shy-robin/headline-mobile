<template>
  <div class="channel-edit-container">
    <van-cell class="my-channel">
      <div slot="title" class="label">我的频道</div>
      <van-button
        class="edit-button"
        plain
        color="#f85a5a"
        type="primary"
        size="mini"
        round
      >编辑</van-button>
    </van-cell>
    <van-grid :border="false" class="my-channel-grid" :gutter="12">
      <van-grid-item
        v-for="channel in channels" :key="channel.id"
        :text="channel.name"
        class="van-ellipsis"
        center
      />
    </van-grid>
    <van-cell class="recommend">
      <div slot="title" class="label">推荐频道</div>
    </van-cell>
    <van-grid :border="false" :gutter="12">
      <van-grid-item
        v-for="channel in recommendChannels" :key="channel.id"
        :text="channel.name"
        class="van-ellipsis"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/user'

export default {
  name: 'ChannelEdit',
  data() {
    return {
      allChannels: []
    }
  },
  props: {
    channels: {
      type: Array,
      required: true
    }
  },
  created() {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels() {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    }
  },
  computed: {
    recommendChannels() {
      return this.allChannels.filter(channel => {
        return !this.channels.find(userChannel => {
          return userChannel.id === channel.id
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.channel-edit-container {
  .my-channel {
    padding-top: 55px;
    padding-bottom: 24px;
    .label {
      font-size: 16px;
      color: #333;
    }
    .edit-button {
      width: 40px;
    }
  }
  .recommend {
    padding-top: 55px;
    padding-bottom: 24px;
    .label {
      font-size: 16px;
      color: #333;
    }
  }
  ::v-deep .van-grid-item__content {
    height: 43px;
    background-color: #f4f5f6;
  }
  ::v-deep .van-grid-item__text {
    font-size: 14px;
    color: #222;
  }
}
</style>
