import axios from 'axios'
import store from '@/store/'
import JSONBig from 'json-bigint'
import { Toast } from 'vant'
import router from '@/router/'

const request = axios.create({
  // baseURL: 'http://ttapi.research.itcast.cn/app/'
  baseURL: '/api', // 使用代理解决跨域问题
  transformResponse: [
    data => {
      try {
        return JSONBig.parse(data)
      } catch (ex) {
        return data
      }
    }
  ]
})

const refreshTokenReq = axios.create({
  baseURL: '/api'
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

// 响应拦截器
request.interceptors.response.use(
  response => {
    // 响应成功进入这里
    return response
  },
  async error => {
    // 响应失败进入这里
    const status = error.response.status
    if (status === 400) {
      Toast.fail('请求参数错误')
    } else if (status === 401) {
      // 1. 如果没有 token，直接跳转到登录页
      const userToken = store.state.UserMod.token
      if (!userToken || !userToken.token) {
        return router.replace('/login')
      }
      // 2. 如果有 token，尝试用 refresh_token 发请求
      try {
        const res = await refreshTokenReq({
          method: 'PUT',
          url: '/app/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${userToken.refresh_token}`
          }
        })
        // 如果请求成功，刷新 token
        userToken.token = res.data.data.token
        // （注意模块内 mutations 的调用方法）
        store.commit('UserMod/setToken', userToken)
        // 继续发送原来的请求
        return request(error.config)
      } catch (ex) {
        // 如果请求失败，直接跳转到登录页
        return router.replace('/login')
      }
    } else if (status === 403) {
      Toast.fail('操作没有权限')
    } else if (status >= 500) {
      Toast.fail('服务器异常，请稍后重试')
    }

    // 抛出异常
    return Promise.reject(error)
  }
)

export default request
