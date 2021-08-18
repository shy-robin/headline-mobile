<template>
  <div class="profile-container">
    <van-nav-bar
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
      :border="false"
    />
    <input
      type="file"
      ref="file"
      accept="image/*"
      hidden
      @change="onFileChange"
    >
    <van-cell
      title="头像"
      is-link
      @click="$refs.file.click()"
    >
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
      @click="isShowEditGender = true"
    />
    <van-cell
      title="生日"
      :value="userInfo.birthday"
      is-link
      @click="isShowEditBirthday = true"
    />
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
    <van-popup
      v-if="isShowEditGender"
      v-model="isShowEditGender"
      round
      position="bottom"
    >
      <edit-gender
        v-model="userInfo.gender"
        @close="isShowEditGender = false"
      />
    </van-popup>
    <van-popup
      v-if="isShowEditBirthday"
      v-model="isShowEditBirthday"
      round
      position="bottom"
    >
      <edit-birthday
        v-model="userInfo.birthday"
        @close="isShowEditBirthday = false"
      />
    </van-popup>
    <van-popup
      v-if="isShowEditImage"
      v-model="isShowEditImage"
      position="bottom"
      style="height: 100%;background-color:#000"
    >
      <edit-image
        :file="chosenImage"
        @newImage="userInfo.photo = $event"
        @close="isShowEditImage = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { getProfile } from '@/api/user'
import EditName from './components/EditName.vue'
import EditGender from './components/EditGender.vue'
import EditBirthday from './components/EditBirthday.vue'
import EditImage from './components/EditImage.vue'

export default {
  name: 'InfoIndex',
  data() {
    return {
      userInfo: {},
      isShowEditName: false,
      isShowEditGender: false,
      isShowEditBirthday: false,
      isShowEditImage: false,
      chosenImage: null
    }
  },
  created() {
    this.loadProfile()
  },
  methods: {
    async loadProfile() {
      const { data } = await getProfile()
      this.userInfo = data.data
    },
    onFileChange() {
      this.chosenImage = this.$refs.file.files[0]
      this.isShowEditImage = true

      // 选择同一张图片也触发 onFileChange
      this.$refs.file.value = ''
    }
  },
  components: {
    EditName,
    EditGender,
    EditBirthday,
    EditImage
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
