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
    <search-result
      v-if="isShowResult"
      :search-text="searchText"
    />
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
import { mapState, mapMutations } from 'vuex'
import { getSearchHistory } from '@/api/search'

export default {
  name: 'SearchIndex',
  data() {
    return {
      searchText: '',
      isShowResult: false,
      searchHistory: []
    }
  },
  created() {
    if (this.token) {
      // 登录状态下，获取数据库中历史记录
      this.loadSearchHistory()
    } else {
      // 离线状态下，获取 localStorage 历史记录
      this.searchHistory = this.history
    }
  },
  methods: {
    onSearch(word) {
      this.searchText = word

      // 存储搜索记录
      this.searchHistory.unshift(this.searchText)
      // 记录去重
      this.searchHistory = [...new Set(this.searchHistory)]
      if (!this.token) {
        this.setHistory(this.searchHistory)
      }

      this.isShowResult = true
    },
    async loadSearchHistory() {
      const { data } = await getSearchHistory()
      this.searchHistory = data.data.keywords
    },
    ...mapMutations('SearchMod', ['setHistory'])
  },
  components: {
    SearchAdvice,
    SearchHistory,
    SearchResult
  },
  computed: {
    ...mapState('UserMod', ['token']),
    ...mapState('SearchMod', ['history'])
  }
}
</script>

<style lang="scss" scoped>

</style>
