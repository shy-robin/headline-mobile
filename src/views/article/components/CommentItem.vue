<template>
  <div class="comment-item">
    <div class="left">
      <van-image
        class="avatar"
        fit="cover"
        round
        :src="comment.aut_photo"
      />
    </div>
    <div class="right">
      <div class="top">
        <span class="name">{{ comment.aut_name }}</span>
        <span class="like">
          <van-icon class="like-icon" name="good-job-o" />
          {{ comment.like_count }}
        </span>
      </div>
      <div class="middle">
        {{ comment.content }}
      </div>
      <div class="bottom">
        <span class="time">{{ comment.pubdate | dateTime }}</span>
        <van-button
          class="reply"
          size="mini"
          round
        >{{ comment.reply_count }}回复</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-item {
  display: flex;
  padding: 10px 16px;
  .left {
    .avatar {
      width: 36px;
      margin-right: 10px;
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    flex: 1;
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .name {
        font-size: 14px;
        color: #406599;
      }
      .like {
        display: flex;
        align-items: flex-end;
        font-size: 14px;
        .like-icon {
          margin-right: 2px;
          font-size: 18px;
        }
      }
    }
    .middle {
      font-size: 16px;
      margin: 8px 0;
    }
    .bottom {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #585858;
      .reply {
        margin-left: 10px;
      }
    }
  }
}
</style>
