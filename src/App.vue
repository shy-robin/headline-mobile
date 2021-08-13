<template>
  <div id="app">
    Hello world
    <van-cell-group>
      <van-cell title="单元格" value="内容"></van-cell>
      <van-cell title="单元格" value="内容"></van-cell>
    </van-cell-group>
    <div>
      <i class="iconfont icon-shoucang_quxiaoshoucang"></i>
      <i class="iconfont icon-sucai"></i>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import './style/index.scss';
</style>
