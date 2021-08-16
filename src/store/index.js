import Vue from 'vue'
import Vuex from 'vuex'
import UserMod from './user/'
import SearchMod from './search/'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    UserMod,
    SearchMod
  }
})
