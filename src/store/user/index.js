import { setItem, getItem } from '@/utils/storage'

const USER_KEY = 'HEADLINE_MOBILE_TOKEN'
const CHANNELS = 'HEADLINE_MOBILE_CHANNELS'

export default {
  namespaced: true,
  state: {
    token: getItem(USER_KEY),
    channels: getItem(CHANNELS)
  },
  mutations: {
    setToken(state, data) {
      state.token = data
      setItem(USER_KEY, data)
    },
    setChannels(state, data) {
      state.channels = data
      setItem(CHANNELS, data)
    },
    removeChannel(state, data) {
      state.data = data
      setItem(CHANNELS, data)
    }
  }
}
