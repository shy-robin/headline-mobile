import { getItem, setItem } from '@/utils/storage'

const SEARCH_HISTORY = 'HEADLINE_MOBILE_SEARCH_HISTORY'

export default {
  namespaced: true,
  state: {
    history: getItem(SEARCH_HISTORY) || []
  },
  mutations: {
    setHistory(state, data) {
      state.history = data
      setItem(SEARCH_HISTORY, data)
    }
  }
}
