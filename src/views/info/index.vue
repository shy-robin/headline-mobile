<template>
  <div class="profile-container">
    <van-nav-bar
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
      :border="false"
    />
    <van-cell title="头像" is-link>
      <div>
        <van-image
          class="avatar"
          round
          fit="cover"
          :src="userInfo.photo"
        />
      </div>
    </van-cell>
    <van-cell title="昵称" :value="userInfo.name" is-link />
    <van-cell
      title="性别"
      :value="userInfo.gender === 1 ? '女' : '男'"
      is-link
    />
    <van-cell title="生日" :value="userInfo.birthday" is-link />
  </div>
</template>

<script>
import { getProfile } from '@/api/user'
export default {
  name: 'InfoIndex',
  data() {
    return {
      userInfo: {}
    }
  },
  created() {
    this.loadProfile()
  },
  methods: {
    async loadProfile() {
      const { data } = await getProfile()
      this.userInfo = data.data
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-container {
  .avatar {
    width: 40px;
    height: 40px;
  }
}
</style>
