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

// 收藏文章
const starArticle = articleId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data: {
      target: articleId
    }
  })
}

// 取消收藏文章
const unstarArticle = articleId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${articleId}`
  })
}

// 点赞文章
const likeArticle = articleId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target: articleId
    }
  })
}

// 取消点赞
const cancelLikeArticle = articleId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${articleId}`
  })
}

export {
  getArticles,
  getArticleDetail,
  starArticle,
  unstarArticle,
  likeArticle,
  cancelLikeArticle
}
