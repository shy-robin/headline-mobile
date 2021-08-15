<template>
  <van-cell class="article-item-container">
    <div
      slot="title"
      class="title van-multi-ellipsis--l3"
    >
      {{ article.title }}
    </div>
    <div slot="label" class="label">
      <div
        class="cover-group"
        v-if="article.cover.type === 3"
      >
        <van-image
          class="image"
          v-for="(image, index) in article.cover.images"
          fit="cover"
          :key="index"
          :src="image"
        />
      </div>
      <div class="info">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <div v-if="article.cover.type === 1">
      <van-image
        class="right-cover"
        fit="cover"
        :src="article.cover.images[0]"
      />
    </div>
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.article-item-container {
  .title {
    font-size: 16px;
    color: #3a3a3a;
  }
  .label {
    .cover-group {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      .image {
        height: 73px;
        flex: 1;
        &:not(:last-child) {
          margin-right: 2px;
        }
      }
      padding: 15px 0;
    }
    .info {
      font-size: 12px;
      color: #b4b4b4;
      display: flex;
      span {
        margin-right: 13px;
      }
    }
  }
  .van-cell__value {
    flex: unset;
    margin-left: 12px;
  }
  .right-cover {
    width: 116px;
    height: 73px;
  }
}
</style>
