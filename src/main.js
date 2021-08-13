import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 注册 Vant 组件库
import Vant from 'vant'
import 'vant/lib/index.css'

// 使用 amfe-flexible
import 'amfe-flexible'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
