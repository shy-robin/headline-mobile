<template>
  <div class="result-container">
    <van-list
      class="result-list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="article in searchResults" :key="article.art_id"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'

export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      searchResults: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20
    }
  },
  methods: {
    async onLoad() {
      // 异步请求数据
      const { data } = await getSearchResult({
        page: this.page,
        per_page: this.perPage,
        q: this.searchText
      })

      // 添加数据
      const { results } = data.data
      this.searchResults.push(...results)

      // 结束 loading
      this.loading = false

      // 判断是否结束
      if (results.length) {
        this.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.result-container {
  .result-list {
    position: absolute;
    top: 54px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
  }
}
</style>
