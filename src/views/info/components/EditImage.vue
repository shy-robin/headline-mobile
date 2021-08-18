<template>
  <div class="edit-image">
    <van-image
      :src="previewImage"
    />
    <van-nav-bar
      left-text="返回"
      right-text="保存"
      @click-left="$emit('close')"
      @click-right="onSave"
    />
  </div>
</template>

<script>
import { editImage } from '@/api/user'

export default {
  name: 'EditImage',
  props: {
    file: {
      required: true
    }
  },
  data() {
    return {
      previewImage: window.URL.createObjectURL(this.file)
    }
  },
  methods: {
    async onSave() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })

      const fd = new FormData()
      fd.append('photo', this.file)

      const { data } = await editImage(fd)
      const newImage = data.data.photo
      console.log(newImage)
      this.$toast.success('保存成功')
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-image {
  .van-nav-bar {
    background-color: unset;
  }
}
</style>
