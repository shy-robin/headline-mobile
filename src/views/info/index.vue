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
    <van-cell
      title="昵称"
      :value="userInfo.name"
      is-link
      @click="isShowEditName = true"
    />
    <van-cell
      title="性别"
      :value="userInfo.gender === 1 ? '女' : '男'"
      is-link
    />
    <van-cell title="生日" :value="userInfo.birthday" is-link />
    <van-popup
      v-model="isShowEditName"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!--
        补充：
          v-model 只能使用一次，如果要对多个属性进行双向绑定就需要使用 .sync（多个数据保持同步）
        例如：
          :gender.sync="userInfo.gender" 相当于：
            1. :gender="userInfo.gender"
            2. @update:gender="userInfo.gender = $event"
        总结：
          我们一般把最常用的数据设计为 v-model 绑定，
          把不太常用的数据设计为 .sync 绑定
      -->
      <edit-name
        v-if="isShowEditName"
        v-model="userInfo.name"
        @closeEdit="isShowEditName = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { getProfile } from '@/api/user'
import EditName from './components/EditName.vue'

export default {
  name: 'InfoIndex',
  data() {
    return {
      userInfo: {},
      isShowEditName: false
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
  },
  components: {
    EditName
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
