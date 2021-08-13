import axios from 'axios'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/'
})

export default request
