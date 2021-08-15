<template>
  <div>
    <van-cell title="历史记录">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #right-icon>
        <van-icon name="delete" />
      </template>
    </van-cell>
    <van-cell title="v">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #right-icon>
        <van-icon name="close" />
      </template>
    </van-cell>
    <van-cell title="vant">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #right-icon>
        <van-icon name="close" />
      </template>
    </van-cell>
    <van-cell title="vue">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #right-icon>
        <van-icon name="close" />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory'
}
</script>

<style lang="scss" scoped>

</style>
