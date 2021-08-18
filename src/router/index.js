import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/'
import { Dialog } from 'vant'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/'),
    meta: { requireAuth: false }
  },
  {
    path: '/', // 有默认子路由，不需要设置 name
    component: () => import('@/views/layout/'),
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import('@/views/home/'),
        meta: { requireAuth: false }
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa/'),
        meta: { requireAuth: false }
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video/'),
        meta: { requireAuth: false }
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/'),
        meta: { requireAuth: false }
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/'),
    meta: { requireAuth: false }
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article/'),
    meta: { requireAuth: false }
  },
  {
    path: '/info',
    name: 'info',
    component: () => import('@/views/info/'),
    meta: { requireAuth: true }
  },
  {
    path: '/robot',
    name: 'robot',
    component: () => import('@/views/robot/'),
    meta: { requireAuth: true }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    // 1. 需要访问权限
    if (store.state.UserMod.token) {
      // 如果有 token，表明已登录，直接跳转到 next
      next()
    } else {
      // 如果没有 token，表明未登录，弹出提示框
      Dialog.confirm({
        title: '提示',
        message: '该功能需要登录才能使用，是否登录？'
      }).then(() => { // 确认
        router.replace({
          name: 'login',
          query: {
            from: from.fullPath
          }
        })
      }).catch(() => { // 取消
        // 什么也不做
      })
    }
  } else {
    // 2. 不需要访问权限，直接跳转到 next
    next()
  }
})

export default router
