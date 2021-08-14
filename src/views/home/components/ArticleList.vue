<template>
  <div class="article-list-container">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="article in articles" :key="article.art_id"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'

export default {
  name: 'ArticleList',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      articles: [],
      loading: false,
      finished: false,
      timestamp: null
    }
  },
  methods: {
    async onLoad() {
      // 1. 发送请求
      const res = await getArticles({
        channel_id: this.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1 // 是否包含置顶文章
      })
      // 2. 获取数据
      const data = res.data.data
      this.articles.push(...data.results)
      // 3. 关闭 loading
      this.loading = false
      // 4. 判断是否结束
      if (data.results.length) {
        this.timestamp = data.pre_timestamp
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
