import { router, addRoutes } from '@/router/index.js'
import { Notice, showFullLoding, hideFullLoding } from '@/utils.js'
import store from '@/store/index.js'
// 前置守卫
router.beforeEach(async (to, from, next) => {
  // to and from are both route objects. must call `next`.
  showFullLoding()
  const token = sessionStorage.getItem('admin-token')
  if (!token && to.path !== '/login') {
    router.push('/login')
  }

  // 避免重复登录
  if (token && to.path == '/login') {
    next({ path: from.path ? from.path : '/login' })
    Notice('请勿重复登录', 'warning')
  }
  // 如果用户登录了，则自动将用户信息存储到vuex中
  let hasNewRoutes = false
  if (token) {
    const { menus } = await store.dispatch('getUserInfo')
    hasNewRoutes = addRoutes(menus)
  }
  const title = to.meta.title
  document.title = title + '-商城管理'
  hasNewRoutes ? next(to.fullPath) : next()
})

// 后置守卫
router.afterEach((to, from) => {
  // to and from are both route objects.
  hideFullLoding()
})
