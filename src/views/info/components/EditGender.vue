<template>
  <div>
    <van-picker
      show-toolbar
      :columns="columns"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      :default-index="value"
      @change="onChange"
    />
  </div>
</template>

<script>
import { editProfile } from '@/api/user'

export default {
  name: 'EditGender',
  props: {
    value: {
      type: Number
    }
  },
  data() {
    return {
      columns: ['男', '女'],
      currentGender: this.value
    }
  },
  methods: {
    onChange(picker, value, index) {
      this.currentGender = index
    },
    async onConfirm() {
      this.$toast.loading({
        message: '修改中...',
        forbidClick: true,
        duration: 0
      })
      await editProfile({
        gender: this.currentGender
      })
      this.$emit('input', this.currentGender)
      this.$emit('close')
      this.$toast.success('修改成功')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
