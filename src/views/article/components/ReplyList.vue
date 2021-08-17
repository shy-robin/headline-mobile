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
      :comment-list="commentList"
      type="c"
    />
    <van-button
      class="bottom-button"
      type="info"
      round
      @click="isShowCommentPopup = true"
    >回复</van-button>
    <van-popup
      v-model="isShowCommentPopup"
      position="bottom"
    >
      <publish-comment
        :target="comment.com_id.toString()"
        :article-id="articleId.toString()"
        @publishSuccess="publishSuccess"
        @addCommentCount="comment.reply_count++"
      />
    </van-popup>
  </div>
</template>

<script>
import CommentItem from './CommentItem.vue'
import CommentList from './CommentList.vue'
import PublishComment from './PublishComment.vue'

export default {
  name: 'ReplyList',
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data() {
    return {
      isShowCommentPopup: false,
      commentList: []
    }
  },
  methods: {
    publishSuccess(comment) {
      this.commentList.unshift(comment)
      this.isShowCommentPopup = false
    }
  },
  components: {
    CommentItem,
    CommentList,
    PublishComment
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
  .bottom-button {
    width: 100%;
    margin-bottom: 2px;
  }
}
</style>
