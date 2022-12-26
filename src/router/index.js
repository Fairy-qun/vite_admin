import { createRouter, createWebHashHistory } from 'vue-router'
import { Notice } from '@/utils.js'

const routes = [
  {
    path: '/',
    name: '/',
    component: () => import('@/views/index.vue'),
    meta: {
      title: '后台首页'
    }
  },
  {
    path: '/login',
    name: '/login',
    component: () => import('@/views/login/Login.vue'),
    meta: {
      title: '登录页'
    }
  },
  // 匹配所有的错误url
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: {
      title: '错误页面'
    }
  }
]
const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router
