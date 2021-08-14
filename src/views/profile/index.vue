<template>
  <div class="profile-container">
    <van-cell-group class="profile-header">
      <template v-if="token">
        <van-cell class="info" :border="false" center>
          <div slot="title" class="left">
            <van-image
              class="avatar"
              fit="cover"
              round
              :src="userInfo.photo"
            />
            <span class="name">{{ userInfo.name }}</span>
          </div>
          <div class="right">
            <van-button class="edit-button" round>编辑资料</van-button>
          </div>
        </van-cell>
        <van-grid class="statistic" :border="false">
          <van-grid-item>
            <div slot="text" class="wrapper">
              <span class="count">{{ userInfo.art_count }}</span>
              <span class="label">头条</span>
            </div>
          </van-grid-item>
          <van-grid-item>
            <div slot="text" class="wrapper">
              <span class="count">{{ userInfo.follow_count }}</span>
              <span class="label">关注</span>
            </div>
          </van-grid-item>
          <van-grid-item>
            <div slot="text" class="wrapper">
              <span class="count">{{ userInfo.fans_count }}</span>
              <span class="label">粉丝</span>
            </div>
          </van-grid-item>
          <van-grid-item>
            <div slot="text" class="wrapper">
              <span class="count">{{ userInfo.like_count }}</span>
              <span class="label">获赞</span>
            </div>
          </van-grid-item>
        </van-grid>
      </template>
      <div class="notlogin" v-else>
        <img src="./notlogin.png" @click="$router.push('/login')">
        <span>登录 / 注册</span>
      </div>
    </van-cell-group>
    <van-grid
      class="profile-middle"
      clickable
      :column-num="2"
      center
    >
      <van-grid-item to="" class="item">
        <div slot="icon" class="collect">
          <van-icon name="home-o"></van-icon>
          <span>收 藏</span>
        </div>
      </van-grid-item>
      <van-grid-item to="" class="item">
        <div slot="icon" class="history">
          <van-icon name="search"></van-icon>
          <span>历 史</span>
        </div>
      </van-grid-item>
    </van-grid>
    <van-cell-group class="profile-list">
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </van-cell-group>
    <van-cell
      v-if="token"
      class="logout"
      title="退出登录"
      @click="onLogout"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getCurrentUser } from '@/api/user'

export default {
  name: 'ProfileIndex',
  data() {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState('UserMod', ['token'])
  },
  created() {
    this.loadCurrentUser()
  },
  methods: {
    async onLogout() {
      await this.$dialog.confirm({
        title: '提示',
        message: '确认退出登录吗？'
      })
      // 确定退出，清除 token
      this.setToken(null)
    },
    async loadCurrentUser() {
      const res = await getCurrentUser()
      this.userInfo = res.data.data
    },
    ...mapMutations('UserMod', ['setToken'])
  }
}
</script>

<style lang="scss" scoped>
.profile-container {
  .profile-header {
    background-image: url('./banner.png');
    background-size: cover;
    height: 180px;
    .info {
      background: unset;
      height: 115px;
      padding: 38px 16px 12px 16px;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          height: 75px;
          width: 75px;
          border: 1px solid #fff;
          box-sizing: border-box;
          margin-right: 10px;
        }
        .name {
          font-style: 15px;
          color: #fff;
        }
      }
      .right {
        .edit-button {
          font-size: 12px;
          color: #666;
          height: 24px;
        }
      }
    }
    .statistic {
      padding: 0 16px;
      height: 65px;
      ::v-deep .van-grid-item__content {
        background: unset;
      }
      .wrapper {
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .count {
          font-size: 18px;
        }
        .label {
          font-size: 12px;
        }
      }
    }
    .notlogin {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-top: 54px;
      img {
        width: 66px;
        height: 66px;
        margin-bottom: 7px;
      }
      span {
        color: #fff;
        font-size: 14px;
      }
    }
  }
  ::v-deep .profile-middle {
    .item {
      height: 70px;
      .collect, .history {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        span {
          font-size: 14px;
          color: #333;
        }
      }
    }
    .van-icon {
      width: 22px;
      height: 22px;
    }
    .van-icon-home-o {
      color: #eb5253;
    }
    .van-icon-search {
      color: #ff9d1d;
    }
  }
  .profile-list {
    margin: 5px 0;
  }
  .logout {
    height: 52px;
    color: #d86262;
    font-size: 15px;
    text-align: center;
    align-items: center;
  }
}
</style>
