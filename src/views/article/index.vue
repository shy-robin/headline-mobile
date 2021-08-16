<template>
  <div class="article-container">
    <van-nav-bar
      left-arrow
      @click-left="$router.back()"
      :border="false"
    />
    <div class="title">
      <span>牛白发发打扫房间是覅哦啊萨芬士大夫，风骚覅道具</span>
    </div>
    <van-cell
      class="author-info"
    >
      <div slot="title" class="title">
        <van-image
          class="avatar"
          fit="cover"
          round
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
        <div class="info">
          <span class="name">天涯小星可</span>
          <span class="time">14小时前</span>
        </div>
      </div>
      <div>
        <van-button
          class="follow-button"
          icon="plus"
          type="info"
          size="mini"
          round
        >关注</van-button>
      </div>
    </van-cell>
    <div class="content markdown-body">
      <span>这是文章内容</span>
      <span>这是文章内容</span>
      <span>这是文章内容</span>
    </div>
  </div>
</template>

<script>
import './github-markdown.css'
import { getArticleDetail } from '@/api/article'

export default {
  name: 'ArticleIndex',
  data() {
    return {
      articleId: this.$route.params.articleId
    }
  },
  created() {
    this.loadArticleDetail()
  },
  methods: {
    async loadArticleDetail() {
      console.log(this.articleId)
      const { data } = getArticleDetail(this.articleId)
      console.log(data)
    }
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
  }
}
</style>
