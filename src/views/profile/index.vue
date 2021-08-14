<template>
  <div class="profile-container">
    <div class="profile-header">
      <van-cell-group>
        <van-cell>
          <div slot="title">
            <van-image
              width="100"
              height="100"
              fit="cover"
              round
              src="https://img01.yzcdn.cn/vant/cat.jpeg"
            />
            <span>头条号</span>
          </div>
          <div>
            <van-button>编辑资料</van-button>
          </div>
        </van-cell>
        <van-grid>
          <van-grid-item>
            <div slot="text">
              <span class="count">Count</span>
              <span class="label">头条</span>
            </div>
          </van-grid-item>
          <van-grid-item>
            <div slot="text">
              <span class="count">Count</span>
              <span class="label">关注</span>
            </div>
          </van-grid-item>
          <van-grid-item>
            <div slot="text">
              <span class="count">Count</span>
              <span class="label">粉丝</span>
            </div>
          </van-grid-item>
          <van-grid-item>
            <div slot="text">
              <span class="count">Count</span>
              <span class="label">获赞</span>
            </div>
          </van-grid-item>
        </van-grid>
      </van-cell-group>
      <van-grid clickable :column-num="2">
        <van-grid-item icon="home-o" text="收藏" to="" />
        <van-grid-item icon="search" text="历史" to="" />
      </van-grid>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
      <van-cell title="退出登录" is-link />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileIndex'
}
</script>

<style lang="scss" scoped>

</style>
