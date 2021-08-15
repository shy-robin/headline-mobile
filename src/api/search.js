import request from '@/utils/request'

// 获取搜索联想建议
const getAdvice = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}

export {
  getAdvice
}
