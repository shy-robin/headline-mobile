<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <!-- 二级路由的组件缓存 -->
    <keep-alive>
      <router-view />
    </keep-alive>
    <van-tabbar v-model="tabActive">
      <van-tabbar-item icon-prefix="iconfont" icon="shouye" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon-prefix="iconfont" icon="wenda" to="/qa">问答</van-tabbar-item>
      <van-tabbar-item icon-prefix="iconfont" icon="shipin" to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon-prefix="iconfont" icon="wode" to="/profile">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'LayoutIndex',
  data() {
    return {
      tabActive: 0
    }
  },
  mounted() {
    // 刚登录的用户加载完 LayoutIndex 组件后，立即将其加入缓存组
    this.addCachePage('LayoutIndex')
  },
  methods: {
    ...mapMutations('UserMod', ['addCachePage'])
  }
}
</script>

<style lang="scss" scoped>

</style>
