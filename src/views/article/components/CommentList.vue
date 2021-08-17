<template>
  <van-list
    class="comment"
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-cell title="评论" />
    <comment-item
      v-for="(comment, index) in commentList" :key="index"
      :comment="comment"
    />
  </van-list>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './CommentItem.vue'

export default {
  name: 'CommentList',
  props: {
    articleId: {
      type: [Number, String, Object], // 传入的数据可能是这三种类型
      required: true
    },
    commentList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
      offset: 0,
      limit: 10
    }
  },
  methods: {
    async onLoad() {
      // 请求数据
      const { data } = await getComments({
        type: 'a',
        source: this.articleId,
        offset: null,
        limit: this.limit
      })
      const { results } = data.data
      console.log(results)

      this.commentList.push(...results)

      this.loading = false

      if (!results.length) {
        this.finished = true
      }
    }
  },
  components: {
    CommentItem
  }
}
</script>

<style lang="scss" scoped>

</style>
