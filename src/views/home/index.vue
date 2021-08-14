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
        内容 {{ item.name }}
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'

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
}
</style>
