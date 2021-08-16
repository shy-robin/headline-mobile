import request from '@/utils/request'

// 获取文章列表
const getArticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}

// 获取指定文章详情
const getArticleDetail = articleId => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articleId}`
  })
}

export {
  getArticles,
  getArticleDetail
}
