import request from '@/utils/request'

// 获取所有评论
const getComments = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}

export {
  getComments
}
