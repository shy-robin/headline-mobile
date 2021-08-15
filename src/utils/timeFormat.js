import Vue from 'vue'

import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

// 中文语言包
dayjs.locale('zh-cn')
// 处理相对时间
dayjs.extend(relativeTime)

// 给 Vue 添加过滤器
Vue.filter('relativeTime', value => {
  return dayjs().from(dayjs(value))
})
