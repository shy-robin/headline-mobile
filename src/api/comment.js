import request from '@/utils/request'

// 获取所有评论
const getComments = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}

// 对评论点赞
const likeComment = commentId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    data: {
      target: commentId
    }
  })
}

// 取消对评论点赞
const cancelLikeComment = commentId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/comment/likings/${commentId}`
  })
}

export {
  getComments,
  likeComment,
  cancelLikeComment
}
