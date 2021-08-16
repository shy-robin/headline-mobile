<template>
  <div class="search-history-container">
    <van-cell title="历史记录">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #right-icon>
        <div
          v-if="!isShowDelete"
        >
          <van-icon
            name="delete"
            @click="isShowDelete = true"
          />
        </div>
        <div v-else class="button-group">
          <van-button
            type="danger"
            size="mini"
            @click="clearHistory"
          >全部删除</van-button>
          <van-button
            @click="isShowDelete = false"
            size="mini"
          >完成</van-button>
        </div>
      </template>
    </van-cell>
    <van-cell
      v-for="(item, index) in searchHistory" :key="index"
      :title="item"
      @click="onClickItem(index)"
    >
      <template #right-icon v-if="isShowDelete">
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
  },
  data() {
    return {
      isShowDelete: false
    }
  },
  methods: {
    async clearHistory() {
      try {
        await this.$dialog.confirm({
          title: '提示',
          message: '确定删除所有历史记录吗？'
        })
        // 删除所有历史记录
        this.$emit('clearAll')
      } catch (ex) {}
    },
    onClickItem(index) {
      if (this.isShowDelete) {
        // 删除操作
        this.$emit('delete', index)
      } else {
        // 搜索操作
        this.$emit('search', this.searchHistory[index])
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search-history-container {
  .button-group {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
