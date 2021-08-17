<template>
  <div class="article-container">
    <van-nav-bar
      left-arrow
      @click-left="$router.back()"
      :border="false"
    />
    <div class="middle">
      <div class="title">
        <span>{{ article.title }}</span>
      </div>
      <van-cell
        class="author-info"
      >
        <div slot="title" class="title">
          <van-image
            class="avatar"
            fit="cover"
            round
            :src="article.aut_photo"
          />
          <div class="info">
            <span class="name">{{ article.aut_name }}</span>
            <span class="time">{{ article.pubdate | relativeTime }}</span>
          </div>
        </div>
        <div>
          <van-button
            v-if="!article.is_followed"
            class="follow-button"
            icon="plus"
            type="info"
            size="mini"
            round
            :loading="isFollowLoading"
            @click="onChangeFollow"
          >关注</van-button>
          <van-button
            v-else
            class="follow-button"
            round
            plain
            size="mini"
            :loading="isFollowLoading"
            @click="onChangeFollow"
          >已关注</van-button>
        </div>
      </van-cell>
      <div
        class="content markdown-body"
        v-html="article.content"
        ref="content"
      >
      </div>
      <div class="bottom">
        <van-button
          class="left"
          round
          size="mini"
          @click="isShowCommentPopup = true"
        >写评论</van-button>
        <div class="right">
          <van-icon
            :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
            @click="onLike"
          />
          <van-badge :content="commentCount">
            <van-icon name="pinglun" class-prefix="iconfont" />
          </van-badge>
          <van-icon
            :name="article.is_collected ? 'star' : 'star-o'"
            @click="onStar"
          />
          <van-icon name="fenxiang" class-prefix="iconfont" />
        </div>
      </div>
      <comment-list
        :source-id="articleId"
        :comment-list="commentList"
        @commentCount="commentCount=$event"
      />
    </div>
    <van-popup
      v-model="isShowCommentPopup"
      position="bottom"
    >
      <publish-comment
        :target="articleId"
        @publishSuccess="publishSuccess"
        @addCommentCount="commentCount++"
      />
    </van-popup>
    <van-popup
      v-model="isShowReplyPopup"
      position="bottom"
    >
      <reply-list
        v-if="isShowReplyPopup"
        :comment="replyItem"
        @closeReply="isShowReplyPopup=false"
      />
    </van-popup>
  </div>
</template>

<script>
import './github-markdown.css'
import {
  getArticleDetail,
  starArticle,
  unstarArticle,
  likeArticle,
  cancelLikeArticle
} from '@/api/article'
import { ImagePreview } from 'vant'
import { follow, unfollow } from '@/api/user'
import CommentList from './components/CommentList.vue'
import PublishComment from './components/PublishComment.vue'
import EventBus from '@/utils/bus'
import ReplyList from './components/ReplyList.vue'

export default {
  name: 'ArticleIndex',
  data() {
    return {
      articleId: this.$route.params.articleId,
      article: {},
      isFollowLoading: false,
      isShowCommentPopup: false,
      commentList: [],
      commentCount: 0,
      isShowReplyPopup: false,
      replyItem: {}
    }
  },
  created() {
    this.loadArticleDetail()
    EventBus.$on('showReply', comment => {
      this.replyItem = comment
      this.isShowReplyPopup = true
    })
  },
  methods: {
    async loadArticleDetail() {
      const { data } = await getArticleDetail(this.articleId)
      this.article = data.data

      this.previewImage()
    },
    previewImage() {
      // 数据改变，视图更新不是立即的
      // 需要使用 $nextTick，里面的回调函数会等到视图更新后执行，这样就能获取 DOM
      this.$nextTick(() => {
        const imgList = this.$refs.content.querySelectorAll('img')
        const imgSrc = []
        imgList.forEach((img, index) => {
          imgSrc.push(img.src)
          img.onclick = () => {
            ImagePreview({
              images: imgSrc,
              startPosition: index
            })
          }
        })
      })
    },
    async onChangeFollow() {
      this.isFollowLoading = true
      if (this.article.is_followed) {
        // 取消关注
        await unfollow(this.article.aut_id)
      } else {
        // 关注
        await follow(this.article.aut_id)
      }
      this.isFollowLoading = false
    },
    async onStar() {
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true,
        duration: 0
      })
      if (this.article.is_collected) {
        await unstarArticle(this.articleId)
        this.$toast.success('已取消收藏')
      } else {
        await starArticle(this.articleId)
        this.$toast.success('收藏成功')
      }
      this.article.is_collected = !this.article.is_collected
    },
    async onLike() {
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true,
        duration: 0
      })
      if (this.article.attitude === 1) {
        await cancelLikeArticle(this.articleId)
        this.article.attitude = 0
        this.$toast.success('已取消点赞')
      } else {
        await likeArticle(this.articleId)
        this.article.attitude = 1
        this.$toast.success('点赞成功')
      }
    },
    publishSuccess(comment) {
      this.commentList.unshift(comment)
      this.isShowCommentPopup = false
    }
  },
  components: {
    CommentList,
    PublishComment,
    ReplyList
  }
}
</script>

<style lang="scss" scoped>
.article-container {
  .title {
    font-size: 20px;
    font-weight: bold;
    padding: 24px 12px;
  }
  .author-info {
    background-color: #f5f7f9;
    .title {
      padding: unset;
      display: flex;
      align-items: center;
      .avatar {
        width: 35px;
        height: 35px;
        margin-right: 10px;
      }
      .info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .name {
          font-size: 12px;
          color: #333333;
        }
        .time {
          font-size: 11px;
          color: #bababa;
          margin-top: -8px;
        }
      }
    }
    .van-cell__value {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
  .follow-button {
    height: 29px;
    font-size: 14px;
  }
  .content {
    padding-top: 20px;
    padding-left: 12px;
    padding-right: 12px;
  }
  .bottom {
    display: flex;
    align-items: center;
    background-color: #fff;
    border-top: 1px solid #d8d8d8;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    .left {
      margin: 10px 15px;
      flex: 1;
      .van-button__text {
        font-size: 15px;
        color: #a7a7a7;
      }
    }
    .right {
      flex: 1;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      .van-icon-good-job-o {
        font-size: 24px;
      }
      .van-icon-good-job {
        font-size: 24px;
        color: red;
      }
      .iconfont-pinglun {
        font-size: 18px;
        color: #777777;
      }
      .van-icon-star {
        font-size: 22px;
        color: rgb(255, 166, 0);
      }
      .van-icon-star-o {
        font-size: 22px;
        color: #777777;
      }
      .iconfont-fenxiang {
        font-size: 18px;
        color: #777777;
      }
      ::v-deep .van-badge--fixed {
        font-size: 10px;
        top: 12px;
        right: -1px;
      }
    }
  }
  .middle {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 45px;
    overflow-y: auto;
  }
}
</style>
