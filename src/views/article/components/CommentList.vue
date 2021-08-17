<template>
  <van-list
    class="comment"
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-cell title="全部评论" />
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
    sourceId: {
      type: [Number, String, Object], // 传入的数据可能是这三种类型
      required: true
    },
    commentList: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'a'
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  methods: {
    async onLoad() {
      // 请求数据
      const { data } = await getComments({
        type: this.type,
        source: this.sourceId,
        offset: this.offset,
        limit: this.limit
      })
      const { results, total_count: totalCount, last_id: lastId } = data.data
      this.$emit('commentCount', totalCount)

      this.commentList.push(...results)

      this.offset = lastId

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
