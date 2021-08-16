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

// 获取搜索记录
const getSearchHistory = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search/histories'
  })
}

// 删除所有搜索记录
const clearSearchHistory = () => {
  return request({
    method: 'DELETE',
    url: '/app/v1_0/search/histories'
  })
}

export {
  getAdvice,
  getSearchResult,
  getSearchHistory,
  clearSearchHistory
}
