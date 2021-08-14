export default {
  namespaced: true,
  state: {
    user: window.localStorage.getItem('headline-moblie-user')
  },
  mutations: {
    setUser(state, data) {
      window.localStorage.setItem('headline-mobile-user', JSON.stringify(data))
    }
  }
}
