<template>
  <div
    class="article-list-container"
    ref="article-list"
  >
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
          v-for="(article, index) in articles" :key="index"
          :article="article"
          @click.native="$router.push({
            name: 'article',
            params: {
              articleId: article.art_id
            }
          })"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item/'
import debounce from '@/utils/debounce'

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
      refreshSuccessText: '',
      scrollTop: 0
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
  },
  mounted() {
    const list = this.$refs['article-list']
    // 使用防抖函数降低函数调用频率
    list.onscroll = debounce(() => {
      // 记录列表此时的位置
      this.scrollTop = list.scrollTop
    }, 50)
  },
  // 缓存组件被激活时调用
  activated() {
    // 将列表恢复到记录的位置
    this.$refs['article-list'].scrollTop = this.scrollTop
  }
}
</script>

<style lang="scss" scoped>
.article-list-container {
  position: fixed;
  left: 0; // 注意要给list设置大小才能监听到onscroll事件
  right: 0;
  top: 0;
  bottom: 0;
  overflow-y: auto;
}
</style>
