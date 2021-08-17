<template>
  <div class="publish-comment">
    <van-field
      v-model.trim="comment"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      type="primary"
      size="small"
      round
      :disabled="comment ? false : true"
      @click="onPublish"
    >
      发表
    </van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'

export default {
  name: 'PublishComment',
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  data() {
    return {
      comment: ''
    }
  },
  methods: {
    async onPublish() {
      this.$toast.loading({
        message: '发表中...',
        forbidClick: true,
        duration: 0
      })
      const { data } = await addComment({
        target: this.target,
        content: this.comment,
        art_id: this.articleId
      })
      this.$toast.success('发表成功')
      this.comment = ''
      this.$emit('publishSuccess', data.data.new_obj) // 返回新评论
      this.$emit('addCommentCount') // 增加评论
    }
  }
}
</script>

<style lang="scss" scoped>
.publish-comment {
  display: flex;
  align-items: center;
  .van-button__content {
    width: 30px;
  }
}
</style>
