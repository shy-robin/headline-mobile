<template>
  <div class="reply-list">
    <van-nav-bar>
      <div slot="title">{{ comment.reply_count }}条回复</div>
      <div slot="left" @click="$emit('closeReply')">
        <van-icon name="cross" />
      </div>
    </van-nav-bar>
    <comment-item
      :comment="comment"
    />
    <comment-list
      :source-id="comment.com_id.toString()"
      type="c"
    />
  </div>
</template>

<script>
import CommentItem from './CommentItem.vue'
import { getComments } from '@/api/comment'
import CommentList from './CommentList.vue'

export default {
  name: 'ReplyList',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  created() {
    this.loadComments()
  },
  methods: {
    async loadComments() {
      const { data } = await getComments({
        type: 'c',
        source: this.comment.com_id.toString(),
        offset: null,
        limit: 10
      })
      console.log(data)
    }
  },
  components: {
    CommentItem,
    CommentList
  }
}
</script>

<style lang="scss" scoped>
.reply-list {
  .van-nav-bar {
    background-color: unset;
    ::v-deep .van-nav-bar__title {
      color: #000;
    }
    ::v-deep .van-icon-cross {
      color: #000;
    }
  }
}
</style>
