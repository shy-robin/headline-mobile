import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/')
  },
  {
    path: '/', // 有默认子路由，不需要设置 name
    component: () => import('@/views/layout/'),
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import('@/views/home/')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa/')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video/')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article/')
  },
  {
    path: '/info',
    name: 'info',
    component: () => import('@/views/info/')
  },
  {
    path: '/robot',
    name: 'robot',
    component: () => import('@/views/robot/')
  }
]

const router = new VueRouter({
  routes
})

export default router
