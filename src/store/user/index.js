import { setItem, getItem } from '@/utils/storage'

const USER_KEY = 'HEADLINE_MOBILE_TOKEN'
const CHANNELS = 'HEADLINE_MOBILE_CHANNELS'

export default {
  namespaced: true,
  state: {
    token: getItem(USER_KEY),
    channels: getItem(CHANNELS),
    cachePages: ['LayoutIndex'] // 默认缓存组件
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
    },
    /*
      由于默认缓存了 LayoutIndex 组件，所以当用户退出登录然后又重新登录时，
      LayoutIndex 组件仍然存在，用户的数据没有更新。
      为了解决这一问题，就可以通过动态控制缓存来使组件的数据更新。
      当用户退出登录时，将 LayoutIndex 组件从缓存组中移除，不让组件缓存；
      当用户加载完 Layout 组件后，再将它加入缓存组。以此达到缓存组件且能更新用户数据的目的。
    */
    addCachePage(state, pageName) {
      // 如果不包含该组件，则加入缓存组
      if (!state.cachePages.includes(pageName)) {
        state.cachePages.push(pageName)
      }
    },
    removeCachePage(state, pageName) {
      const index = state.cachePages.indexOf(pageName)
      // 如果存在该组件，则将其从缓存组中删除
      if (index !== -1) {
        state.cachePages.splice(index, 1)
      }
    }
  }
}
