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
    <van-tabs animated>
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
        />
      </div>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/ArticleList.vue'

export default {
  name: 'HomeIndex',
  data() {
    return {
      channels: []
    }
  },
  created() {
    this.loadUserChannels()
  },
  methods: {
    async loadUserChannels() {
      const res = await getUserChannels()
      this.channels = res.data.data.channels
    }
  },
  components: {
    ArticleList
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
