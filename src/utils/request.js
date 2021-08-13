import axios from 'axios'

const request = axios.create({
  // baseURL: 'http://ttapi.research.itcast.cn/app/'
  baseURL: '/api' // 使用代理解决跨域问题
})

export default request
