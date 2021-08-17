<template>
  <div class="edit-name-container">
    <van-nav-bar
      title="编辑昵称"
    >
      <div slot="left">
        <van-button
          size="small"
          @click="$emit('closeEdit')"
        >取消</van-button>
      </div>
      <div slot="right">
        <van-button
          size="small"
          @click="saveEdit"
        >保存</van-button>
      </div>
    </van-nav-bar>
    <van-field
      v-model="localName"
      autosize
      maxlength="7"
      show-word-limit
    />
    <button @click="$emit('update:gender', 'test')">修改gender</button>
    <button @click="$emit('update:photo', 'test')">修改photo</button>
  </div>
</template>

<script>
import { editProfile } from '@/api/user'

export default {
  name: 'EditName',
  props: ['value', 'gender', 'photo'],
  data() {
    return {
      localName: this.value
    }
  },
  methods: {
    async saveEdit() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        await editProfile({
          name: this.localName
        })
        this.$emit('closeEdit')
        this.$emit('input', this.localName)
        this.$toast.success('保存成功')
      } catch (ex) {
        if (ex && ex.response && ex.response.status === 409) {
          this.$toast.fail('昵称重复')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-name-container {
  .van-nav-bar {
    background-color: unset;
    ::v-deep .van-nav-bar__title {
      color: #000;
    }
  }
  .van-field {
    background-color: rgb(255, 243, 211);
    width: unset;
    border-radius: 6px;
    margin: 8px;
  }
}
</style>
