<template>
  <div id="app">
    <!-- 路由出口 -->
    <!-- 一级路由的组件缓存 -->
    <!-- 条件缓存：一级路由中只有 LayoutIndex 组件被缓存 -->
    <keep-alive :include="['LayoutIndex']">
      <router-view />
    </keep-alive>
  </div>
</template>

<style lang="scss">
</style>
