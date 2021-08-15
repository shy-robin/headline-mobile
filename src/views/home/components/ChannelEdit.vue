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
        @click="isEdit=!isEdit"
      >{{ isEdit ? '保存' : '编辑' }}</van-button>
    </van-cell>
    <van-grid :border="false" class="my-channel-grid" :gutter="12">
      <van-grid-item
        v-for="(channel, index) in channels" :key="channel.id"
        :text="channel.name"
        center
        :class="{'active': activeTab === index}"
        @click="onEdit(index, channel.id)"
      >
        <div
          slot="icon"
          class="icon-wrapper"
          v-if="index && isEdit"
        >
          <van-icon name="clear" />
        </div>
      </van-grid-item>
    </van-grid>
    <van-cell class="recommend">
      <div slot="title" class="label">推荐频道</div>
    </van-cell>
    <van-grid :border="false" :gutter="12">
      <van-grid-item
        v-for="channel in recommendChannels" :key="channel.id"
        :text="channel.name"
        class="van-ellipsis"
        @click="onAddRecommend(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, editChannels, removeChannels } from '@/api/user'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'ChannelEdit',
  data() {
    return {
      allChannels: [],
      isEdit: false
    }
  },
  props: {
    channels: {
      type: Array,
      required: true
    },
    activeTab: {
      type: Number,
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
    },
    async onAddRecommend(channel) {
      this.channels.push(channel)

      if (this.token) {
        // 如果处于登录状态
        await editChannels([{
          id: channel.id,
          seq: this.channels.length
        }])
      } else {
        // 如果处于离线状态
        this.setChannels(this.channels)
      }
    },
    async onEdit(index, channelId) {
      if (this.isEdit) { // 编辑状态，点击去除频道
        if (index) { // 不去除“推荐”频道
          this.channels.splice(index, 1)
          // 当删除元素的索引小于当前激活的索引，激活索引应当自减
          if (index <= this.activeTab) {
            this.$emit('decreaseActive')
          }
          if (this.token) {
            // 登录状态时
            await removeChannels(channelId)
          } else {
            // 离线状态时
            this.removeChannel(this.channels)
          }
        }
      } else { // 非编辑状态，点击频道跳转
        this.$emit('changeChannel', index)
      }
    },
    ...mapMutations('UserMod', ['setChannels', 'removeChannel'])
  },
  computed: {
    recommendChannels() {
      return this.allChannels.filter(channel => {
        return !this.channels.find(userChannel => {
          return userChannel.id === channel.id
        })
      })
    },
    ...mapState('UserMod', ['token'])
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
  .my-channel-grid {
    .active {
      ::v-deep .van-grid-item__text {
        color: red;
      }
    }
    ::v-deep .van-grid-item__icon-wrapper {
      position: unset;
    }
    .icon-wrapper {
      .van-icon {
        position: absolute;
        right: 6px;
        top: -7px;
        font-size: 14px;
        color: red;
      }
    }
    ::v-deep .van-grid-item__content {
      white-space: nowrap;
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
