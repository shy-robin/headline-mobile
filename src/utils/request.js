import axios from 'axios'
import store from '@/store/'

const request = axios.create({
  // baseURL: 'http://ttapi.research.itcast.cn/app/'
  baseURL: '/api' // 使用代理解决跨域问题
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    const token = store.state.UserMod.token
    if (token) {
      config.headers.Authorization = `Bearer ${token.token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default request
