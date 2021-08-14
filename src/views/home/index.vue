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
  </div>
</template>

<script>
export default {
  name: 'HomeIndex'
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
