<template>
  <div>
    <van-cell-group>
      <van-cell
        v-for="(item, index) in advice" :key="index"
        :title="item"
        icon="search"
      />
    </van-cell-group>
  </div>
</template>

<script>
import { getAdvice } from '@/api/search'

export default {
  name: 'SearchAdvice',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      advice: [] // 联想建议
    }
  },
  watch: {
    searchText: {
      async handler() {
        const res = await getAdvice(this.searchText)
        this.advice = res.data.data.options
      },
      immediate: true // 立刻监听，组件创建时就触发一次
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
