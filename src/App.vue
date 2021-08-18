<template>
  <div id="app">
    <!-- 路由出口 -->
    <!-- 一级路由的组件缓存 -->
    <!-- 条件缓存：一级路由中只有 LayoutIndex 组件被缓存 -->
    <keep-alive :include="cachePages">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    // 使用动态缓存组
    ...mapState('UserMod', ['cachePages'])
  }
}
</script>

<style lang="scss">
</style>
