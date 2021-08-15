<template>
  <div class="home-container">
    <van-nav-bar class="nav">
      <van-button
        class="search-button"
        slot="title"
        icon-prefix="iconfont"
        icon="sousuo"
        color="#5babfb"
        round
      >搜索</van-button>
    </van-nav-bar>
    <van-tabs animated v-model="active">
      <van-tab
        v-for="item in channels" :key="item.id"
        :title="item.name">
        <article-list :id="item.id"></article-list>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="nav-right">
        <van-icon
          class="right-icon"
          name="gengduo"
          class-prefix="iconfont"
          @click="isShowPopup = true"
        />
      </div>
    </van-tabs>
    <van-popup
      class="channel-popup"
      v-model="isShowPopup"
      position="bottom"
      closeable
      style="height:100%;"
      get-container="body"
    >
      <channel-edit
        :channels="channels"
        :active-tab="active"
        @changeChannel="changeChannel"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/ArticleList.vue'
import ChannelEdit from './components/ChannelEdit.vue'

export default {
  name: 'HomeIndex',
  data() {
    return {
      channels: [],
      isShowPopup: true,
      active: 0
    }
  },
  created() {
    this.loadUserChannels()
  },
  methods: {
    async loadUserChannels() {
      const res = await getUserChannels()
      this.channels = res.data.data.channels
    },
    changeChannel(index) {
      this.active = index
      this.isShowPopup = false
    }
  },
  components: {
    ArticleList,
    ChannelEdit
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  .nav {
    height: 48px;
    .search-button {
      width: 278px;
      height: 32px;
      font-size: 14px;
    }
    ::v-deep .van-nav-bar__title {
      max-width: none;
    }
  }
  ::v-deep .van-tabs__content {
    position: fixed;
    left: 0;
    right: 0;
    top: 93px;
    bottom: 50px;
    overflow: auto;
  }
  .placeholder {
    flex-shrink: 0;
    flex-basis: 40px;
  }
  .nav-right {
    flex-basis: 20px;
    position: fixed;
    height: 44px;
    right: 0;
    .right-icon {
      line-height: 44px;
      font-size: 20px;
      background-color: #fff;
      opacity: 0.9;
      padding: 0 10px;
    }
  }
}
</style>
