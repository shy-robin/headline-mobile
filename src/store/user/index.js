import { setItem, getItem } from '@/utils/storage'

const USER_KEY = 'HEADLINE_MOBILE_TOKEN'

export default {
  namespaced: true,
  state: {
    token: getItem(USER_KEY)
  },
  mutations: {
    setToken(state, data) {
      state.token = data
      setItem(USER_KEY, data)
    }
  }
}
