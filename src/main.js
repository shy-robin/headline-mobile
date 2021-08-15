import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 注册 Vant 组件库
import Vant from 'vant'
import 'vant/lib/index.css'

// 使用 amfe-flexible
import 'amfe-flexible'

// 加载全局样式（注意，要在 Vant 之后加载，这样才能保证设置的样式不被 Vant 覆盖）
import './style/index.scss'

// 加载 relative 全局过滤器
import './utils/timeFormat'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
