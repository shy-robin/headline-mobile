<template>
  <div>
    <van-cell title="历史记录">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #right-icon>
        <van-icon name="delete" />
      </template>
    </van-cell>
    <van-cell
      v-for="(item, index) in searchHistory" :key="index"
      :title="item"
    >
      <template #right-icon>
        <van-icon name="close" />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    searchHistory: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
