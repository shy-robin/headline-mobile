<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="$router.back()"
        @focus="isShowResult = false"
      />
    </form>
    <search-result v-if="isShowResult" :search-text="searchText" />
    <search-advice
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    />
    <search-history
      v-else
      :search-history="searchHistory"
    />
  </div>
</template>

<script>
import SearchAdvice from './components/SearchAdvice.vue'
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'

export default {
  name: 'SearchIndex',
  data() {
    return {
      searchText: '',
      isShowResult: false,
      searchHistory: []
    }
  },
  methods: {
    onSearch(word) {
      this.searchText = word

      // 存储搜索记录
      this.searchHistory.unshift(this.searchText)
      // 记录去重
      this.searchHistory = [...new Set(this.searchHistory)]

      this.isShowResult = true
    }
  },
  components: {
    SearchAdvice,
    SearchHistory,
    SearchResult
  }
}
</script>

<style lang="scss" scoped>

</style>
