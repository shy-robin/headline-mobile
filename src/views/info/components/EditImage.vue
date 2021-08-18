<template>
  <div class="edit-image">
    <img
      class="image"
      ref="image"
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
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

export default {
  name: 'EditImage',
  props: {
    file: {
      required: true
    }
  },
  data() {
    return {
      previewImage: window.URL.createObjectURL(this.file),
      cropper: null
    }
  },
  mounted() {
    const image = this.$refs.image
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  },
  methods: {
    async onSave() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })

      // 封装 Promise 函数，使代码变得同步，后续代码不用写在回调函数里
      const blobData = await this.getCroppedCanvas()
      const fd = new FormData()
      fd.append('photo', blobData)

      const { data } = await editImage(fd)
      const newImage = data.data.photo

      this.$emit('newImage', newImage)

      this.$toast.success('保存成功')
      this.$emit('close')
    },
    getCroppedCanvas() {
      return new Promise(resolve => {
        this.cropper.getCroppedCanvas().toBlob(blob => {
          resolve(blob)
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-image {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  .image {
    display: block;
    max-width: 100%;
  }
  .van-nav-bar {
    background-color: #000;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    ::v-deep .van-nav-bar__text {
      color: #fff;
    }
  }
  .cropper-container {
    margin-top: 100px;
  }
}
</style>
