<template>
  <van-datetime-picker
    v-model="currentDate"
    type="date"
    title="选择年月日"
    :min-date="minDate"
    :max-date="maxDate"
    @cancel="$emit('close')"
    @confirm="onConfirm"
  />
</template>

<script>
import { editProfile } from '@/api/user'
import dayjs from 'dayjs'

export default {
  name: 'EditBirthday',
  props: {
    value: {
      type: String
    }
  },
  data() {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: '修改中...',
        forbidClick: true,
        duration: 0
      })
      const date = dayjs(this.currentDate).format('YYYY-MM-DD')
      await editProfile({
        birthday: date
      })
      this.$emit('input', date)
      this.$emit('close')
      this.$toast.success('修改成功')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
