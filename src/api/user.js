import request from '@/utils/request'

const userLogin = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

export {
  userLogin
}
