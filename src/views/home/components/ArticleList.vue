<template>
  <div class="article-list-container">
    <van-pull-refresh
      v-model="isRefreshing"
      :success-text="refreshSuccessText"
      :success-duration="1500"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <article-item
          v-for="article in articles" :key="article.art_id"
          :article="article"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item/'

export default {
  name: 'ArticleList',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  components: {
    ArticleItem
  },
  data() {
    return {
      articles: [],
      loading: false,
      finished: false,
      timestamp: null,
      isRefreshing: false,
      refreshSuccessText: ''
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
    },
    async onRefresh() {
      // 1. 发送请求
      const res = await getArticles({
        channel_id: this.id,
        timestamp: Date.now(),
        with_top: 1
      })
      // 2. 获取数据
      const data = res.data.data
      this.articles.unshift(...data.results) // 注意要向前添加数据
      // 3. 关闭 loading
      this.isRefreshing = false
      // 4. 设置成功文本
      this.refreshSuccessText = `更新了${data.results.length}条数据`
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
