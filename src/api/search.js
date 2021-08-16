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

// 获取搜索结果
const getSearchResult = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}

export {
  getAdvice,
  getSearchResult
}
